#!/usr/bin/env node
/**
 * export-pdf.mjs — Pure vector PDF export via Puppeteer
 *
 * ALL slides use page.pdf() → 100% vector output.
 * The Countries slide map is pre-rendered via a dedicated /?map service page
 * at 3x resolution, then substituted as a high-res PNG during PDF mode.
 *
 * Usage:
 *   node scripts/export-pdf.mjs              # → reports/Watch360_Report.pdf
 *   node scripts/export-pdf.mjs output.pdf   # → output.pdf
 */

import puppeteer from 'puppeteer'
import { PDFDocument } from 'pdf-lib'
import fs from 'fs'
import path from 'path'

const DEV_URL = 'http://localhost:5173'
const SLIDE_W = 720
const SLIDE_H = 450
const OUTPUT = process.argv[2] || 'reports/Watch360_Report.pdf'
const MAP_SCREENSHOT_PATH = path.resolve('public/map-export-3x.png')

async function main() {
  console.log('🚀 Launching headless Chrome...')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  // ── Step 1: Pre-render the world map via /?map service page ──
  console.log('🗺️  Pre-rendering world map at 3x via /?map ...')
  const mapPage = await browser.newPage()
  await mapPage.setViewport({ width: 700, height: 401, deviceScaleFactor: 4 })
  await mapPage.goto(`${DEV_URL}/?map`, { waitUntil: 'networkidle0', timeout: 30000 })
  await new Promise(r => setTimeout(r, 1500)) // let SVG patterns + topoJSON fully render

  const mapEl = await mapPage.$('#map-service')
  if (mapEl) {
    const publicDir = path.dirname(MAP_SCREENSHOT_PATH)
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true })

    await mapEl.screenshot({
      path: MAP_SCREENSHOT_PATH,
      type: 'png',
      omitBackground: false, // keep dark background
    })
    console.log(`   ✅ Map saved: ${MAP_SCREENSHOT_PATH}`)
  } else {
    console.warn('   ⚠️ #map-service not found, skipping pre-render')
  }
  await mapPage.close()

  // Wait for Vite to detect the new file in public/
  await new Promise(r => setTimeout(r, 500))

  // ── Step 2: Count slides ──
  const countPage = await browser.newPage()
  await countPage.setViewport({ width: SLIDE_W, height: SLIDE_H })
  await countPage.goto(DEV_URL, { waitUntil: 'networkidle0', timeout: 30000 })
  const slideCount = await countPage.evaluate(() =>
    document.querySelectorAll('.slide-inner').length
  )
  await countPage.close()

  console.log(`📊 Found ${slideCount} slides`)
  if (slideCount === 0) {
    console.error('❌ No slides found!')
    cleanup()
    await browser.close()
    process.exit(1)
  }

  // ── Step 3: Export each slide as vector PDF ──
  const mergedPdf = await PDFDocument.create()

  for (let i = 0; i < slideCount; i++) {
    console.log(`  📄 Slide ${i + 1}/${slideCount} (📐 vector)...`)

    const page = await browser.newPage()
    await page.setViewport({ width: SLIDE_W, height: SLIDE_H, deviceScaleFactor: 1 })
    await page.emulateMediaType('screen')
    await page.goto(`${DEV_URL}/?pdf=${i}`, { waitUntil: 'networkidle0', timeout: 30000 })
    await new Promise(r => setTimeout(r, 500))

    const pdfBytes = await page.pdf({
      width: `${SLIDE_W}px`,
      height: `${SLIDE_H}px`,
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })

    const singlePdf = await PDFDocument.load(pdfBytes)
    const [copiedPage] = await mergedPdf.copyPages(singlePdf, [0])
    mergedPdf.addPage(copiedPage)
    await page.close()
  }

  // ── Step 4: Save merged PDF ──
  const outDir = path.dirname(OUTPUT)
  if (outDir && !fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const finalBytes = await mergedPdf.save()
  fs.writeFileSync(OUTPUT, finalBytes)
  console.log(`\n✅ PDF saved: ${OUTPUT} (${slideCount} pages, ${(finalBytes.length / 1024).toFixed(0)} KB)`)

  // ── Cleanup ──
  cleanup()
  await browser.close()
}

function cleanup() {
  if (fs.existsSync(MAP_SCREENSHOT_PATH)) {
    fs.unlinkSync(MAP_SCREENSHOT_PATH)
    console.log('🧹 Cleaned up temporary map screenshot')
  }
}

main().catch(err => {
  console.error('❌ Error:', err.message)
  cleanup()
  process.exit(1)
})

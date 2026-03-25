#!/usr/bin/env node
/**
 * export-map.mjs — Pre-render the world map as a high-res PNG
 *
 * Opens the /?map service page and captures the SVG map at 4x resolution.
 * The resulting PNG is saved to assets/images/map-4x.png and used
 * permanently by TopCountriesSlide instead of the live SVG.
 *
 * Run this once whenever the country data or map styling changes.
 *
 * Usage:
 *   npm run map                    # → assets/images/map-4x.png
 *   node scripts/export-map.mjs   # same
 */

import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const DEV_URL = 'http://localhost:5173'
const MAP_W = 700
const MAP_H = 401
const SCALE = 4
const OUTPUT = path.resolve('assets/images/map-4x.png')

async function main() {
  console.log(`🗺️  Exporting world map at ${SCALE}x (${MAP_W * SCALE}×${MAP_H * SCALE}px)...`)

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: MAP_W, height: MAP_H, deviceScaleFactor: SCALE })
  await page.goto(`${DEV_URL}/?map`, { waitUntil: 'networkidle0', timeout: 30000 })
  await new Promise(r => setTimeout(r, 2000)) // let topoJSON + SVG patterns fully render

  const mapEl = await page.$('#map-service')
  if (!mapEl) {
    console.error('❌ #map-service element not found. Is the dev server running?')
    await browser.close()
    process.exit(1)
  }

  // Ensure output directory exists
  const outDir = path.dirname(OUTPUT)
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  await mapEl.screenshot({
    path: OUTPUT,
    type: 'png',
    omitBackground: false,
  })

  const stats = fs.statSync(OUTPUT)
  console.log(`✅ Saved: ${OUTPUT} (${(stats.size / 1024).toFixed(0)} KB)`)
  console.log(`   Resolution: ${MAP_W * SCALE}×${MAP_H * SCALE}px`)
  console.log(`   Commit this file — it will be used by TopCountriesSlide.`)

  await browser.close()
}

main().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})

/**
 * Excel data parser for Watch360 reports.
 *
 * Reads .xlsx files exported from Google Sheets and maps them
 * to typed data structures used by slide components.
 *
 * Usage:
 *   import { parseTopBrands } from './parseExcel'
 *   const { allMentions, titleMentions } = parseTopBrands('/path/to/file.xlsx')
 */
import * as XLSX from 'xlsx'
import type { BrandRow } from '../components/slides/TopBrandsSlide'

/* ── Top 25 Brands (sheet "4. Top 25 Brands") ──────────────── */

interface TopBrandsResult {
  allMentions: BrandRow[]
  titleMentions: BrandRow[]
}

/**
 * Parse "4. Top 25 Brands" sheet.
 *
 * Layout:
 *   Col A: rank (#1, #2…)  Col B: brand  Col C: articles qty   ← All Mentions
 *   Col E: rank (#1, #2…)  Col F: brand  Col G: articles qty   ← Title Mentions
 *
 * Data rows start at Excel row 4 (0-indexed row 3).
 * Returns top `limit` brands from each column.
 */
export function parseTopBrands(filePath: string, limit = 10): TopBrandsResult {
  const wb = XLSX.readFile(filePath)
  const sheetName = wb.SheetNames.find(n => n.includes('Top 25 Brands'))
  if (!sheetName) throw new Error('Sheet "Top 25 Brands" not found')

  const rows: unknown[][] = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 })

  const allMentions: BrandRow[] = []
  const titleMentions: BrandRow[] = []

  // Data starts at row index 3, runs 25 rows
  for (let i = 3; i < rows.length && allMentions.length < limit; i++) {
    const row = rows[i]
    if (!row || !row[1]) break

    allMentions.push({
      rank: allMentions.length + 1,
      brand: String(row[1]),
      articles: Number(row[2]) || 0,
    })
  }

  for (let i = 3; i < rows.length && titleMentions.length < limit; i++) {
    const row = rows[i]
    if (!row || !row[5]) break

    titleMentions.push({
      rank: titleMentions.length + 1,
      brand: String(row[5]),
      articles: Number(row[6]) || 0,
    })
  }

  return { allMentions, titleMentions }
}

/* ── Top 25 Collections (sheet "5. Top 25 Collections") ───────────── */

import type { CollectionRow } from '../components/slides/TopCollectionsSlide'

/**
 * Parse "5. Top 25 Collections" sheet.
 *
 * Layout:
 *   Col A: rank (#1, #2…)  Col B: collection  Col C: brand  Col D: articles qty
 */
export function parseTopCollections(filePath: string, limit = 20): CollectionRow[] {
  const wb = XLSX.readFile(filePath)
  const sheetName = wb.SheetNames.find(n => n.includes('Top 25 Collections'))
  if (!sheetName) throw new Error('Sheet "Top 25 Collections" not found')

  const rows: unknown[][] = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 })
  const collections: CollectionRow[] = []

  // Data starts at row index 3
  for (let i = 3; i < rows.length && collections.length < limit; i++) {
    const row = rows[i]
    if (!row || !row[1]) break

    collections.push({
      rank: collections.length + 1,
      collection: String(row[1]).trim(),
      brand: String(row[2]).trim(),
      articles: Number(row[3]) || 0,
    })
  }

  return collections
}

/* ── Top 50 Models (sheet "6. Top 50 Models") ─────────────── */

import type { WatchReference } from '../components/slides/WatchReferencesSlide'

/**
 * Parse "6. Top 50 Models" sheet.
 *
 * Layout:
 *   Col A: Rank  Col B: Model  Col C: Brand  Col D: Articles  Col E: Sources
 *   Col F: Countries  Col G: Price Range  Col H: Dial Color  ...
 */
export function parseTopModels(filePath: string, limit = 5): WatchReference[] {
  const wb = XLSX.readFile(filePath)
  const sheetName = wb.SheetNames.find(n => n.includes('Top 50 Models'))
  if (!sheetName) throw new Error('Sheet "Top 50 Models" not found')

  const rows: unknown[][] = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 })
  const models: WatchReference[] = []

  // Data starts at row index 3
  for (let i = 3; i < rows.length && models.length < limit; i++) {
    const row = rows[i]
    if (!row || !row[1]) break

    models.push({
      brand: String(row[2]).trim(),
      model: String(row[1]).trim(),
      articles: Number(row[3]) || 0,
      sources: Number(row[4]) || 0,
      countries: Number(row[5]) || 0,
      priceRange: String(row[6]) || '-',
      dialColor: String(row[7]) || 'Unknown',
      dialColorHex: '#808080', // TODO: map from color name
    })
  }

  return models
}

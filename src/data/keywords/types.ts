/**
 * Shared types for keyword analysis slides (Rose Gold, Titanium, etc.)
 */

export interface KeywordOverview {
  sources: string
  articles: string
  comments: string
}

export interface KeywordBrandRow {
  rank: number
  brand: string
  articles: number
}

export interface KeywordModelRow {
  rank: number
  model: string
  brand: string
  articles: number
  image?: string
}

export interface KeywordData {
  keyword: string
  overview: KeywordOverview
  allMentions: KeywordBrandRow[]
  titleMentions: KeywordBrandRow[]
  models: KeywordModelRow[]
}

import React from 'react'
import { CoverSlide } from '../components/slides/CoverSlide'
import { SectionCoverSlide } from '../components/slides/SectionCoverSlide'
import { TableOfContentSlide } from '../components/slides/TableOfContentSlide'
import { OverviewSlide } from '../components/slides/OverviewSlide'
import { TopBrandsSlide } from '../components/slides/TopBrandsSlide'
import { TopCountriesSlide } from '../components/slides/TopCountriesSlide'
import { TopSourcesSlide } from '../components/slides/TopSourcesSlide'
import { TopCollectionsSlide } from '../components/slides/TopCollectionsSlide'
import { QuoteSlide } from '../components/slides/QuoteSlide'
import { WatchReferencesSlide, type WatchReference } from '../components/slides/WatchReferencesSlide'
import { TopModelsTableSlide } from '../components/slides/TopModelsTableSlide'
import { KeywordBrandsSlide } from '../components/slides/KeywordBrandsSlide'
import { KeywordModelsSlide } from '../components/slides/KeywordModelsSlide'
import { TableSlide } from '../components/slides/TableSlide'
import { CountriesSlide, DEFAULT_COUNTRIES, DEFAULT_MEDIA } from '../components/slides/CountriesSlide'
import { roseGold } from '../data/keywords/rose-gold'
import { titanium } from '../data/keywords/titanium'
import watchImg from '../../assets/images/Watch 1.webp'

export type SlideTag = 'All' | 'Cover' | 'Table' | 'Quote' | 'Models' | 'Map' | 'Overview' | 'Keyword' | 'Unused'

export interface SlideTemplate {
  id: string
  name: string
  tags: SlideTag[]
  element: React.ReactElement
}

/* ── Mock data for templates that need props ── */

const MOCK_ROWS = [
  { rank: 1, domain: 'teddybaldassarre.com', type: 'Watch Media', occurrence: 87 },
  { rank: 2, domain: 'hewore.com', type: 'Blog', occurrence: 76 },
  { rank: 3, domain: 'watchfinder.es', type: 'Marketplace', occurrence: 72 },
  { rank: 4, domain: 'techwriteredc.com', type: 'Blog', occurrence: 64 },
  { rank: 5, domain: 'watchcharts.com', type: 'Marketplace', occurrence: 62 },
  { rank: 6, domain: 'chrono24.com', type: 'Marketplace', occurrence: 56 },
  { rank: 7, domain: 'monochrome-watches.com', type: 'Watch Media', occurrence: 47 },
  { rank: 8, domain: 'omegawatches.com', type: 'Watch Media', occurrence: 11 },
  { rank: 9, domain: 'ablogtowatch.com', type: 'Watch Media', occurrence: 9 },
  { rank: 10, domain: 'fratellowatches.com', type: 'Watch Media', occurrence: 7 },
]

const MOCK_INSIGHTS = [
  { text: 'Watch media dominates across most segments.' },
  { text: 'Marketplaces and manufacturer sites gain influence in higher price tiers.' },
]

const MOCK_WATCHES: WatchReference[] = [
  {
    image: watchImg, brand: 'Grand Seiko', model: 'Annual Accuracy Quartz SBGX361',
    launchDate: 'Launch Apr, 2026', articles: 23, sources: 23, countries: 23,
    priceRange: '$10 000-$25 000', dialColor: 'Blue', dialColorHex: '#455691',
  },
  {
    image: watchImg, brand: 'Grand Seiko', model: 'Heritage Collection SBGA211',
    launchDate: 'Launch Mar, 2026', articles: 19, sources: 17, countries: 14,
    priceRange: '$5 000-$10 000', dialColor: 'White', dialColorHex: '#C0C0C0',
  },
  {
    image: watchImg, brand: 'Omega', model: 'Seamaster Planet Ocean 600M',
    launchDate: 'Launch Feb, 2026', articles: 31, sources: 28, countries: 19,
    priceRange: '$5 000-$10 000', dialColor: 'Black', dialColorHex: '#3A3A3A',
  },
  {
    image: watchImg, brand: 'Rolex', model: 'Submariner Date 126610LN',
    launchDate: 'Launch Jan, 2026', articles: 45, sources: 38, countries: 27,
    priceRange: '$10 000-$25 000', dialColor: 'Black', dialColorHex: '#3A3A3A',
  },
]

/* ── All slide templates ── */

export const SLIDE_TEMPLATES: SlideTemplate[] = [
  // ── Active slides (used in reports) ──
  {
    id: 'cover',
    name: 'Cover',
    tags: ['Cover'],
    element: (
      <CoverSlide
        title="Watch Media"
        period="Dec 2025 – Feb 2026"
        website="www.watch360.ai"
      />
    ),
  },
  {
    id: 'toc',
    name: 'Table of Contents',
    tags: ['Overview'],
    element: <TableOfContentSlide items={[
      { page: '01', title: 'Overview of Analyzed Data' },
      { page: '02', title: 'Top 10 Brands' },
      { page: '03', title: 'Top 10 Countries' },
      { page: '04', title: 'Top 10 Sources by Articles Volume' },
      { page: '05', title: 'Top 20 Collections' },
    ]} />,
  },
  {
    id: 'overview',
    name: 'Overview',
    tags: ['Overview'],
    element: <OverviewSlide
      titleParts={[{ text: 'Overview ', teal: true }, { text: 'of Analyzed Data' }]}
      meta={[
        { label: 'Category', value: 'Watch Media' },
        { label: 'Period', value: 'Dec 2025 – Feb 2026' },
      ]}
      statsLeft={[
        { label: 'Web Sources', value: '2,891' },
        { label: 'Articles', value: '83,451' },
      ]}
      statsRight={[
        { label: 'Countries', value: '97' },
        { label: 'Languages', value: '37' },
      ]}
    />,
  },
  {
    id: 'top-brands',
    name: 'Top 10 Brands',
    tags: ['Table'],
    element: <TopBrandsSlide />,
  },
  {
    id: 'top-countries',
    name: 'Top Countries',
    tags: ['Map', 'Table'],
    element: <TopCountriesSlide />,
  },
  {
    id: 'top-sources',
    name: 'Top 10 Sources',
    tags: ['Table'],
    element: <TopSourcesSlide />,
  },
  {
    id: 'top-collections',
    name: 'Top 20 Collections',
    tags: ['Table'],
    element: <TopCollectionsSlide />,
  },
  {
    id: 'quote',
    name: 'Quote',
    tags: ['Quote'],
    element: (
      <QuoteSlide
        quote={"\u201CAI doesn\u2019t just recommend watches \u2014 it defines which brands exist in the consumer\u2019s reality.\u201D"}
        author="ChatGPT"
        authorDescription="AI Model, OpenAI"
        footerRight="www.watch360.ai"
      />
    ),
  },
  {
    id: 'watch-references',
    name: 'Watch References',
    tags: ['Models'],
    element: (
      <WatchReferencesSlide
        watches={MOCK_WATCHES}
        footerRight="www.watch360.ai"
      />
    ),
  },
  {
    id: 'top-models-table',
    name: 'Top Models Table',
    tags: ['Table', 'Models'],
    element: (
      <TopModelsTableSlide
        watches={MOCK_WATCHES}
        footerRight="www.watch360.ai"
      />
    ),
  },
  {
    id: 'keyword-brands',
    name: 'Keyword Brands (Universal)',
    tags: ['Table', 'Keyword'],
    element: (
      <KeywordBrandsSlide
        title={roseGold.keyword}
        overview={roseGold.overview}
        allMentions={roseGold.allMentions}
        titleMentions={roseGold.titleMentions}
      />
    ),
  },
  {
    id: 'keyword-models',
    name: 'Keyword Models (Universal)',
    tags: ['Models', 'Keyword'],
    element: (
      <KeywordModelsSlide
        title={titanium.keyword}
        overview={titanium.overview}
        models={titanium.models}
      />
    ),
  },
  {
    id: 'section-cover',
    name: 'Back Cover',
    tags: ['Cover'],
    element: (
      <SectionCoverSlide
        titleLine1="Shaping Visibility"
        titleLine2="in the Age of AI"
        category="Watch Media"
        period="Dec 2025 – Feb 2026"
        website="www.watch360.ai"
      />
    ),
  },

  // ── Legacy slides (NOT used in current report — candidates for deletion) ──
  {
    id: 'legacy-table',
    name: '⚠️ Legacy: Table Slide',
    tags: ['Unused'],
    element: (
      <TableSlide
        titleLines={['Top Sources ', 'Used by AI']}
        subtitle="Information sources used by AI models for diver watch recommendations across price segments"
        rows={MOCK_ROWS}
        insights={MOCK_INSIGHTS}
        footerRight="www.watch360.ai"
      />
    ),
  },
  {
    id: 'legacy-countries',
    name: '⚠️ Legacy: Countries Slide',
    tags: ['Unused', 'Map'],
    element: (
      <CountriesSlide
        countries={DEFAULT_COUNTRIES}
        mediaSamples={DEFAULT_MEDIA}
        footerRight="www.watch360.ai"
      />
    ),
  },
]

/** Descriptions for list-view */
export const DESCRIPTIONS: Record<string, string> = {
  'cover': 'Main report cover — title, period, illustration',
  'toc': 'Table of contents — clickable slide overview',
  'overview': 'Executive summary — key metrics, period highlights',
  'top-brands': 'Two-column ranked table — All Mentions vs Title Mentions',
  'top-countries': 'World map + country breakdown table',
  'top-sources': 'Source domains table with insight panel',
  'top-collections': 'Two-column ranked collection table with brand tags',
  'quote': 'Full-bleed quote — photo background, attribution',
  'watch-references': 'Watch model cards — image, specs, metrics',
  'top-models-table': '9-column detailed model specs table',
  'keyword-brands': 'Universal keyword slide — brand rankings (data-driven)',
  'keyword-models': 'Universal keyword slide — model cards (data-driven)',
  'section-cover': 'Back cover — closing slide with subtitle',
  'legacy-table': '⚠️ NOT USED — old table format, replaced by TopSourcesSlide',
  'legacy-countries': '⚠️ NOT USED — old countries format, replaced by TopCountriesSlide',
}

export const ALL_TAGS: SlideTag[] = ['All', 'Cover', 'Overview', 'Table', 'Models', 'Keyword', 'Quote', 'Map', 'Unused']

/** Legacy: used by reports/index.ts for the "Templates v1" report version */
export const REPORT_SLIDES = SLIDE_TEMPLATES.filter(t => !t.tags.includes('Unused')).map(t => ({
  id: `report-${t.id}`,
  element: t.element,
}))

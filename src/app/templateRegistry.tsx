import React from 'react'
import { CoverSlide } from '../components/slides/CoverSlide'
import { SectionCoverSlide } from '../components/slides/SectionCoverSlide'
import { TableSlide } from '../components/slides/TableSlide'
import { WatchReferencesSlide } from '../components/slides/WatchReferencesSlide'
import { QuoteSlide } from '../components/slides/QuoteSlide'
import watchImg from '../../assets/images/Watch 1.webp'
import quotesImg2 from '../../assets/images/2.webp'

export type SlideTag = 'All' | 'Cover' | 'Table' | 'Quote' | 'Models'

export interface SlideTemplate {
  id: string
  name: string
  tags: SlideTag[]
  element: React.ReactElement
}

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

const MOCK_WATCHES = [
  {
    image: watchImg, brand: 'Grand Seiko', model: 'Annual Accuracy Quartz SBGX361',
    launchDate: 'Launch Apr, 2026', mentions: 23, sources: 23, countries: 23,
    priceRange: '$10 000-$25 000', dialColor: 'Blue', dialColorHex: '#455691',
  },
  {
    image: watchImg, brand: 'Grand Seiko', model: 'Heritage Collection SBGA211',
    launchDate: 'Launch Mar, 2026', mentions: 19, sources: 17, countries: 14,
    priceRange: '$5 000-$10 000', dialColor: 'White', dialColorHex: '#C0C0C0',
  },
  {
    image: watchImg, brand: 'Omega', model: 'Seamaster Planet Ocean 600M',
    launchDate: 'Launch Feb, 2026', mentions: 31, sources: 28, countries: 19,
    priceRange: '$5 000-$10 000', dialColor: 'Black', dialColorHex: '#3A3A3A',
  },
  {
    image: watchImg, brand: 'Rolex', model: 'Submariner Date 126610LN',
    launchDate: 'Launch Jan, 2026', mentions: 45, sources: 38, countries: 27,
    priceRange: '$10 000-$25 000', dialColor: 'Black', dialColorHex: '#3A3A3A',
  },
]

export const SLIDE_TEMPLATES: SlideTemplate[] = [
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
  {
    id: 'table',
    name: 'Top Sources Table',
    tags: ['Table'],
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
    id: 'watch-models',
    name: 'Watch Models',
    tags: ['Table', 'Models'],
    element: (
      <WatchReferencesSlide
        watches={MOCK_WATCHES}
        footerRight="www.watch360.ai"
      />
    ),
  },
  {
    id: 'quote',
    name: 'Quote',
    tags: ['Quote'],
    element: (
      <QuoteSlide
        quote="\u201cAI doesn\u2019t just recommend watches \u2014 it defines which brands exist in the consumer\u2019s reality.\u201d"
        author="ChatGPT"
        authorDescription="AI Model, OpenAI"
        footerRight="www.watch360.ai"
      />
    ),
  },
]

/**
 * REPORT_SLIDES — порядок слайдов в отчёте.
 * Здесь можно использовать любые темплейты с другими данными/пропсами.
 */
export const REPORT_SLIDES: { id: string; element: React.ReactElement }[] = [
  {
    id: 'report-cover',
    element: (
      <CoverSlide
        title="Watch Media"
        period="Dec 2025 – Feb 2026"
        website="www.watch360.ai"
      />
    ),
  },
  {
    id: 'report-section-cover',
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
  {
    id: 'report-table',
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
    id: 'report-watch-models',
    element: (
      <WatchReferencesSlide
        watches={MOCK_WATCHES}
        footerRight="www.watch360.ai"
      />
    ),
  },
  {
    id: 'report-quote-1',
    element: (
      <QuoteSlide
        quote="\u201cAI doesn\u2019t just recommend watches \u2014 it defines which brands exist in the consumer\u2019s reality.\u201d"
        author="ChatGPT"
        authorDescription="AI Model, OpenAI"
        footerRight="www.watch360.ai"
      />
    ),
  },
  {
    id: 'report-quote-2',
    element: (
      <QuoteSlide
        quote="\u201cThe watch that earns the most media attention is not always the one on the most wrists \u2014 it\u2019s the one in the most conversations.\u201d"
        author="Claude"
        authorDescription="AI Model, Anthropic"
        backgroundImage={quotesImg2}
        footerRight="www.watch360.ai"
      />
    ),
  },
]

export const ALL_TAGS: SlideTag[] = ['All', 'Cover', 'Table', 'Models', 'Quote']

/**
 * KeywordBrandsSlide — universal slide for keyword brand analysis.
 *
 * Layout:
 *   "Rose Gold" in Titles             [logo]
 *   SOURCES: 47  ARTICLES: 103  COMMENTS: 95
 *   ──────────────────────────────────────────
 *   All Mentions     │  Brand Mentions in Title
 *   1 Brand   ████ N │  1 Brand   ████ N
 *   ...              │  ...
 *
 * Replaces: RoseGoldSlide.tsx, TitaniumSlide.tsx, and any future keyword slides.
 */
import { SlideFrame } from '../ui/SlideFrame'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'
import { SlideTitle } from '../ui/SlideTitle'
import { OverviewBar } from '../ui/OverviewBar'
import { BrandTable } from '../ui/BrandTable'
import { spacing } from '../../theme/spacing'
import type { KeywordOverview, KeywordBrandRow } from '../../data/keywords/types'

interface Props {
  title: string
  overview: KeywordOverview
  allMentions: KeywordBrandRow[]
  titleMentions: KeywordBrandRow[]
  footerRight?: string
  footerRightUrl?: string
}

export function KeywordBrandsSlide({
  title,
  overview,
  allMentions,
  titleMentions,
  footerRight = 'www.watch360.ai',
  footerRightUrl = 'https://www.watch360.ai',
}: Props) {
  return (
    <SlideFrame>
      <Header />
      <Footer right={footerRight} rightUrl={footerRightUrl} />
      <SlideTitle>{title}</SlideTitle>
      <OverviewBar
        metrics={[
          { label: 'Sources',  value: overview.sources },
          { label: 'Articles', value: overview.articles },
          { label: 'Comments', value: overview.comments },
        ]}
      />
      <div
        style={{
          position: 'absolute',
          top: 83,
          left: spacing.slideX,
          display: 'flex',
          gap: 40,
          width: 656,
          alignItems: 'flex-start',
        }}
      >
        <BrandTable title="All Mentions" data={allMentions} />
        <BrandTable title="Brand Mentions in Title" data={titleMentions} />
      </div>
    </SlideFrame>
  )
}

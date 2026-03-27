/**
 * KeywordModelsSlide — universal slide for keyword model analysis.
 *
 * Layout:
 *   "Rose Gold" in Titles             [logo]
 *   SOURCES: 47  ARTICLES: 103  COMMENTS: 95
 *   ──────────────────────────────────────────
 *   Top 10 Models    │
 *   [img] Brand  7   │  [img] Brand  3
 *         Model ████ │        Model ████
 *   ...              │  ...
 *
 * Replaces: RoseGoldModelsSlide.tsx, TitaniumModelsSlide.tsx, and future keyword model slides.
 */
import { SlideFrame } from '../ui/SlideFrame'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'
import { SlideTitle } from '../ui/SlideTitle'
import { OverviewBar } from '../ui/OverviewBar'
import { ModelCardColumn } from '../ui/ModelCardColumn'
import { spacing } from '../../theme/spacing'
import type { KeywordOverview, KeywordModelRow } from '../../data/keywords/types'

interface Props {
  title: string
  overview: KeywordOverview
  models: KeywordModelRow[]
  footerRight?: string
  footerRightUrl?: string
}

export function KeywordModelsSlide({
  title,
  overview,
  models,
  footerRight = 'www.watch360.ai',
  footerRightUrl = 'https://www.watch360.ai',
}: Props) {
  const maxArticles = Math.max(...models.map(m => m.articles), 1)
  const left = models.slice(0, 5)
  const right = models.slice(5, 10)

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
          width: 656,
          display: 'flex',
          gap: 32,
        }}
      >
        <ModelCardColumn title="Top 10 Models" data={left}  maxArticles={maxArticles} />
        <ModelCardColumn                       data={right} maxArticles={maxArticles} />
      </div>
    </SlideFrame>
  )
}

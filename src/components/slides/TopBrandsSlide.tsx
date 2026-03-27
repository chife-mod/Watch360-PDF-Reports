import { SlideFrame } from '../ui/SlideFrame'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'
import { SlideTitle } from '../ui/SlideTitle'
import { BrandTable, type BrandRow } from '../ui/BrandTable'
import { spacing } from '../../theme/spacing'
import { colors } from '../../theme/colors'

/* ── Real data from Excel: "4. Top 25 Brands" (Feb 2026) ──── */
export const FEB_2026_ALL_MENTIONS: BrandRow[] = [
  { rank: 1, brand: 'Rolex', articles: 1413 },
  { rank: 2, brand: 'Omega', articles: 1073 },
  { rank: 3, brand: 'Audemars Piguet', articles: 981 },
  { rank: 4, brand: 'Patek Philippe', articles: 763 },
  { rank: 5, brand: 'TAG Heuer', articles: 758 },
  { rank: 6, brand: 'Breguet', articles: 678 },
  { rank: 7, brand: 'Cartier', articles: 640 },
  { rank: 8, brand: 'Vacheron Constantin', articles: 607 },
  { rank: 9, brand: 'Seiko', articles: 601 },
  { rank: 10, brand: 'Zenith', articles: 601 },
]

export const FEB_2026_TITLE_MENTIONS: BrandRow[] = [
  { rank: 1, brand: 'Rolex', articles: 322 },
  { rank: 2, brand: 'Omega', articles: 247 },
  { rank: 3, brand: 'Audemars Piguet', articles: 233 },
  { rank: 4, brand: 'Seiko', articles: 231 },
  { rank: 5, brand: 'TAG Heuer', articles: 228 },
  { rank: 6, brand: 'Hublot', articles: 225 },
  { rank: 7, brand: 'Zenith', articles: 193 },
  { rank: 8, brand: 'Vacheron Constantin', articles: 153 },
  { rank: 9, brand: 'Breguet', articles: 134 },
  { rank: 10, brand: 'IWC', articles: 129 },
]

export { type BrandRow } from '../ui/BrandTable'

export interface TopBrandsSlideProps {
  title?: string
  allMentions?: BrandRow[]
  titleMentions?: BrandRow[]
  footerRight?: string
  footerRightUrl?: string
}

/**
 * TopBrandsSlide — "Top 10 Brands"
 *
 * Now uses shared BrandTable primitive — same table component
 * as KeywordBrandsSlide. Edit ui/BrandTable.tsx → fixes everywhere.
 */
export function TopBrandsSlide({
  title = 'Top 10 Brands',
  allMentions = FEB_2026_ALL_MENTIONS,
  titleMentions = FEB_2026_TITLE_MENTIONS,
  footerRight = 'www.watch360.ai',
  footerRightUrl = 'https://www.watch360.ai',
}: TopBrandsSlideProps) {
  return (
    <SlideFrame>
      <Header />
      <Footer right={footerRight} rightUrl={footerRightUrl} />

      {/* Title — teal accent for this slide */}
      <SlideTitle><span style={{ color: colors.accent.teal }}>{title}</span></SlideTitle>

      {/* Two-column brand tables */}
      <div
        style={{
          position: 'absolute',
          top: 80,
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

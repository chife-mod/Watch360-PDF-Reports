import { SlideFrame } from '../ui/SlideFrame'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'
import { colors } from '../../theme/colors'
import { typography } from '../../theme/typography'
import { spacing } from '../../theme/spacing'

export interface BrandRow {
  rank: number
  brand: string
  articles: number
}

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
 * Figma node: 53:10113
 *
 * Layout (720×450px):
 *   Two columns side-by-side with 64px gap.
 *   Each column: subtitle (16px) → table headers (7px, uppercase, with
 *   solid #808080 border-bottom) → 10 data rows (32px each).
 *
 *   Consistent with TopSourcesSlide table styling.
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

      {/* ── Title ── */}
      <p
        style={{
          position: 'absolute',
          top: spacing.titleTop,
          left: spacing.slideX,
          margin: 0,
          fontFamily: typography.fontFamily,
          fontSize: 32,
          fontWeight: 400,
          color: colors.accent.teal,
          lineHeight: 1,
        }}
      >
        {title}
      </p>

      {/* ── Columns Container ── */}
      <div
        style={{
          position: 'absolute',
          top: 80, // 24px gap from title baseline
          left: spacing.slideX,
          display: 'flex',
          gap: 40,
          width: 656,
          alignItems: 'flex-start',
        }}
      >
        <BrandTable columnTitle="All Mentions" data={allMentions} />
        <BrandTable columnTitle="Brand Mentions in Title" data={titleMentions} />
      </div>
    </SlideFrame>
  )
}

/* ── Table header text style — identical to TopSourcesSlide hdrStyle ── */
const hdrStyle: React.CSSProperties = {
  fontFamily: typography.fontFamily,
  fontSize: 7,
  fontWeight: 400,
  color: colors.text.primary,
  opacity: 0.5,
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
  lineHeight: 1,
  whiteSpace: 'nowrap',
}

function BrandTable({ columnTitle, data }: { columnTitle: string; data: BrandRow[] }) {
  const maxArticles = Math.max(...data.map(d => d.articles), 1)

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {/* Column Subtitle */}
      <div
        style={{
          fontFamily: typography.fontFamily,
          fontSize: 16,
          fontWeight: 400,
          color: '#FFFFFF',
          lineHeight: 1.5,
        }}
      >
        {columnTitle}
      </div>

      {/* Table */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* ── Header Row — consistent with TopSourcesSlide ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 0,
            borderBottom: `1px solid ${colors.border}`,
            paddingBottom: 6,
            boxSizing: 'border-box',
          }}
        >
          <div style={{ ...hdrStyle, width: 31 }}>Rank</div>
          <div style={{ ...hdrStyle, width: 125 }}>Brand</div>
          <div style={{ ...hdrStyle, flex: 1, textAlign: 'right' }}>Articles qty</div>
        </div>

        {/* ── Data Rows ── */}
        {data.map((row, i) => {
          const isTop = row.rank === 1
          const barPct = Math.max((row.articles / maxArticles) * 100, 4)

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 29,
                gap: 0,
                borderTop: i === 0 ? 'none' : '0.5px solid rgba(255,255,255,0.15)',
              }}
            >
              {/* Rank */}
              <div
                style={{
                  width: 31,
                  fontFamily: typography.fontFamily,
                  fontSize: 10,
                  fontWeight: isTop ? 700 : 400,
                  color: isTop ? colors.accent.teal : colors.text.primary,
                  opacity: isTop ? 1 : 0.5,
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {row.rank}
              </div>

              {/* Brand */}
              <div
                style={{
                  width: 125,
                  fontFamily: typography.fontFamily,
                  fontSize: 10,
                  fontWeight: 400,
                  color: isTop ? colors.accent.teal : '#FFFFFF',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  paddingRight: 8,
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}
              >
                {row.brand}
              </div>

              {/* Articles Qty + Bar — consistent with TopSourcesSlide */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  minWidth: 0,
                }}
              >
                {/* Bar */}
                <div
                  style={{
                    flex: 1,
                    height: 3,
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: 500,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${barPct}%`,
                      background: isTop ? colors.accent.teal : 'rgba(255,255,255,0.75)',
                      borderRadius: 500,
                    }}
                  />
                </div>

                {/* Number */}
                <span
                  style={{
                    fontFamily: typography.fontFamily,
                    fontSize: 10,
                    fontWeight: 400,
                    color: isTop ? colors.accent.teal : colors.text.primary,
                    lineHeight: 1,
                    minWidth: 22,
                    textAlign: 'right',
                    flexShrink: 0,
                  }}
                >
                  {row.articles}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

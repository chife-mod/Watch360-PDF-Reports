import { SlideFrame } from '../ui/SlideFrame'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'
import { colors } from '../../theme/colors'
import { typography } from '../../theme/typography'
import { spacing } from '../../theme/spacing'

/* ── Types ────────────────────────────────────────────────── */

export interface RoseGoldBrandRow {
  rank: number
  brand: string
  articles: number
}

export interface RoseGoldOverview {
  sources: string
  articles: string
  comments: string
}

export interface RoseGoldSlideProps {
  title?: string
  overview?: RoseGoldOverview
  allMentions?: RoseGoldBrandRow[]
  titleMentions?: RoseGoldBrandRow[]
  footerRight?: string
  footerRightUrl?: string
}

/* ── Default data: "7. Rose Gold or Ever Rose Gold in Title" ── */

export const ROSE_GOLD_OVERVIEW: RoseGoldOverview = {
  sources: '47',
  articles: '103',
  comments: '95',
}

export const ROSE_GOLD_ALL_MENTIONS: RoseGoldBrandRow[] = [
  { rank: 1, brand: 'Daniel Roth', articles: 27 },
  { rank: 2, brand: 'Armin Strom', articles: 15 },
  { rank: 3, brand: 'Breguet', articles: 8 },
  { rank: 4, brand: 'Mido', articles: 8 },
  { rank: 5, brand: 'Zenith', articles: 7 },
  { rank: 6, brand: 'Audemars Piguet', articles: 7 },
  { rank: 7, brand: 'Parmigiani Fleurier', articles: 6 },
  { rank: 8, brand: 'Ressence', articles: 5 },
  { rank: 9, brand: 'Longines', articles: 4 },
  { rank: 10, brand: 'Bvlgari', articles: 3 },
]

export const ROSE_GOLD_TITLE_MENTIONS: RoseGoldBrandRow[] = [
  { rank: 1, brand: 'Daniel Roth', articles: 26 },
  { rank: 2, brand: 'Armin Strom', articles: 14 },
  { rank: 3, brand: 'Zenith', articles: 6 },
  { rank: 4, brand: 'Ressence', articles: 5 },
  { rank: 5, brand: 'Parmigiani Fleurier', articles: 3 },
  { rank: 6, brand: 'Longines', articles: 3 },
  { rank: 7, brand: 'Breguet', articles: 2 },
  { rank: 8, brand: 'Mido', articles: 2 },
  { rank: 9, brand: 'Audemars Piguet', articles: 1 },
  { rank: 10, brand: 'Bvlgari', articles: 1 },
]

/* ── Component ───────────────────────────────────────────── */

export function RoseGoldSlide({
  title = '\u201CRose Gold\u201D in Titles',
  overview = ROSE_GOLD_OVERVIEW,
  allMentions = ROSE_GOLD_ALL_MENTIONS,
  titleMentions = ROSE_GOLD_TITLE_MENTIONS,
  footerRight = 'www.watch360.ai',
  footerRightUrl = 'https://www.watch360.ai',
}: RoseGoldSlideProps) {
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
          color: '#FFFFFF',
          lineHeight: 1,
        }}
      >
        {title}
      </p>

      {/* ── Overview metrics — below title, header style ── */}
      <div
        style={{
          position: 'absolute',
          top: 68,
          left: spacing.slideX,
          display: 'flex',
          gap: 24,
          alignItems: 'center',
        }}
      >
        {[
          { label: 'Sources', value: overview.sources },
          { label: 'Articles', value: overview.articles },
          { label: 'Comments', value: overview.comments },
        ].map(({ label, value }) => (
          <span
            key={label}
            style={{
              fontFamily: typography.fontFamily,
              fontSize: 7,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            {label}:&nbsp;<span style={{ color: '#FFFFFF' }}>{value}</span>
          </span>
        ))}
      </div>

      {/* ── Columns Container ── */}
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
        <BrandTable columnTitle="All Mentions" data={allMentions} />
        <BrandTable columnTitle="Brand Mentions in Title" data={titleMentions} />
      </div>
    </SlideFrame>
  )
}

/* ── BrandTable — identical to TopBrandsSlide's inner table ── */

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

function BrandTable({ columnTitle, data }: { columnTitle: string; data: RoseGoldBrandRow[] }) {
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
        {/* ── Header Row ── */}
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

              {/* Articles Qty + Bar */}
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

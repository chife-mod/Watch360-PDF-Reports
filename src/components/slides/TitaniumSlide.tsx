import { SlideFrame } from '../ui/SlideFrame'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'
import { colors } from '../../theme/colors'
import { typography } from '../../theme/typography'
import { spacing } from '../../theme/spacing'

/* ── Types ────────────────────────────────────────────────── */

export interface TitaniumBrandRow {
  rank: number
  brand: string
  articles: number
}

export interface TitaniumOverview {
  sources: string
  articles: string
  comments: string
}

export interface TitaniumSlideProps {
  title?: string
  overview?: TitaniumOverview
  allMentions?: TitaniumBrandRow[]
  titleMentions?: TitaniumBrandRow[]
  footerRight?: string
  footerRightUrl?: string
}

/* ── Data from "8. Titanium in Title" ── */

export const TITANIUM_OVERVIEW: TitaniumOverview = {
  sources: '59',
  articles: '142',
  comments: '310',
}

export const TITANIUM_ALL_MENTIONS: TitaniumBrandRow[] = [
  { rank: 1,  brand: 'Vacheron Constantin', articles: 28 },
  { rank: 2,  brand: 'Hublot',              articles: 15 },
  { rank: 3,  brand: 'Rolex',               articles: 8  },
  { rank: 4,  brand: 'Breitling',           articles: 7  },
  { rank: 5,  brand: 'Audemars Piguet',     articles: 7  },
  { rank: 6,  brand: 'Breguet',             articles: 6  },
  { rank: 7,  brand: 'Roger Dubuis',        articles: 5  },
  { rank: 8,  brand: 'Omega',               articles: 5  },
  { rank: 9,  brand: 'Tissot',              articles: 5  },
  { rank: 10, brand: 'MB&F',                articles: 4  },
]

export const TITANIUM_TITLE_MENTIONS: TitaniumBrandRow[] = [
  { rank: 1,  brand: 'Vacheron Constantin', articles: 20 },
  { rank: 2,  brand: 'Hublot',              articles: 13 },
  { rank: 3,  brand: 'Roger Dubuis',        articles: 5  },
  { rank: 4,  brand: 'Breitling',           articles: 5  },
  { rank: 5,  brand: 'Cartier',             articles: 3  },
  { rank: 6,  brand: 'Tissot',              articles: 3  },
  { rank: 7,  brand: 'Tutima',              articles: 2  },
  { rank: 8,  brand: 'MB&F',                articles: 2  },
  { rank: 9,  brand: 'Chopard',             articles: 2  },
  { rank: 10, brand: 'Omega',               articles: 2  },
]

/* ── Component ───────────────────────────────────────────── */

export function TitaniumSlide({
  title = '\u201CTitanium\u201D in Titles',
  overview = TITANIUM_OVERVIEW,
  allMentions = TITANIUM_ALL_MENTIONS,
  titleMentions = TITANIUM_TITLE_MENTIONS,
  footerRight = 'www.watch360.ai',
  footerRightUrl = 'https://www.watch360.ai',
}: TitaniumSlideProps) {
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

      {/* ── Overview metrics ── */}
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
          { label: 'Sources',  value: overview.sources  },
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

      {/* ── Two brand tables ── */}
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
        <BrandTable columnTitle="All Mentions"          data={allMentions}   />
        <BrandTable columnTitle="Brand Mentions in Title" data={titleMentions} />
      </div>
    </SlideFrame>
  )
}

/* ── BrandTable ──────────────────────────────────────────── */

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

function BrandTable({ columnTitle, data }: { columnTitle: string; data: TitaniumBrandRow[] }) {
  const maxArticles = Math.max(...data.map(d => d.articles), 1)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontFamily: typography.fontFamily, fontSize: 16, fontWeight: 400, color: '#FFFFFF', lineHeight: 1.5 }}>
        {columnTitle}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', borderBottom: `1px solid ${colors.border}`, paddingBottom: 6, boxSizing: 'border-box' }}>
          <div style={{ ...hdrStyle, width: 31 }}>Rank</div>
          <div style={{ ...hdrStyle, width: 125 }}>Brand</div>
          <div style={{ ...hdrStyle, flex: 1, textAlign: 'right' }}>Articles qty</div>
        </div>

        {/* Rows */}
        {data.map((row, i) => {
          const isTop = row.rank === 1
          const barPct = Math.max((row.articles / maxArticles) * 100, 4)
          return (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'center', height: 29, borderTop: i === 0 ? 'none' : '0.5px solid rgba(255,255,255,0.15)' }}
            >
              <div style={{ width: 31, fontFamily: typography.fontFamily, fontSize: 10, fontWeight: isTop ? 700 : 400, color: isTop ? colors.accent.teal : colors.text.primary, opacity: isTop ? 1 : 0.5, lineHeight: 1, flexShrink: 0 }}>
                {row.rank}
              </div>
              <div style={{ width: 125, fontFamily: typography.fontFamily, fontSize: 10, fontWeight: 400, color: isTop ? colors.accent.teal : '#FFFFFF', lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: 8, flexShrink: 0, boxSizing: 'border-box' }}>
                {row.brand}
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 500, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${barPct}%`, background: isTop ? colors.accent.teal : 'rgba(255,255,255,0.75)', borderRadius: 500 }} />
                </div>
                <span style={{ fontFamily: typography.fontFamily, fontSize: 10, fontWeight: 400, color: isTop ? colors.accent.teal : colors.text.primary, lineHeight: 1, minWidth: 22, textAlign: 'right', flexShrink: 0 }}>
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

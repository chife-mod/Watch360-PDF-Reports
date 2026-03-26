import { SlideFrame } from '../ui/SlideFrame'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'
import { BrandTag } from '../ui/BrandTag'
import { typography } from '../../theme/typography'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'

/* ── Types ────────────────────────────────────────────────── */

export interface RoseGoldModelRow {
  rank: number
  model: string
  brand: string
  articles: number
}

export interface RoseGoldModelsSlideProps {
  title?: string
  overview?: { sources: string; articles: string; comments: string }
  models?: RoseGoldModelRow[]
  footerRight?: string
  footerRightUrl?: string
}

/* ── Data ────────────────────────────────────────────────── */

export const ROSE_GOLD_MODELS: RoseGoldModelRow[] = [
  { rank: 1,  brand: 'Mido',                model: 'Multifort 8 Two Crowns M047.507.37.051.00',        articles: 7 },
  { rank: 2,  brand: 'Parmigiani Fleurier', model: 'TONDA PF MICRO-ROTOR STEEL PLATINUM AGAVE BLUE',   articles: 3 },
  { rank: 3,  brand: 'Parmigiani Fleurier', model: 'TONDA PF MICRO-ROTOR ROSE GOLD AGAVE BLUE',        articles: 3 },
  { rank: 4,  brand: 'Armin Strom',         model: 'Dual Time GMT Resonance Rose Gold RG25.DT.75',     articles: 3 },
  { rank: 5,  brand: 'Daniel Roth',         model: 'Extra Plat Rose Gold Skeleton DBBD02A1',           articles: 3 },
  { rank: 6,  brand: 'Daniel Roth',         model: 'Tourbillon Regulateur Double Face C187',           articles: 3 },
  { rank: 7,  brand: 'Longines',            model: 'Master Collection Chrono Moonphase L2.773.8.78.3', articles: 2 },
  { rank: 8,  brand: 'Mido',                model: 'Multifort 8 One Crown Two-Tone M055.507.22.051.00',articles: 1 },
  { rank: 9,  brand: 'Panerai',             model: 'Radiomir Otto Giorni PAM02088',                    articles: 1 },
  { rank: 10, brand: 'Audemars Piguet',     model: 'Royal Oak Selfwinding 15510OR',                    articles: 1 },
]

/* ── Shared styles ───────────────────────────────────────── */

const HDR: React.CSSProperties = {
  fontFamily: typography.fontFamily,
  fontSize: 7,
  fontWeight: 400,
  color: '#FFFFFF',
  opacity: 0.5,
  textTransform: 'uppercase',
  letterSpacing: 0.14,
  lineHeight: 1,
  whiteSpace: 'nowrap',
}

/* ── Component ───────────────────────────────────────────── */

export function RoseGoldModelsSlide({
  title = '\u201CRose Gold\u201D in Titles',
  overview = { sources: '47', articles: '103', comments: '95' },
  models = ROSE_GOLD_MODELS,
  footerRight = 'www.watch360.ai',
  footerRightUrl = 'https://www.watch360.ai',
}: RoseGoldModelsSlideProps) {
  const maxArticles = Math.max(...models.map(m => m.articles), 1)
  const leftCol  = models.slice(0, 5)
  const rightCol = models.slice(5, 10)

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

      {/* ── Overview metrics — same as RoseGoldSlide ── */}
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
          { label: 'Sources',  value: overview.sources },
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

      {/* ── Two-column table ── */}
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
        <ModelColumn title="Top 10 Models" data={leftCol}  maxArticles={maxArticles} showTitle />
        <ModelColumn title=""              data={rightCol} maxArticles={maxArticles} showTitle={false} />
      </div>
    </SlideFrame>
  )
}

/* ── ModelColumn ─────────────────────────────────────────── */

function ModelColumn({
  title,
  data,
  maxArticles,
  showTitle,
}: {
  title: string
  data: RoseGoldModelRow[]
  maxArticles: number
  showTitle: boolean
}) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

      {/* Section subtitle — "Top 10 Models" like "All Mentions" in brands slide */}
      <div
        style={{
          fontFamily: typography.fontFamily,
          fontSize: 16,
          fontWeight: 400,
          color: showTitle ? '#FFFFFF' : 'transparent',
          lineHeight: 1.5,
          marginBottom: 8,
          userSelect: 'none',
        }}
      >
        {title || 'placeholder'}
      </div>

      {/* Column header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          borderBottom: `1px solid ${colors.border}`,
          paddingBottom: 6,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ ...HDR, width: 19 + 8 + 54 + 8 }}>Rank</div>
          <div style={{ ...HDR, flex: 1 }}>Model</div>
        <div style={{ ...HDR }}>Articles qty</div>
      </div>

      {/* Rows — card style matching WatchReferencesSlide */}
      {data.map((row, i) => {
        const isTop = row.rank === 1
        const barPct = Math.max((row.articles / maxArticles) * 100, 4)

        return (
          <div
            key={row.rank}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 58,
              borderTop: i === 0 ? 'none' : '0.5px solid rgba(255,255,255,0.15)',
              boxSizing: 'border-box',
            }}
          >
            {/* Rank */}
            <div
              style={{
                width: 19,
                fontFamily: typography.fontFamily,
                fontSize: 10,
                fontWeight: isTop ? 700 : 400,
                color: isTop ? colors.accent.teal : 'rgba(255,255,255,0.5)',
                lineHeight: 1.5,
                flexShrink: 0,
              }}
            >
              {row.rank}
            </div>

            {/* Image placeholder — 54×54, borderRadius 16, paddingRight 8 */}
            <div style={{ paddingRight: 8, flexShrink: 0 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 16,
                  border: '0.5px solid rgba(255,255,255,0.24)',
                  backgroundColor: colors.thumbnailBg,
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Brand tag + model name */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: 2,
                paddingRight: 8,
              }}
            >
              <BrandTag label={row.brand} />
              <span
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 10,
                  fontWeight: 400,
                  color: isTop ? colors.accent.teal : '#FFFFFF',
                  lineHeight: 1.4,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {row.model}
              </span>
            </div>

            {/* Articles number + bar */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 4,
                flexShrink: 0,
                width: 48,
              }}
            >
              <span
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 10,
                  fontWeight: 400,
                  color: isTop ? colors.accent.teal : '#FFFFFF',
                  lineHeight: 1,
                }}
              >
                {row.articles}
              </span>
              <div
                style={{
                  width: '100%',
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
            </div>
          </div>
        )
      })}
    </div>
  )
}

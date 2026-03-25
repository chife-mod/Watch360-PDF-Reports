import { SlideFrame } from '../ui/SlideFrame'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'
import { BrandTag } from '../ui/BrandTag'
import { LaunchDate } from '../ui/LaunchDate'
import { typography } from '../../theme/typography'
import { colors } from '../../theme/colors'
import type { WatchReference } from './WatchReferencesSlide'

export interface TopModelsTableSlideProps {
  title?: string
  titleHighlight?: string
  watches: WatchReference[]
  startIndex?: number
  footerRight?: string
  footerRightUrl?: string
}

// ─── Column widths ──────────────────────────────────────────────────────────
// Total available width: 656px
// Rank(#) + thumb: 14 + 8gap + 28 = 50
// Model:           180  (more space for long names)
// Brand:            90  (tag fits comfortably)
// Articles:         40
// Sources:          40
// Countries:        44
// Price Range:      80
// Case Material:    70  (tighter, closer to Dial)
// Dial Color:       52  (flex:1, right-aligned dot)
// Total available: 656px
// rank(50) + model(140) + brand(78) + articles(56) + sources(56) + countries(60) + price(84) + case(56) + dial(flex≈76)

const COL = {
  rank:      50,   // rank number(14) + gap(6) + thumb(28)
  model:    140,   // names clip with ellipsis
  brand:     78,   // close to Model
  articles:  56,   // wider — balanced spacing
  sources:   56,
  countries: 60,   // wider — no overlap with Price Range
  price:     84,
  case:      56,   // stays tight; shifts right due to wider preceding cols
  // dial: flex:1 (≈76px remaining, right-aligned dot)
}

const CELL: React.CSSProperties = {
  fontFamily: typography.fontFamily,
  fontSize: 9,
  fontWeight: 400,
  color: '#ffffff',
  lineHeight: 1.5,
}

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

export function TopModelsTableSlide({
  title = 'Top Watch References',
  titleHighlight,
  watches,
  startIndex = 0,
  footerRight,
  footerRightUrl,
}: TopModelsTableSlideProps) {
  return (
    <SlideFrame>
      <Header />

      {/* ── Title ── */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 32,
          width: 437,
          fontFamily: typography.fontFamily,
          fontSize: 32,
          fontWeight: 400,
          lineHeight: 1,
          color: 'white',
        }}
      >
        <span>{title}</span>
        {titleHighlight && (
          <span style={{ color: colors.accent.teal }}> {titleHighlight}</span>
        )}
      </div>

      {/* ── Table ── */}
      <div
        style={{
          position: 'absolute',
          left: 32,
          top: 88,        // moved up: header fits now
          width: 656,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Table Header ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            width: '100%',
            borderBottom: `0.5px solid ${colors.border}`,
            paddingBottom: 6,
            boxSizing: 'border-box',
          }}
        >
          <div style={{ ...HDR, width: COL.rank }}>Rank</div>
          <div style={{ ...HDR, width: COL.model }}>Model</div>
          <div style={{ ...HDR, width: COL.brand }}>Brand</div>
          <div style={{ ...HDR, width: COL.articles }}>Articles</div>
          <div style={{ ...HDR, width: COL.sources }}>Sources</div>
          <div style={{ ...HDR, width: COL.countries }}>Countries</div>
          <div style={{ ...HDR, width: COL.price }}>Price Range</div>
          <div style={{ ...HDR, width: COL.case }}>Case Material</div>
          <div style={{ ...HDR, flex: 1, textAlign: 'right' }}>Dial Color</div>
        </div>

        {/* ── Rows ── */}
        {watches.map((w, i) => {
          const rank = startIndex + i + 1

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: 32,
                borderTop: '0.5px solid rgba(255,255,255,0.15)',
                boxSizing: 'border-box',
              }}
            >
              {/* 1. RANK + THUMBNAIL – left-aligned, fixed width */}
              <div
                style={{
                  width: COL.rank,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  flexShrink: 0,
                }}
              >
                <div style={{ ...CELL, width: 14, flexShrink: 0, opacity: rank === 1 ? 1 : 0.5 }}>
                  {rank}
                </div>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    border: '0.5px solid rgba(255,255,255,0.24)',
                    backgroundColor: '#1d2437',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  {w.image && (
                    <img
                      src={w.image}
                      alt={w.model}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  )}
                </div>
              </div>

              {/* 2. MODEL NAME + launch date below */}
              <div
                style={{
                  width: COL.model,
                  flexShrink: 0,
                  boxSizing: 'border-box',
                  paddingLeft: 8,   // ← 8px gap from thumbnail
                  paddingRight: 12,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    ...CELL,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {w.model}
                </div>
                {w.launchDate && (
                  <div style={{ marginTop: 0 }}>
                    <LaunchDate date={w.launchDate} />
                  </div>
                )}
              </div>

              {/* 3. BRAND TAG – left-aligned to column start */}
              <div
                style={{
                  width: COL.brand,
                  flexShrink: 0,
                  boxSizing: 'border-box',
                  paddingRight: 8,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <BrandTag label={w.brand} />
              </div>

              {/* 4. ARTICLES */}
              <div style={{ width: COL.articles, flexShrink: 0, ...CELL }}>
                {w.articles}
              </div>

              {/* 5. SOURCES */}
              <div style={{ width: COL.sources, flexShrink: 0, ...CELL }}>
                {w.sources}
              </div>

              {/* 6. COUNTRIES */}
              <div style={{ width: COL.countries, flexShrink: 0, ...CELL }}>
                {w.countries}
              </div>

              {/* 7. PRICE RANGE */}
              <div style={{ width: COL.price, flexShrink: 0, ...CELL }}>
                {w.priceRange}
              </div>

              {/* 8. CASE MATERIAL */}
              <div style={{ width: COL.case, flexShrink: 0, ...CELL }}>
                {w.caseMaterial || '—'}
              </div>

              {/* 9. DIAL COLOR DOT – right-aligned */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    // Always show outer ring: use explicit wrapper or auto-derive from dot color at 15%
                    backgroundColor: w.dialColorWrapperHex || `${w.dialColorHex}26`, // 26 hex ≈ 15% opacity
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    title={w.dialColor}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: w.dialColorHex,
                      border:
                        w.dialColorHex.toLowerCase() === '#000000' ||
                        w.dialColorHex.toLowerCase() === '#0d0d0d'
                          ? '0.5px solid rgba(255,255,255,0.2)'
                          : 'none',
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Footer right={footerRight} rightUrl={footerRightUrl} />
    </SlideFrame>
  )
}

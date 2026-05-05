import sfLogo from '../../../assets/logos/SF Logo.svg'
import { SlideFrame } from '../ui/SlideFrame'
import { colors } from '../../theme/colors'

export interface DemandRankRow {
  rank: number
  label: string                  // keyword or brand
  volume: number                 // monthly avg search volume
  trend: string                  // "+11%" / "-9%" / "0%"
  /** Optional flag — highlight this row regardless of position (e.g. client brand) */
  highlight?: boolean
}

export interface DemandRankSlideProps {
  title?: string                 // "Top Jewelry Keywords" / "Top Brands"
  subtitle?: string
  rows: DemandRankRow[]
  /** Header for the LABEL column ("Keyword" / "Brand") */
  labelColumnHeader?: string
  website?: string
}

const fmt = (n: number) => n.toLocaleString('en-US')

export function DemandRankSlide({
  title = 'Top Demand',
  subtitle = 'France · monthly avg search volume · 12-month trend',
  rows,
  labelColumnHeader = 'Keyword',
  website = 'www.semanticforce.ai',
}: DemandRankSlideProps) {
  const max = Math.max(...rows.map((r) => r.volume))

  return (
    <SlideFrame>
      <img
        src={sfLogo}
        alt="SemanticForce"
        style={{
          position: 'absolute',
          top: 25,
          right: 32,
          height: 24,
          width: 'auto',
          display: 'block',
        }}
      />

      <p
        style={{
          position: 'absolute',
          top: 24,
          left: 32,
          margin: 0,
          fontFamily: 'Inter, sans-serif',
          fontSize: 32,
          fontWeight: 400,
          color: '#FFFFFF',
          lineHeight: 1,
        }}
      >
        {title}
      </p>
      <p
        style={{
          position: 'absolute',
          top: 64,
          left: 32,
          right: 32,
          margin: 0,
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          fontWeight: 400,
          color: '#FFFFFF',
          opacity: 0.5,
          lineHeight: 1.5,
        }}
      >
        {subtitle}
      </p>

      {/* Table */}
      <div
        style={{
          position: 'absolute',
          top: 110,
          left: 32,
          right: 32,
          bottom: 56,
          fontFamily: 'Inter, sans-serif',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '24px 1fr 110px 80px',
            paddingBottom: 6,
            borderBottom: '1px solid #808080',
            fontSize: 7,
            opacity: 0.5,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          <span>#</span>
          <span>{labelColumnHeader}</span>
          <span style={{ textAlign: 'right' }}>Search Volume</span>
          <span style={{ textAlign: 'right' }}>Trend (12mo)</span>
        </div>

        {rows.map((r) => {
          const widthPct = (r.volume / max) * 100
          const trendNum = parseFloat(r.trend.replace('%', '').replace(',', '.'))
          const isPos = trendNum > 0
          const isNeg = trendNum < 0
          const isHighlight = r.highlight
          return (
            <div
              key={r.rank}
              style={{
                position: 'relative',
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '24px 1fr 110px 80px',
                alignItems: 'center',
                padding: '0 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                fontSize: 11,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${widthPct}%`,
                  background: isHighlight
                    ? 'rgba(0,195,217,0.10)'
                    : 'rgba(255,255,255,0.04)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />
              <span style={{ opacity: 0.5, position: 'relative', zIndex: 1 }}>
                {String(r.rank).padStart(2, '0')}
              </span>
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  color: isHighlight ? colors.accent.teal : 'white',
                  opacity: isHighlight ? 1 : 0.9,
                }}
              >
                {r.label}
              </span>
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  textAlign: 'right',
                  opacity: 0.9,
                }}
              >
                {fmt(r.volume)}
              </span>
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  textAlign: 'right',
                  fontSize: 10,
                  color: isPos
                    ? '#7CD992'
                    : isNeg
                    ? '#E2806B'
                    : 'white',
                  opacity: isPos || isNeg ? 0.95 : 0.4,
                }}
              >
                {r.trend || '—'}
              </span>
            </div>
          )
        })}
      </div>

      <a
        href={`https://${website}`}
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 32,
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          fontWeight: 400,
          color: 'white',
          opacity: 0.5,
          textDecoration: 'none',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        }}
      >
        {website}
      </a>
    </SlideFrame>
  )
}

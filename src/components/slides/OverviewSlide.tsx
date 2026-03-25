import { SlideFrame } from '../ui/SlideFrame'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'

/* ── Types ────────────────────────────────────────────────── */

export interface OverviewMeta {
  label: string
  value: string
}

export interface OverviewStat {
  label: string
  value: string
}

interface Props {
  titleParts: { text: string; teal?: boolean }[]
  meta: OverviewMeta[]
  statsLeft: OverviewStat[]
  statsRight: OverviewStat[]
  footerRight?: string
}

/**
 * OverviewSlide — "Overview of Analyzed Data"
 *
 * Figma node: 55:11542
 *
 * Pixel-perfect layout from Figma metadata:
 *   Title:     x=32, y=24, 32px
 *   Meta row:  x=305, y=104, h=28
 *     Period:    x=0 (relative)
 *     Industry:  x=508 (absolute) — aligns with right-area second col
 *     MediaType: x=626 (absolute)
 *   Stats grid: x=32, y=174, w=656, h=200
 *     Left col:  w=219, 2 cards × h=100
 *       Large stat: border-top 0.5px, pt=4, gap=8, pb=15, value=80px teal
 *     Right area: x=273, w=383
 *       2×2 grid: each card w=179.5, h=100, gap-x=24
 *       Small stat: border-top 0.5px, pt=4, gap=25, pb=8, value=48px white
 */
export function OverviewSlide({
  titleParts,
  meta,
  statsLeft,
  statsRight,
  footerRight = 'www.watch360.ai',
}: Props) {
  return (
    <SlideFrame>
      <Header />
      <Footer right={footerRight} rightUrl={footerRight ? `https://${footerRight}` : undefined} />

      {/* Title — x=32, y=24 */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 32,
          fontFamily: 'Inter, sans-serif',
          fontSize: 32,
          fontWeight: 400,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {titleParts.map((p, i) => (
          <span key={i} style={{ color: p.teal ? '#00C3D9' : '#FFFFFF' }}>
            {p.text}
          </span>
        ))}
      </div>

      {/* Meta row — x=305, y=104, w=383, h=28 */}
      <div
        style={{
          position: 'absolute',
          top: 104,
          left: 305,
          width: 383,
          height: 28,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Period — x=0 */}
        {meta[0] && (
          <div style={{ position: 'absolute', left: 0, top: 0 }}>
            <MetaItem label={meta[0].label} value={meta[0].value} />
          </div>
        )}
        {/* Industry — x=203, aligned with right-area second col left edge */}
        {meta[1] && (
          <div style={{ position: 'absolute', left: 203, top: 0 }}>
            <MetaItem label={meta[1].label} value={meta[1].value} />
          </div>
        )}
        {/* Media Type — x=321 */}
        {meta[2] && (
          <div style={{ position: 'absolute', left: 321, top: 0 }}>
            <MetaItem label={meta[2].label} value={meta[2].value} />
          </div>
        )}
      </div>

      {/* Stats grid — x=32, y=174, w=656, h=200 */}
      <div
        style={{
          position: 'absolute',
          top: 174,
          left: 32,
          width: 656,
          height: 200,
        }}
      >
        {/* Left column — w=219, h=200, two large cards */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 219,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {statsLeft.map((s, i) => (
            <LargeStatCard key={i} label={s.label} value={s.value} />
          ))}
        </div>

        {/* Right area — x=273, w=383, h=200, 2×2 grid */}
        <div
          style={{
            position: 'absolute',
            left: 273,
            top: 0,
            width: 383,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Row 1 — h=100 */}
          <div style={{ display: 'flex', width: '100%', height: 100 }}>
            <div style={{ width: 179.5 }}>
              <SmallStatCard
                label={statsRight[0]?.label ?? ''}
                value={statsRight[0]?.value ?? ''}
              />
            </div>
            <div style={{ width: 179.5, marginLeft: 24 }}>
              <SmallStatCard
                label={statsRight[1]?.label ?? ''}
                value={statsRight[1]?.value ?? ''}
              />
            </div>
          </div>
          {/* Row 2 — h=100 */}
          <div style={{ display: 'flex', width: '100%', height: 100 }}>
            <div style={{ width: 179.5 }}>
              <SmallStatCard
                label={statsRight[2]?.label ?? ''}
                value={statsRight[2]?.value ?? ''}
              />
            </div>
            <div style={{ width: 179.5, marginLeft: 24 }}>
              <SmallStatCard
                label={statsRight[3]?.label ?? ''}
                value={statsRight[3]?.value ?? ''}
              />
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  )
}

/* ── MetaItem ─────────────────────────────────────────────── */

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
      }}
    >
      <span
        style={{
          fontSize: 7,
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.14px',
          lineHeight: 1.5,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 10,
          color: '#FFFFFF',
          lineHeight: 1.5,
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </span>
    </div>
  )
}

/* ── StatCard — unified baseline alignment ────────────────── */
/*
 * Both large (80px teal) and small (48px white) use absolute
 * positioning so that the VALUE bottom-edge sits at the same Y
 * within each 100px cell → shared baseline.
 *
 *   Label:  top=4, fontSize=10, lineHeight=1.5
 *   Value:  bottom=2, fontSize=80|48, lineHeight=1
 */

function LargeStatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 100,
        borderTop: '0.5px solid rgba(255,255,255,0.5)',
        boxSizing: 'border-box',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 4,
          left: 0,
          fontSize: 10,
          color: '#FFFFFF',
          lineHeight: 1.5,
        }}
      >
        {label}
      </span>
      <span
        style={{
          position: 'absolute',
          bottom: -3,
          left: 0,
          fontSize: 80,
          color: '#00C3D9',
          lineHeight: 1,
        }}
      >
        {value}
      </span>
    </div>
  )
}

function SmallStatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 100,
        borderTop: '0.5px solid rgba(255,255,255,0.5)',
        boxSizing: 'border-box',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 4,
          left: 0,
          fontSize: 10,
          color: '#FFFFFF',
          lineHeight: 1.5,
        }}
      >
        {label}
      </span>
      <span
        style={{
          position: 'absolute',
          bottom: 2,
          left: 0,
          fontSize: 48,
          color: '#FFFFFF',
          lineHeight: 1,
        }}
      >
        {value}
      </span>
    </div>
  )
}

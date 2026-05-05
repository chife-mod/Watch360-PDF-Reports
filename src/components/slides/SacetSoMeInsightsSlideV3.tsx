import sfLogo from '../../../assets/logos/SF Logo.svg'
import { SlideFrame } from '../ui/SlideFrame'
import { colors } from '../../theme/colors'
import type { SoMePost } from './SacetSoMeInsightsSlide'

export interface SacetSoMeInsightsSlideV3Props {
  title?: string
  brand?: string
  period?: string
  totalLabel?: string
  posts: SoMePost[]
  /** Подзаголовок к total card. Default: "Instagram & Facebook" */
  totalSourcesLabel?: string
  website?: string
}

const fmt = (n: number) => n.toLocaleString('en-US')

/* ── Placeholder gradient palette (luxury jewelry tones) ─── */
const PLACEHOLDERS: Array<{ from: string; to: string }> = [
  { from: '#D4AF7A', to: '#7A5C36' }, // gold
  { from: '#C8A2A2', to: '#6B4242' }, // rose
  { from: '#B5B5B5', to: '#4A4A4A' }, // silver
  { from: '#E8C8A8', to: '#7A5238' }, // champagne
]

/* ── Single post card ────────────────────────────────────── */

function PostCard({
  post,
  rankIdx,
  max,
  isTop,
}: {
  post: SoMePost
  rankIdx: number
  max: number
  isTop: boolean
}) {
  const fraction = max > 0 ? post.engagement / max : 0
  // Larger circle — outer 96, ring r=46, stroke=3, image r=42
  const SIZE = 96
  const r = 46
  const innerR = 42
  const circumference = 2 * Math.PI * r
  const dash = `${fraction * circumference} ${circumference}`
  const ring = isTop ? colors.accent.teal : 'rgba(255,255,255,0.7)'
  const trackRing = 'rgba(255,255,255,0.10)'
  const palette = PLACEHOLDERS[rankIdx % PLACEHOLDERS.length]
  const gradId = `grad-${rankIdx}-${post.rank}`
  const clipId = `clip-${rankIdx}-${post.rank}`

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        padding: 8,
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: '88px 1fr',
        gridColumnGap: 12,
        alignItems: 'stretch',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Left column: big circle + rank below (aligned with right-col labels baseline) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{ display: 'block' }}
        >
          <defs>
            <radialGradient id={gradId} cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor={palette.from} stopOpacity="0.95" />
              <stop offset="100%" stopColor={palette.to} stopOpacity="0.95" />
            </radialGradient>
            <clipPath id={clipId}>
              <circle cx={SIZE / 2} cy={SIZE / 2} r={innerR} />
            </clipPath>
          </defs>

          {/* Image / gradient placeholder inside the circle */}
          {post.image ? (
            <image
              href={post.image}
              x={0}
              y={0}
              width={SIZE}
              height={SIZE}
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#${clipId})`}
            />
          ) : (
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={innerR}
              fill={`url(#${gradId})`}
            />
          )}

          {/* Track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={r}
            fill="none"
            stroke={trackRing}
            strokeWidth={3}
          />
          {/* Progress */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={r}
            fill="none"
            stroke={ring}
            strokeWidth={3}
            strokeDasharray={dash}
            strokeLinecap="round"
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        </svg>

        {/* Rank — under the circle, aligned on baseline with right-col Engagement/Rate labels */}
        <span
          style={{
            marginTop: 'auto',
            fontSize: 6,
            fontWeight: 400,
            color: 'white',
            opacity: isTop ? 0.7 : 0.45,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          № {String(rankIdx + 1).padStart(2, '0')}
        </span>

        {/* Spacer to match the right-column engagement-number row height (~22px) */}
        <span style={{ height: 22 }} />
      </div>

      {/* Right column: date / title / engagement+rate */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        {/* Date · Source */}
        <span
          style={{
            fontSize: 7,
            fontWeight: 400,
            color: 'white',
            opacity: 0.5,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {post.date} · {post.source}
        </span>

        {/* Title */}
        {post.url ? (
          <a
            href={post.url}
            target="_blank"
            rel="noreferrer"
            style={{
              margin: '6px 0 0 0',
              fontSize: 9,
              fontWeight: 400,
              lineHeight: 1.4,
              color: 'white',
              opacity: isTop ? 0.95 : 0.75,
              textDecoration: 'none',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            «{post.title}»
          </a>
        ) : (
          <p
            style={{
              margin: '6px 0 0 0',
              fontSize: 9,
              fontWeight: 400,
              lineHeight: 1.4,
              color: 'white',
              opacity: isTop ? 0.95 : 0.75,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            «{post.title}»
          </p>
        )}

        {/* Labels above numbers — aligned on baseline with "№ 01" under circle */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 6,
            color: 'white',
            opacity: 0.45,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          <span>Engagement</span>
          <span>Rate</span>
        </div>

        {/* Engagement + rate */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: isTop ? colors.accent.teal : 'white',
              opacity: isTop ? 1 : 0.9,
            }}
          >
            {fmt(post.engagement)}
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: 'white',
              opacity: 0.7,
            }}
          >
            {post.engagementRate}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Total card (narrow) ─────────────────────────────────── */

function TotalCard({
  count,
  sourcesLabel,
}: {
  count: number
  sourcesLabel: string
}) {
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        padding: '12px 8px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        background: 'rgba(0,195,217,0.08)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <span
        style={{
          fontSize: 7,
          fontWeight: 400,
          color: 'white',
          opacity: 0.6,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        Total
      </span>
      <span
        style={{
          fontSize: 56,
          fontWeight: 300,
          color: colors.accent.teal,
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
        }}
      >
        {count}
      </span>
      <span
        style={{
          fontSize: 7,
          fontWeight: 400,
          color: 'white',
          opacity: 0.55,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          lineHeight: 1.4,
          marginTop: 'auto',
        }}
      >
        {sourcesLabel}
      </span>
    </div>
  )
}

/* ── Slide ───────────────────────────────────────────────── */

export function SacetSoMeInsightsSlideV3({
  title = 'Social Media Insights',
  brand = 'Sacet',
  period = 'Apr 20–26, 2026',
  totalLabel,
  posts,
  totalSourcesLabel = 'Instagram & Facebook',
  website = 'www.semanticforce.ai',
}: SacetSoMeInsightsSlideV3Props) {
  const sorted = [...posts].sort((a, b) => b.engagement - a.engagement)
  const max = Math.max(...sorted.map((p) => p.engagement))
  const subtitle =
    totalLabel ?? `${brand} · ${posts.length} posts on Instagram & Facebook · ${period}`

  // Slot layout (3 columns × 2 rows = 6 slots), total in slot 2 (top-right narrow):
  //   slot 0: post #1   slot 1: post #2   slot 2: TOTAL
  //   slot 3: post #3   slot 4: post #4   slot 5: empty
  const slotMap = [
    { kind: 'post', postIndex: 0 } as const,
    { kind: 'post', postIndex: 1 } as const,
    { kind: 'total' } as const,
    { kind: 'post', postIndex: 2 } as const,
    { kind: 'post', postIndex: 3 } as const,
    { kind: 'empty' } as const,
  ]

  return (
    <SlideFrame>
      {/* SF logo */}
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

      {/* Title */}
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

      {/* Grid — 3rd column narrower for the Total card */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 32,
          right: 32,
          bottom: 56,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 0.55fr',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 10,
        }}
      >
        {slotMap.map((slot, i) => {
          if (slot.kind === 'total') {
            return (
              <TotalCard
                key={i}
                count={posts.length}
                sourcesLabel={totalSourcesLabel}
              />
            )
          }
          if (slot.kind === 'empty') {
            return <div key={i} />
          }
          const post = sorted[slot.postIndex]
          if (!post) return <div key={i} />
          const isTop = slot.postIndex === 0
          return (
            <PostCard
              key={i}
              post={post}
              rankIdx={slot.postIndex}
              max={max}
              isTop={isTop}
            />
          )
        })}
      </div>

      {/* Footer */}
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

import React from 'react'
import {
  IconBrandYoutube,
  IconBrandTiktok,
  IconWorld,
} from '@tabler/icons-react'
import sfLogo from '../../../assets/logos/SF Logo.svg'
import instagramLogo from '../../../assets/logos/Instagram.svg'
import facebookLogo from '../../../assets/logos/facebook-logo 1.svg'
import { SlideFrame } from '../ui/SlideFrame'
import { colors } from '../../theme/colors'
import type { SoMePost } from './SacetSoMeInsightsSlide'

/**
 * Source icon resolver:
 *   - Instagram / Facebook → brand SVG assets (assets/logos/)
 *   - YouTube / TikTok / other → Tabler icons (until brand SVGs are added)
 */
function SourceIcon({
  source,
  size = 14,
}: {
  source: string
  size?: number
}) {
  const s = source.trim().toLowerCase()

  // Brand SVG assets first
  if (s.includes('instagram')) {
    return (
      <img
        src={instagramLogo}
        alt={source}
        style={{
          width: size,
          height: size,
          flexShrink: 0,
          verticalAlign: 'middle',
          display: 'block',
          opacity: 1,
        }}
      />
    )
  }
  if (s.includes('facebook')) {
    return (
      <img
        src={facebookLogo}
        alt={source}
        style={{
          width: size,
          height: size,
          flexShrink: 0,
          verticalAlign: 'middle',
          display: 'block',
          opacity: 1,
        }}
      />
    )
  }

  // Tabler fallback for sources without brand SVG yet
  const { Icon, color } = s.includes('youtube')
    ? { Icon: IconBrandYoutube, color: '#FF0000' }
    : s.includes('tiktok')
    ? { Icon: IconBrandTiktok, color: '#FFFFFF' }
    : { Icon: IconWorld, color: 'rgba(255,255,255,0.7)' }

  return (
    <Icon
      size={size}
      stroke={1.75}
      style={{
        color,
        flexShrink: 0,
        verticalAlign: 'middle',
      }}
      aria-label={source}
    />
  )
}

export interface SacetSoMeInsightsSlideV2Props {
  title?: string
  brand?: string
  period?: string
  totalLabel?: string
  posts: SoMePost[]
  /** Показывать миниатюры (закруглённые квадраты слева от заголовка). Default: true */
  showThumbnails?: boolean
  website?: string
}

const fmt = (n: number) => n.toLocaleString('en-US')

/**
 * V2 — Bar-chart variant.
 *
 * Same header/title/subtitle as V1 (consistency).
 * Rows are equal-height. Background fill of each row is proportional to engagement.
 * Rank numbers are TOP-aligned with title (not center).
 * Top post engagement value uses teal accent (same as V1).
 */
/* Placeholder palette for thumbnail squares — luxury jewelry tones */
const THUMB_PALETTE: Array<{ from: string; to: string }> = [
  { from: '#D4AF7A', to: '#7A5C36' }, // gold
  { from: '#C8A2A2', to: '#6B4242' }, // rose
  { from: '#B5B5B5', to: '#4A4A4A' }, // silver
  { from: '#E8C8A8', to: '#7A5238' }, // champagne
]

/* Unified label style — used both under the post title (DATE · SOURCE) and under engagement (rate) */
const LABEL_STYLE: React.CSSProperties = {
  fontSize: 7,
  fontWeight: 400,
  color: 'white',
  opacity: 0.45,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  lineHeight: 1.2,
  margin: 0,
}

export function SacetSoMeInsightsSlideV2({
  title = 'Sacet Social Media Insights',
  brand: _brand = 'Sacet',
  period: _period = 'Apr 20–26, 2026',
  totalLabel,
  posts,
  showThumbnails = true,
  website = 'www.semanticforce.ai',
}: SacetSoMeInsightsSlideV2Props) {
  const sorted = [...posts].sort((a, b) => b.engagement - a.engagement)
  const max = Math.max(...sorted.map((p) => p.engagement))
  const subtitle =
    totalLabel ?? `${posts.length} total posts on Instagram & Facebook`

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

      {/* Title — стандарт */}
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

      {/* Rows — equal-height bar chart */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 32,
          right: 32,
          bottom: 56,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {sorted.map((post, idx) => {
          const isTop = idx === 0
          const widthPct = (post.engagement / max) * 100
          const palette = THUMB_PALETTE[idx % THUMB_PALETTE.length]
          return (
            <div
              key={post.rank}
              style={{
                position: 'relative',
                flex: 1, // equal height
                display: 'grid',
                gridTemplateColumns: showThumbnails
                  ? '28px 44px 1fr 110px'
                  : '28px 1fr 110px',
                gridColumnGap: 14,
                alignItems: 'stretch',
                padding: '14px 12px 14px 16px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderBottom:
                  idx === sorted.length - 1
                    ? '1px solid rgba(255,255,255,0.08)'
                    : 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {/* Bar overlay — proportional to engagement */}
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${widthPct}%`,
                  background: isTop
                    ? 'rgba(0,195,217,0.10)'
                    : 'rgba(255,255,255,0.04)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />

              {/* Rank — same fontSize + lineHeight as post title → baselines match */}
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: 11,
                  fontWeight: 400,
                  color: 'white',
                  opacity: isTop ? 0.85 : 0.55,
                  letterSpacing: '0.04em',
                  lineHeight: 1.4,
                  alignSelf: 'start',
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              {/* Thumbnail — rounded square placeholder (gradient until real images) */}
              {showThumbnails && (
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)`,
                    flexShrink: 0,
                    overflow: 'hidden',
                    alignSelf: 'start',
                  }}
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  )}
                </div>
              )}

              {/* Title + meta — column stretches to row height; label-row pinned to bottom */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: 0,
                }}
              >
                {post.url ? (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      margin: 0,
                      fontSize: 11,
                      fontWeight: 400,
                      lineHeight: 1.4,
                      color: 'white',
                      opacity: isTop ? 1 : 0.85,
                      textDecoration: 'none',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.title}
                  </a>
                ) : (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      fontWeight: 400,
                      lineHeight: 1.4,
                      color: 'white',
                      opacity: isTop ? 1 : 0.85,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.title}
                  </p>
                )}
                <div
                  style={{
                    marginTop: 'auto',
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <SourceIcon source={post.source} size={14} />
                  <span style={LABEL_STYLE}>{post.date}</span>
                </div>
              </div>

              {/* Engagement + label — bottom-aligned with the date row → labels share baseline */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
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
                <div
                  style={{
                    marginTop: 'auto',
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span style={LABEL_STYLE}>
                    {post.engagementRate} engagement
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer — only domain */}
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

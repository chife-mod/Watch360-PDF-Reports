import sfLogo from '../../../assets/logos/SF Logo.svg'
import { SlideFrame } from '../ui/SlideFrame'
import { colors } from '../../theme/colors'

export interface SoMePost {
  rank: number
  title: string
  source: string
  /** URL к самому посту (берётся из hyperlink в "Source & URL" колонке шита) */
  url?: string
  /** URL превью-картинки поста (для V3 — кружочек миниатюры). Опционально. */
  image?: string
  date: string
  engagement: number
  engagementRate: string
}

export interface SacetSoMeInsightsSlideProps {
  /** Заголовок секции. Default: "Social Media Insights" */
  title?: string
  /** Имя бренда. Default: "Sacet" */
  brand?: string
  /** Период. Default: "Apr 20–26, 2026" */
  period?: string
  /** Строка с total — "4 posts on Instagram & Facebook" */
  totalLabel?: string
  /** Список постов — отсортируется по engagement DESC */
  posts: SoMePost[]
  /** Domain в правом нижнем. Default: "www.semanticforce.ai" */
  website?: string
}

const fmt = (n: number) => n.toLocaleString('en-US')

/**
 * SacetSoMeInsightsSlide — premium luxury Swiss minimalism для ювелирного сегмента.
 *
 * Layout (720×450):
 *   - Header logos: Sacet (top-left) + SF combo (top-right) — те же SVG что на cover
 *   - Title: "Social Media Insights" (32px Inter, hairline subtitle)
 *   - 4 posts: ранжированы по engagement DESC, hairline-divider между
 *     - левая колонка: rank "01"–"04" + дата · источник
 *     - центр: цитата поста (max 2 строки)
 *     - правая колонка: engagement (28px) / rate (10px 50%)
 *   - Footer: brand · period (left) + domain (right)
 */
export function SacetSoMeInsightsSlide({
  title = 'Social Media Insights',
  brand = 'Sacet',
  period = 'Apr 20–26, 2026',
  totalLabel,
  posts,
  website = 'www.semanticforce.ai',
}: SacetSoMeInsightsSlideProps) {
  const sorted = [...posts].sort((a, b) => b.engagement - a.engagement)
  const subtitle =
    totalLabel ?? `${brand} · ${posts.length} posts on Instagram & Facebook · ${period}`

  return (
    <SlideFrame>
      {/* SF logo — same slot as legacy Header (top:25, right:32, h:24) */}
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

      {/* Title — стандарт SlideTitle: top:24, left:32, 32px Inter 400, lh:1, white */}
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

      {/* Subtitle — 10px Inter 400, 50% opacity, lh:1.5 (как Meta label/value в OverviewSlide) */}
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

      {/* Posts list — content starts well below subtitle */}
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
          return (
            <div
              key={post.rank}
              style={{
                display: 'grid',
                gridTemplateColumns: '36px 1fr 88px',
                gridColumnGap: 16,
                alignItems: 'center',
                padding: '14px 0',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderBottom:
                  idx === sorted.length - 1
                    ? '1px solid rgba(255,255,255,0.08)'
                    : 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {/* Rank + meta */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  color: 'white',
                  opacity: isTop ? 0.85 : 0.55,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Post title + source/date — title is a clickable link if url provided */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
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
                    «{post.title}»
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
                    «{post.title}»
                  </p>
                )}
                <p
                  style={{
                    margin: 0,
                    fontSize: 8,
                    fontWeight: 400,
                    color: 'white',
                    opacity: 0.45,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {post.date} · {post.source}
                </p>
              </div>

              {/* Engagement + rate — teal accent на topовом */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 2,
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
                    fontSize: 8,
                    fontWeight: 400,
                    color: 'white',
                    opacity: 0.5,
                    letterSpacing: '0.04em',
                  }}
                >
                  {post.engagementRate} engagement
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer — только domain справа (period уже в subtitle сверху) */}
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

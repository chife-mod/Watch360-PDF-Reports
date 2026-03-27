/**
 * ModelCardColumn — column of 5 watch model cards.
 *
 * Layout per card:
 *   [rank] [54×54 image] [brand tag]   [articles]
 *                        [model name]  [████ bar]
 *
 * Used in: KeywordModelsSlide (Rose Gold, Titanium, etc.)
 */
import { typography } from '../../theme/typography'
import { colors } from '../../theme/colors'
import { BrandTag } from './BrandTag'
import { VerticalArticleBar } from './ArticleBar'
import type { KeywordModelRow } from '../../data/keywords/types'

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

interface Props {
  /** Section title — "Top 10 Models" for left column, empty for right */
  title?: string
  data: KeywordModelRow[]
  maxArticles: number
  /** Image size (width = height) */
  imageSize?: number
  /** Row height */
  rowHeight?: number
}

export function ModelCardColumn({
  title,
  data,
  maxArticles,
  imageSize = 50,
  rowHeight = 58,
}: Props) {
  const showTitle = !!title

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Column subtitle */}
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

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          borderBottom: `1px solid ${colors.border}`,
          paddingBottom: 6,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ ...HDR, width: 19 + 8 + imageSize + 8 }}>Rank</div>
        <div style={{ ...HDR, flex: 1 }}>Model</div>
        <div style={{ ...HDR }}>Articles qty</div>
      </div>

      {/* Cards */}
      {data.map((row, i) => {
        const isTop = row.rank === 1
        return (
          <div
            key={row.rank}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: rowHeight,
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

            {/* Image */}
            <div style={{ paddingRight: 8, flexShrink: 0 }}>
              <div
                style={{
                  width: imageSize,
                  height: imageSize,
                  borderRadius: 16,
                  border: '0.5px solid rgba(255,255,255,0.24)',
                  backgroundColor: colors.thumbnailBg,
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                }}
              >
                {row.image && (
                  <img
                    src={row.image}
                    alt={row.model}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
              </div>
            </div>

            {/* Brand + Model */}
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

            {/* Articles + bar */}
            <VerticalArticleBar value={row.articles} maxValue={maxArticles} isTop={isTop} />
          </div>
        )
      })}
    </div>
  )
}

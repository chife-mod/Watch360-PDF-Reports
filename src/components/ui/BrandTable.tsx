/**
 * BrandTable — ranked brand table with bar charts.
 *
 * Layout:  RANK  BRAND              ARTICLES QTY
 *          1     Daniel Roth   ████████████████ 27
 *          2     Armin Strom   ████████████     15
 *
 * Used in: TopBrandsSlide, KeywordBrandsSlide (Rose Gold, Titanium, etc.)
 */
import { typography } from '../../theme/typography'
import { colors } from '../../theme/colors'
import { ArticleBar } from './ArticleBar'

export interface BrandRow {
  rank: number
  brand: string
  articles: number
}

interface Props {
  /** Column subtitle ("All Mentions", "Brand Mentions in Title") */
  title: string
  data: BrandRow[]
  /** Column widths */
  rankWidth?: number
  brandWidth?: number
}

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
  flexShrink: 0,
}

export function BrandTable({ title, data, rankWidth = 31, brandWidth = 125 }: Props) {
  const maxArticles = Math.max(...data.map(d => d.articles), 1)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Column subtitle */}
      <div
        style={{
          fontFamily: typography.fontFamily,
          fontSize: 16,
          fontWeight: 400,
          color: '#FFFFFF',
          lineHeight: 1.5,
        }}
      >
        {title}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
          <div style={{ ...hdrStyle, width: rankWidth }}>Rank</div>
          <div style={{ ...hdrStyle, width: brandWidth }}>Brand</div>
          <div style={{ ...hdrStyle, flex: 1, textAlign: 'right' }}>Articles qty</div>
        </div>

        {/* Rows */}
        {data.map((row, i) => {
          const isTop = row.rank === 1
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 29,
                borderTop: i === 0 ? 'none' : '0.5px solid rgba(255,255,255,0.15)',
              }}
            >
              <div
                style={{
                  width: rankWidth,
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
              <div
                style={{
                  width: brandWidth,
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
              <ArticleBar value={row.articles} maxValue={maxArticles} isTop={isTop} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

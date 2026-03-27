/**
 * ArticleBar — small horizontal bar chart with number.
 *
 * Visual: [████████████] 27
 * Teal for isTop (#1), white 75% for rest. Track: white 8%.
 */
import { typography } from '../../theme/typography'
import { colors } from '../../theme/colors'

interface Props {
  value: number
  maxValue: number
  isTop?: boolean
  /** Width of the bar+number container */
  width?: number
}

export function ArticleBar({ value, maxValue, isTop = false, width }: Props) {
  const pct = Math.max((value / Math.max(maxValue, 1)) * 100, 4)
  const color = isTop ? colors.accent.teal : '#FFFFFF'
  const barColor = isTop ? colors.accent.teal : 'rgba(255,255,255,0.75)'

  return (
    <div
      style={{
        flex: width ? undefined : 1,
        width,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        minWidth: 0,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 3,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 500,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: barColor,
            borderRadius: 500,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: typography.fontFamily,
          fontSize: 10,
          fontWeight: 400,
          color,
          lineHeight: 1,
          minWidth: 22,
          textAlign: 'right',
          flexShrink: 0,
        }}
      >
        {value}
      </span>
    </div>
  )
}

/**
 * VerticalArticleBar — stacked number + bar for card layouts.
 *
 * Visual:  7
 *         [████]
 */
export function VerticalArticleBar({ value, maxValue, isTop = false, width = 48 }: Props) {
  const pct = Math.max((value / Math.max(maxValue, 1)) * 100, 4)
  const color = isTop ? colors.accent.teal : '#FFFFFF'
  const barColor = isTop ? colors.accent.teal : 'rgba(255,255,255,0.75)'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 4,
        flexShrink: 0,
        width,
      }}
    >
      <span
        style={{
          fontFamily: typography.fontFamily,
          fontSize: 10,
          fontWeight: 400,
          color,
          lineHeight: 1,
        }}
      >
        {value}
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
            width: `${pct}%`,
            background: barColor,
            borderRadius: 500,
          }}
        />
      </div>
    </div>
  )
}

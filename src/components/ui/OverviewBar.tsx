/**
 * OverviewBar — inline metrics row below slide title.
 * Renders: SOURCES: 47   ARTICLES: 103   COMMENTS: 95
 *
 * Style: 7px uppercase, 50% opacity labels, 100% white values.
 */
import { typography } from '../../theme/typography'
import { spacing } from '../../theme/spacing'

export interface OverviewMetric {
  label: string
  value: string
}

interface Props {
  metrics: OverviewMetric[]
  top?: number
}

export function OverviewBar({ metrics, top = 68 }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: spacing.slideX,
        display: 'flex',
        gap: 24,
        alignItems: 'center',
      }}
    >
      {metrics.map(({ label, value }) => (
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
  )
}

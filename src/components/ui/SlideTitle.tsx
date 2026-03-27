/**
 * SlideTitle — 32px slide heading.
 * Used on every data slide. Single source of truth for title styling.
 */
import { typography } from '../../theme/typography'
import { spacing } from '../../theme/spacing'

interface Props {
  children: React.ReactNode
}

export function SlideTitle({ children }: Props) {
  return (
    <p
      style={{
        position: 'absolute',
        top: spacing.titleTop,
        left: spacing.slideX,
        margin: 0,
        fontFamily: typography.fontFamily,
        fontSize: 32,
        fontWeight: 400,
        color: '#FFFFFF',
        lineHeight: 1,
      }}
    >
      {children}
    </p>
  )
}

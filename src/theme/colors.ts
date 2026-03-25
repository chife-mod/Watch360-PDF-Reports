/**
 * Global color tokens.
 *
 * For category-specific colors (Watch Media, Blog, Marketplace etc.)
 * see `./categories.ts` — they have their own module.
 */
export const colors = {
  /** Slide background */
  bg: '#0D0D0D',
  /** App / viewer background */
  appBg: '#000000',
  surface: '#1a1a1a',
  /** Table header border — light (2x brighter than rows) */
  border: 'rgba(255, 255, 255, 0.3)',
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.5)',
  },
  /** Watch thumbnail card background */
  thumbnailBg: '#1D2437',
  accent: {
    /** Title highlight (Figma: #00C3D9) */
    teal: '#00C3D9',
  },
} as const

/** Re-export category colors for convenience */
export { categoryColors, getCategoryColor } from './categories'

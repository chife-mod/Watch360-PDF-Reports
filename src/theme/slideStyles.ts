/**
 * Shared slide style objects — eliminates 300+ duplicate inline style declarations.
 *
 * Usage: import { S } from '../../theme/slideStyles'
 *        <div style={S.title}>...</div>
 *        <div style={{ ...S.hdr, width: 120 }}>...</div>
 */
import { typography } from './typography'
import { colors } from './colors'
import { spacing } from './spacing'

export const S = {
  /* ── Title (32px slide heading) ──────────────────────────── */
  title: {
    position: 'absolute',
    top: spacing.titleTop,
    left: spacing.slideX,
    margin: 0,
    fontFamily: typography.fontFamily,
    fontSize: 32,
    fontWeight: 400,
    color: '#FFFFFF',
    lineHeight: 1,
  } as React.CSSProperties,

  /* ── Overview metrics bar ───────────────────────────────── */
  overviewBar: {
    position: 'absolute',
    top: 68,
    left: spacing.slideX,
    display: 'flex',
    gap: 24,
    alignItems: 'center',
  } as React.CSSProperties,

  overviewLabel: {
    fontFamily: typography.fontFamily,
    fontSize: 7,
    fontWeight: 400,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    lineHeight: 1,
  } as React.CSSProperties,

  /* ── Table header cell ──────────────────────────────────── */
  hdr: {
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
  } as React.CSSProperties,

  /* ── Table header row container ─────────────────────────── */
  hdrRow: {
    display: 'flex',
    alignItems: 'flex-end',
    borderBottom: `1px solid ${colors.border}`,
    paddingBottom: 6,
    boxSizing: 'border-box',
  } as React.CSSProperties,

  /* ── Data cell (10px body text) ─────────────────────────── */
  cell: {
    fontFamily: typography.fontFamily,
    fontSize: 10,
    fontWeight: 400,
    color: '#FFFFFF',
    lineHeight: 1.5,
    flexShrink: 0,
  } as React.CSSProperties,

  /* ── Column subtitle (16px section heading) ─────────────── */
  columnTitle: {
    fontFamily: typography.fontFamily,
    fontSize: 16,
    fontWeight: 400,
    color: '#FFFFFF',
    lineHeight: 1.5,
  } as React.CSSProperties,

  /* ── Bar chart track ────────────────────────────────────── */
  barTrack: {
    height: 3,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 500,
    overflow: 'hidden',
  } as React.CSSProperties,

  /* ── Row separator ──────────────────────────────────────── */
  rowBorder: '0.5px solid rgba(255,255,255,0.15)',

  /* ── Image placeholder (watch thumbnail) ────────────────── */
  thumbnail: {
    borderRadius: 16,
    border: '0.5px solid rgba(255,255,255,0.24)',
    backgroundColor: colors.thumbnailBg,
    overflow: 'hidden',
    boxSizing: 'border-box',
  } as React.CSSProperties,

  /* ── Two-column container ───────────────────────────────── */
  twoCol: (top = 83, gap = 40) => ({
    position: 'absolute',
    top,
    left: spacing.slideX,
    display: 'flex',
    gap,
    width: 656,
    alignItems: 'flex-start',
  }) as React.CSSProperties,
} as const

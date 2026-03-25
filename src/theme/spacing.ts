/**
 * Slide spacing tokens — 720×450px fixed canvas.
 *
 * Derived from Figma measurements;  used by every slide component
 * to guarantee consistent padding, header/footer heights, and table layout.
 *
 * ALL values are in pixels (slides are fixed-size, not responsive).
 */
export const spacing = {
  /** Horizontal padding from slide edge to content */
  slideX: 32,

  /** ── Header ────────────────────────────────────────────── */
  /** Top edge of the Watch360 logo SVG */
  headerTop: 16,
  /** Vertical space the header occupies before content starts */
  headerHeight: 52,

  /** ── Title (slide H1) ──────────────────────────────────── */
  /** Top of the slide title (H1) */
  titleTop: 24,
  /** Gap between slide title baseline and first content element */
  titleToContent: 52, // titleTop(24) + titleHeight(~28) + gap(~0)

  /** ── Table layout ──────────────────────────────────────── */
  /** Top of table column headers (below title) */
  tableHeaderTop: 80, // 24px gap from title baseline (title top:24 + fontSize:32 + gap:24)
  /** Top of first table row (≈ tableHeaderTop + headerRowHeight + separator) */
  tableRowsTop: 90,
  /** Fixed row height for standard table rows */
  tableRowHeight: 32,

  /** ── Footer ────────────────────────────────────────────── */
  /** Distance of footer text baseline from slide bottom */
  footerBottom: 16,

  /** ── Slide insets for special layout columns ───────────── */
  /** Right-column content start X (used in two-column layouts) */
  rightColX: 488,
  /** Right-column content width */
  rightColWidth: 200,
} as const

import React from 'react'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'
import { SlideFrame } from '../ui/SlideFrame'
import { colors, typography, spacing } from '../../theme'
import { IconBulb } from '@tabler/icons-react'

/* ── Types ────────────────────────────────────────────────────────── */

export interface SourceRow {
  rank: number
  domain: string
  flag: string
  country: string
  articles: number
}

export interface TopSourcesSlideProps {
  title?: string
  subtitle?: string
  period?: string
  insightTitle?: string
  insightText?: string
  insightPoints?: string[]
  sources?: SourceRow[]
  footerRight?: string
  footerRightUrl?: string
}

/* ── Default data (Feb 2026, Dec 01 2025 – Feb 28 2026) ──────────── */

export const FEB_2026_SOURCES: SourceRow[] = [
  { rank: 1,  domain: 'xbiao.com',               flag: '🇨🇳', country: 'China',          articles: 778 },
  { rank: 2,  domain: 'tatlerasia.com',           flag: '🇨🇳', country: 'China',          articles: 589 },
  { rank: 3,  domain: 'hype.my',                 flag: '🇲🇾', country: 'Malaysia',        articles: 538 },
  { rank: 4,  domain: 'webchronos.net',           flag: '🇯🇵', country: 'Japan',           articles: 459 },
  { rank: 5,  domain: 'waqt.com',                flag: '🇦🇪', country: 'UAE',             articles: 416 },
  { rank: 6,  domain: 'watchpro.com',            flag: '🇬🇧', country: 'United Kingdom',  articles: 307 },
  { rank: 7,  domain: 'iwatchhome.net',          flag: '🇨🇳', country: 'China',           articles: 300 },
  { rank: 8,  domain: 'monochrome-watches.com',  flag: '🇳🇱', country: 'Netherlands',     articles: 296 },
  { rank: 9,  domain: 'montres-de-luxe.com',     flag: '🇫🇷', country: 'France',          articles: 275 },
  { rank: 10, domain: 'hiconsumption.com',       flag: '🇺🇸', country: 'USA',             articles: 262 },
]

/* ── Component ────────────────────────────────────────────────────── */

/**
 * TopSourcesSlide — "Top 10 Sources by Articles Volume"
 *
 * Pixel-perfect port of Figma node 45:2291.
 *
 * Layout (720×450px):
 *   Left (432px): table — rank | source | country | articles qty + bar
 *   Right (208px): insight block: info text + AI insights (numbered)
 */
export function TopSourcesSlide({
  title = 'Top 10 Sources',
  subtitle = 'by Articles Volume',
  period = 'Dec 01, 2025 – Feb 28, 2026',
  insightPoints = [
    'Watch media dominates across most segments.',
    'Marketplaces and manufacturer sites gain influence in higher price tiers.',
  ],
  sources = FEB_2026_SOURCES,
  footerRight = 'www.watch360.ai',
  footerRightUrl = 'https://www.watch360.ai',
}: TopSourcesSlideProps) {
  const maxArticles = Math.max(...sources.map(s => s.articles))

  return (
    <SlideFrame>
      <Header />

      {/* ── Title ── */}
      <p
        style={{
          position: 'absolute',
          top: spacing.titleTop,
          left: spacing.slideX,
          margin: 0,
          fontFamily: typography.fontFamily,
          fontSize: 32,
          fontWeight: 400,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: colors.accent.teal }}>{title} </span>
        <span style={{ color: colors.text.primary }}>{subtitle}</span>
      </p>

      {/* ── Table column headers ── */}
      <div
        style={{
          position: 'absolute',
          top: spacing.tableHeaderTop,
          left: spacing.slideX,
          width: 455,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 0,
          borderBottom: `0.5px solid ${colors.border}`,
          paddingBottom: 6,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ ...hdrStyle, width: 31 }}>Rank</div>
        <div style={{ ...hdrStyle, width: 165 }}>Source</div>
        <div style={{ ...hdrStyle, width: 120 }}>Country</div>
        <div style={{ ...hdrStyle, flex: 1, textAlign: 'right' }}>Articles Qty</div>
      </div>

      {/* ── Table rows ── */}
      <div
        style={{
          position: 'absolute',
          top: 88,
          left: spacing.slideX,
          width: 455,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {sources.map((s) => {
          const barPct = Math.max(4, (s.articles / maxArticles) * 100)
          const isTop = s.rank === 1
          return (
            <div
              key={s.rank}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: spacing.tableRowHeight,
                gap: 0,
                borderTop: '0.5px solid rgba(255,255,255,0.15)',
              }}
            >
              {/* Rank — plain number, same convention as TableSlide */}
              <div
                style={{
                  width: 31,
                  fontFamily: typography.fontFamily,
                  fontSize: 10,
                  fontWeight: isTop ? 700 : 400,
                  color: isTop ? colors.accent.teal : colors.text.primary,
                  opacity: isTop ? 1 : 0.5,
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {s.rank}
              </div>

              {/* Domain */}
              <div
                style={{
                  width: 165,
                  fontFamily: typography.fontFamily,
                  fontSize: 10,
                  fontWeight: 400,
                  color: isTop ? colors.accent.teal : colors.text.primary,
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  paddingRight: 16,
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}
              >
                {s.domain}
              </div>

              {/* Country */}
              <div
                style={{
                  width: 120,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  flexShrink: 0,
                  paddingRight: 16,
                  boxSizing: 'border-box',
                }}
              >
                <span style={{ fontSize: 12, lineHeight: 1, flexShrink: 0 }}>{s.flag}</span>
                <span
                  style={{
                    fontFamily: typography.fontFamily,
                    fontSize: 10,
                    fontWeight: 400,
                    color: colors.text.primary,
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {s.country}
                </span>
              </div>

              {/* Articles Qty + bar */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'flex-end',
                  minWidth: 0,
                }}
              >
                {/* Bar */}
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
                      width: `${barPct}%`,
                      height: '100%',
                      background: isTop ? '#00C3D9' : 'rgba(255,255,255,0.5)',
                      borderRadius: 500,
                    }}
                  />
                </div>
              {/* Articles number */}
                <span
                  style={{
                    fontFamily: typography.fontFamily,
                    fontSize: 10,
                    fontWeight: 400,
                    color: isTop ? colors.accent.teal : colors.text.primary,
                    lineHeight: 1,
                    flexShrink: 0,
                    width: 28,
                    textAlign: 'right',
                  }}
                >
                  {s.articles}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Right column (single container for aligned left edge) ── */}
      <div
        style={{
          position: 'absolute',
          top: 104,
          left: 505,
          width: 183,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Period — marginLeft matches insight number (13px) + gap (6px) = 19px */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginLeft: 19 }}>
          <p
            style={{
              margin: 0,
              fontFamily: typography.fontFamily,
              fontSize: 7,
              fontWeight: 400,
              color: colors.text.secondary,
              textTransform: 'uppercase',
              letterSpacing: '0.14px',
              lineHeight: 1.5,
              whiteSpace: 'nowrap',
            }}
          >
            Period
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: typography.fontFamily,
              fontSize: 10,
              fontWeight: 400,
              color: colors.text.primary,
              lineHeight: 1.5,
              whiteSpace: 'nowrap',
            }}
          >
            {period}
          </p>
        </div>

        {/* Insight section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <IconBulb size={16} stroke={1.5} color={colors.accent.teal} />
            <span
              style={{
                fontFamily: typography.fontFamily,
                fontSize: 7,
                fontWeight: 400,
                color: colors.text.secondary,
                textTransform: 'uppercase',
                letterSpacing: '0.14px',
              }}
            >
              Insight
            </span>
          </div>

          {/* Numbered insight points */}
          {insightPoints.map((pt, i) => (
            <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <span
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 7,
                  fontWeight: 400,
                  color: colors.text.secondary,
                  lineHeight: 'normal',
                  flexShrink: 0,
                  width: 13,
                  paddingTop: 4,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p
                style={{
                  margin: 0,
                  fontFamily: typography.fontFamily,
                  fontSize: 10,
                  fontWeight: 400,
                  color: colors.text.primary,
                  lineHeight: 1.5,
                }}
              >
                {pt}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer right={footerRight} rightUrl={footerRightUrl} />
    </SlideFrame>

  )
}

/* ── Shared header style (reused by other slides too) ─────────────── */

export const hdrStyle: React.CSSProperties = {
  fontFamily: typography.fontFamily,
  fontSize: 7,
  fontWeight: 400,
  color: colors.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.14px',
  lineHeight: 1.5,
  whiteSpace: 'nowrap',
  flexShrink: 0,
}

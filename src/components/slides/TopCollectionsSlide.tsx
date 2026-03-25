import React from 'react'
import { SlideFrame } from '../ui/SlideFrame'
import { typography } from '../../theme/typography'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { Header } from '../ui/Header'
import { BrandTag } from '../ui/BrandTag'
import { Footer } from '../ui/Footer'

export interface CollectionRow {
  rank: number
  brand: string
  collection: string
  articles: number
}

export const FEB_2026_COLLECTIONS: CollectionRow[] = [
  { rank: 1, collection: 'Royal Oak', brand: 'Audemars Piguet', articles: 373 },
  { rank: 2, collection: 'Carrera', brand: 'TAG Heuer', articles: 330 },
  { rank: 3, collection: 'Daytona', brand: 'Rolex', articles: 300 },
  { rank: 4, collection: 'Big Bang', brand: 'Hublot', articles: 288 },
  { rank: 5, collection: 'Defy', brand: 'Zenith', articles: 260 },
  { rank: 6, collection: 'Speedmaster', brand: 'Omega', articles: 250 },
  { rank: 7, collection: 'Submariner', brand: 'Rolex', articles: 216 },
  { rank: 8, collection: 'Seamaster', brand: 'Omega', articles: 184 },
  { rank: 9, collection: 'Tank', brand: 'Cartier', articles: 179 },
  { rank: 10, collection: 'Reverso', brand: 'Jaeger-LeCoultre', articles: 177 },
  { rank: 11, collection: 'Code 11.59', brand: 'Audemars Piguet', articles: 171 },
  { rank: 12, collection: 'Black Bay', brand: 'Tudor', articles: 165 },
  { rank: 13, collection: 'Luminor', brand: 'Panerai', articles: 136 },
  { rank: 14, collection: 'Datejust', brand: 'Rolex', articles: 134 },
  { rank: 15, collection: 'Overseas', brand: 'Vacheron Constantin', articles: 117 },
  { rank: 16, collection: 'GMT-Master II', brand: 'Rolex', articles: 113 },
  { rank: 17, collection: 'Explorer', brand: 'Rolex', articles: 111 },
  { rank: 18, collection: 'Santos de Cartier', brand: 'Cartier', articles: 109 },
  { rank: 19, collection: 'Speedmaster', brand: 'Omega', articles: 105 },
  { rank: 20, collection: 'Oyster Perpetual', brand: 'Rolex', articles: 104 },
]

interface TopCollectionsSlideProps {
  data?: CollectionRow[]
  title?: string
  footerRight?: string
  footerRightUrl?: string
}

export const TopCollectionsSlide: React.FC<TopCollectionsSlideProps> = ({
  data = FEB_2026_COLLECTIONS,
  title = 'Top 20 Collections',
  footerRight = 'www.watch360.ai',
  footerRightUrl = 'https://www.watch360.ai',
}) => {
  // Sort and take top 20, just in case
  const top20 = [...data].sort((a, b) => b.articles - a.articles).slice(0, 20)
  
  // Split into left (1-10) and right (11-20)
  const leftCol = top20.slice(0, 10)
  const rightCol = top20.slice(10, 20)

  // Maximum articles for bar scaling
  const maxArticles = Math.max(...top20.map((d) => d.articles), 1)

  return (
    <SlideFrame>
      <Header />
      <Footer right={footerRight} rightUrl={footerRightUrl} />

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
          color: colors.accent.teal,
          lineHeight: 1,
        }}
      >
        {title}
      </p>

      {/* Two-column layout container matching spacing specs */}
      <div
        style={{
          position: 'absolute',
          top: 104, // aligned visually to table top in TopBrandsSlide
          left: spacing.slideX,
          display: 'flex',
          gap: 40,
          width: 656,
          alignItems: 'flex-start',
        }}
      >
        {/* Left Column (1-10) */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <CollectionTable data={leftCol} maxArticles={maxArticles} startIndex={0} />
        </div>

        {/* Right Column (11-20) */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <CollectionTable data={rightCol} maxArticles={maxArticles} startIndex={10} />
        </div>
      </div>
    </SlideFrame>
  )
}

function CollectionTable({
  data,
  maxArticles,
  startIndex,
}: {
  data: CollectionRow[]
  maxArticles: number
  startIndex: number
}) {
  const hdrStyle = {
    fontFamily: typography.fontFamily,
    fontSize: 7,
    fontWeight: 400,
    color: '#FFFFFF',
    opacity: 0.5,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.14,
    lineHeight: 1,
    whiteSpace: 'nowrap' as const,
  }


  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* ── Table Header ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 0,
          borderBottom: `0.5px solid ${colors.border}`,
          paddingBottom: 6,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ ...hdrStyle, width: 17 }}>#</div>
        <div style={{ ...hdrStyle, width: 114 }}>Brand</div>
        <div style={{ ...hdrStyle, width: 83 }}>Collection</div>
        <div style={{ ...hdrStyle, flex: 1, textAlign: 'right' }}>Articles qty</div>
      </div>

      {/* ── Data Rows ── */}
      {data.map((row, i) => {
        const globalRank = startIndex + i + 1
        const isTop = globalRank === 1
        const barPct = Math.max((row.articles / maxArticles) * 100, 4)

        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 29, // consistent with other tables
              gap: 0,
              borderTop: '0.5px solid rgba(255,255,255,0.15)',
            }}
          >
            {/* Rank */}
            <div
              style={{
                width: 17,
                fontFamily: typography.fontFamily,
                fontSize: 10,
                fontWeight: isTop ? 700 : 400,
                color: isTop ? colors.accent.teal : colors.text.primary,
                opacity: isTop ? 1 : 0.5,
                lineHeight: 1.5,
                flexShrink: 0,
              }}
            >
              {globalRank}
            </div>

            {/* Brand (Badge style) */}
            <div
              style={{
                width: 114,
                paddingRight: 16,
                flexShrink: 0,
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <BrandTag label={row.brand} />
            </div>

            {/* Collection */}
            <div
              style={{
                width: 83,
                fontFamily: typography.fontFamily,
                fontSize: 9,
                fontWeight: 400,
                color: isTop ? colors.accent.teal : '#FFFFFF',
                lineHeight: 1.5,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                paddingRight: 8,
                flexShrink: 0,
                boxSizing: 'border-box',
              }}
            >
              {row.collection}
            </div>

            {/* Articles Qty + Bar */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
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
                    height: '100%',
                    width: `${barPct}%`,
                    background: isTop ? colors.accent.teal : 'rgba(255,255,255,0.75)',
                    borderRadius: 500,
                  }}
                />
              </div>

              {/* Number */}
              <span
                style={{
                  fontFamily: typography.fontFamily,
                  fontSize: 10,
                  fontWeight: 400,
                  color: isTop ? colors.accent.teal : colors.text.primary,
                  lineHeight: 1.5,
                  width: 21,
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {row.articles}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

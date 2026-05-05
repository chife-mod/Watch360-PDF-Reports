import React from 'react'
import { IconStarFilled, IconStar } from '@tabler/icons-react'
import sfLogo from '../../../assets/logos/SF Logo.svg'
import { SlideFrame } from '../ui/SlideFrame'
import { colors } from '../../theme/colors'

export interface BoutiqueReview {
  rank: number
  title: string                  // first sentence of the review
  source: string                 // "googlemaps.com"
  url?: string                   // hyperlink to review
  location: string               // "8 Rue de la Vrillière, 75001 Paris"
  date: string                   // "Apr 22, 2026"
  starRating: number             // 1-5
}

export interface BoutiqueReviewsSlideProps {
  title?: string                 // "Sacet Boutique Reviews"
  totalLabel?: string            // "3 reviews on Google Maps · Av. Rating 5/5"
  reviews: BoutiqueReview[]
  /** Average rating across all reviews */
  averageRating?: number | string
  website?: string
}

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 7,
  fontWeight: 400,
  color: 'white',
  opacity: 0.45,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  lineHeight: 1.2,
  margin: 0,
}

function StarRow({
  rating,
  isTop,
  size = 12,
}: {
  rating: number
  isTop: boolean
  size?: number
}) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.round(rating)
    const Icon = filled ? IconStarFilled : IconStar
    stars.push(
      <Icon
        key={i}
        size={size}
        stroke={1.5}
        style={{
          color: filled
            ? isTop
              ? colors.accent.teal
              : 'white'
            : 'rgba(255,255,255,0.25)',
          opacity: filled ? (isTop ? 1 : 0.9) : 1,
          flexShrink: 0,
        }}
      />,
    )
  }
  return <div style={{ display: 'flex', gap: 2 }}>{stars}</div>
}

export function BoutiqueReviewsSlide({
  title = 'Boutique Reviews',
  totalLabel,
  reviews,
  averageRating,
  website = 'www.semanticforce.ai',
}: BoutiqueReviewsSlideProps) {
  const sorted = [...reviews].sort((a, b) => b.starRating - a.starRating)
  const subtitle =
    totalLabel ??
    `${reviews.length} reviews on Google Maps${
      averageRating !== undefined ? ` · Av. Rating ${averageRating}/5` : ''
    }`

  return (
    <SlideFrame>
      <img
        src={sfLogo}
        alt="SemanticForce"
        style={{
          position: 'absolute',
          top: 25,
          right: 32,
          height: 24,
          width: 'auto',
          display: 'block',
        }}
      />

      <p
        style={{
          position: 'absolute',
          top: 24,
          left: 32,
          margin: 0,
          fontFamily: 'Inter, sans-serif',
          fontSize: 32,
          fontWeight: 400,
          color: '#FFFFFF',
          lineHeight: 1,
        }}
      >
        {title}
      </p>
      <p
        style={{
          position: 'absolute',
          top: 64,
          left: 32,
          right: 32,
          margin: 0,
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          fontWeight: 400,
          color: '#FFFFFF',
          opacity: 0.5,
          lineHeight: 1.5,
        }}
      >
        {subtitle}
      </p>

      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 32,
          right: 32,
          bottom: 56,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {sorted.map((review, idx) => {
          const isTop = idx === 0
          const widthPct = (review.starRating / 5) * 100
          return (
            <div
              key={review.rank}
              style={{
                position: 'relative',
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '28px 1fr 130px',
                gridColumnGap: 14,
                alignItems: 'stretch',
                padding: '14px 12px 14px 16px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderBottom:
                  idx === sorted.length - 1
                    ? '1px solid rgba(255,255,255,0.08)'
                    : 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${widthPct}%`,
                  background: isTop
                    ? 'rgba(0,195,217,0.10)'
                    : 'rgba(255,255,255,0.04)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />

              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: 11,
                  fontWeight: 400,
                  color: 'white',
                  opacity: isTop ? 0.85 : 0.55,
                  letterSpacing: '0.04em',
                  lineHeight: 1.4,
                  alignSelf: 'start',
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              {/* Title + location + date */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: 0,
                }}
              >
                {review.url ? (
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      margin: 0,
                      fontSize: 11,
                      fontWeight: 400,
                      lineHeight: 1.4,
                      color: 'white',
                      opacity: isTop ? 1 : 0.85,
                      textDecoration: 'none',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {review.title}
                  </a>
                ) : (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      fontWeight: 400,
                      lineHeight: 1.4,
                      color: 'white',
                      opacity: isTop ? 1 : 0.85,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {review.title}
                  </p>
                )}
                <p
                  style={{
                    ...LABEL_STYLE,
                    marginTop: 'auto',
                    paddingTop: 4,
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {review.date} · {review.location}
                </p>
              </div>

              {/* Stars + numeric */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: isTop ? colors.accent.teal : 'white',
                    opacity: isTop ? 1 : 0.9,
                  }}
                >
                  {review.starRating}/5
                </span>
                <div
                  style={{
                    marginTop: 'auto',
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <StarRow rating={review.starRating} isTop={isTop} size={12} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <a
        href={`https://${website}`}
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 32,
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          fontWeight: 400,
          color: 'white',
          opacity: 0.5,
          textDecoration: 'none',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        }}
      >
        {website}
      </a>
    </SlideFrame>
  )
}

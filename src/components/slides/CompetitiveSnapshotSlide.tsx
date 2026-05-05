import sfLogo from '../../../assets/logos/SF Logo.svg'
import { SlideFrame } from '../ui/SlideFrame'
import { colors } from '../../theme/colors'

export interface CompetitiveStatBlock {
  label: string                 // "Stock & Novelties" / "Active Meta Ads" / "Newsletters"
  /** Pairs to compare. First is usually the client brand, the rest are competitors. */
  rows: {
    brand: string
    value: string | number
    /** Single-line uppercase context (date, sender, "as of") */
    meta?: string
    /** Newsletter / email subject — italic body line under meta */
    subject?: string
  }[]
  /** Optional "as of" / context note shown in small caps */
  note?: string
}

export interface CompetitiveSnapshotSlideProps {
  title?: string
  subtitle?: string
  blocks: CompetitiveStatBlock[]
  website?: string
}

const fmt = (n: number | string) =>
  typeof n === 'number' ? n.toLocaleString('en-US') : n

export function CompetitiveSnapshotSlide({
  title = 'Competitive Snapshot',
  subtitle = 'Stock · Active ads · Newsletters · Apr 20–26, 2026',
  blocks,
  website = 'www.semanticforce.ai',
}: CompetitiveSnapshotSlideProps) {
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

      {/* Block grid: each block stacked vertically */}
      <div
        style={{
          position: 'absolute',
          top: 110,
          left: 32,
          right: 32,
          bottom: 56,
          display: 'grid',
          gridTemplateColumns: `repeat(${blocks.length}, 1fr)`,
          gap: 14,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {blocks.map((block, bi) => (
          <div
            key={bi}
            style={{
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 7,
                color: 'white',
                opacity: 0.5,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {block.label}
            </span>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {block.rows.map((row, ri) => {
                const isClient = ri === 0
                return (
                  <div
                    key={ri}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          color: 'white',
                          opacity: isClient ? 0.9 : 0.65,
                        }}
                      >
                        {row.brand}
                      </span>
                      <span
                        style={{
                          fontSize: 28,
                          fontWeight: 300,
                          lineHeight: 1,
                          letterSpacing: '-0.02em',
                          color: isClient ? colors.accent.teal : 'white',
                          opacity: isClient ? 1 : 0.85,
                        }}
                      >
                        {fmt(row.value)}
                      </span>
                    </div>
                    {row.meta && (
                      <span
                        style={{
                          fontSize: 7,
                          color: 'white',
                          opacity: 0.4,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          lineHeight: 1.4,
                        }}
                      >
                        {row.meta}
                      </span>
                    )}
                    {row.subject && (
                      <span
                        style={{
                          fontSize: 9,
                          color: 'white',
                          opacity: 0.7,
                          fontStyle: 'italic',
                          lineHeight: 1.4,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          marginTop: 2,
                        }}
                      >
                        «{row.subject}»
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {block.note && (
              <span
                style={{
                  marginTop: 'auto',
                  fontSize: 7,
                  color: 'white',
                  opacity: 0.4,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  lineHeight: 1.4,
                }}
              >
                {block.note}
              </span>
            )}
          </div>
        ))}
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

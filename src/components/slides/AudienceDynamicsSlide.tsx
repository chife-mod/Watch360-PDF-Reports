import sfLogo from '../../../assets/logos/SF Logo.svg'
import instagramLogo from '../../../assets/logos/Instagram.svg'
import facebookLogo from '../../../assets/logos/facebook-logo 1.svg'
import { IconBrandYoutube, IconWorld } from '@tabler/icons-react'
import { SlideFrame } from '../ui/SlideFrame'
import { colors } from '../../theme/colors'

export interface AudiencePlatform {
  name: string                  // "Instagram" / "Facebook" / "YouTube"
  url?: string                  // profile URL
  start: number
  end: number
}

export interface AudienceDynamicsSlideProps {
  title?: string
  brand?: string
  /** Period label: "Apr 20–26, 2026" */
  period?: string
  platforms: AudiencePlatform[]
  website?: string
}

function PlatformIcon({ name, size = 18 }: { name: string; size?: number }) {
  const s = name.trim().toLowerCase()
  if (s.includes('instagram')) {
    return (
      <img
        src={instagramLogo}
        alt={name}
        style={{ width: size, height: size, display: 'block', opacity: 1 }}
      />
    )
  }
  if (s.includes('facebook')) {
    return (
      <img
        src={facebookLogo}
        alt={name}
        style={{ width: size, height: size, display: 'block', opacity: 1 }}
      />
    )
  }
  if (s.includes('youtube')) {
    return <IconBrandYoutube size={size} stroke={1.75} color="#FF0000" />
  }
  return <IconWorld size={size} stroke={1.75} color="rgba(255,255,255,0.7)" />
}

const fmt = (n: number) => n.toLocaleString('en-US')

export function AudienceDynamicsSlide({
  title = 'Audience Dynamics',
  brand = 'Sacet',
  period = 'Apr 20–26, 2026',
  platforms,
  website = 'www.semanticforce.ai',
}: AudienceDynamicsSlideProps) {
  const totalDelta = platforms.reduce((sum, p) => sum + (p.end - p.start), 0)
  const subtitle = `${brand} · followers movement · ${period}`

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

      {/* Cards row */}
      <div
        style={{
          position: 'absolute',
          top: 110,
          left: 32,
          right: 32,
          bottom: 96,
          display: 'grid',
          gridTemplateColumns: `repeat(${platforms.length}, 1fr)`,
          gap: 14,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {platforms.map((p) => {
          const delta = p.end - p.start
          const deltaPct = p.start > 0 ? (delta / p.start) * 100 : 0
          const isUp = delta > 0
          const isDown = delta < 0
          const accentColor = isUp
            ? colors.accent.teal
            : isDown
            ? '#E2806B'
            : 'rgba(255,255,255,0.4)'
          return (
            <div
              key={p.name}
              style={{
                position: 'relative',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {/* Header: icon + platform name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <PlatformIcon name={p.name} size={18} />
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: 11,
                      color: 'white',
                      opacity: 0.85,
                      textDecoration: 'none',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {p.name}
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: 11,
                      color: 'white',
                      opacity: 0.85,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {p.name}
                  </span>
                )}
              </div>

              {/* Big current value */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span
                  style={{
                    fontSize: 36,
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: 'white',
                  }}
                >
                  {fmt(p.end)}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    color: 'white',
                    opacity: 0.45,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  followers
                </span>
              </div>

              {/* Delta row */}
              <div
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: accentColor,
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {isUp ? '+' : isDown ? '' : '±'}
                  {fmt(delta)}
                  {p.start > 0 && (
                    <span
                      style={{
                        fontSize: 9,
                        marginLeft: 6,
                        opacity: 0.7,
                        letterSpacing: 0,
                      }}
                    >
                      ({deltaPct >= 0 ? '+' : ''}
                      {deltaPct.toFixed(2)}%)
                    </span>
                  )}
                </span>
                <span
                  style={{
                    fontSize: 7,
                    color: 'white',
                    opacity: 0.4,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  vs {fmt(p.start)}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Total delta footer label */}
      <div
        style={{
          position: 'absolute',
          bottom: 44,
          left: 32,
          right: 32,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <span
          style={{
            fontSize: 7,
            color: 'white',
            opacity: 0.45,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
          }}
        >
          Audience Growth · {platforms.length} platforms
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: totalDelta > 0 ? colors.accent.teal : 'white',
            lineHeight: 1,
          }}
        >
          {totalDelta > 0 ? '+' : ''}
          {fmt(totalDelta)} followers
        </span>
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

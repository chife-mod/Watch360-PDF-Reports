import React, { useEffect, useState } from 'react'
import * as d3 from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'
import { SlideFrame } from '../ui/SlideFrame'
import { colors } from '../../theme/colors'
import logo01 from '../../../assets/logos/01.png'
import logo02 from '../../../assets/logos/02.png'
import logo03 from '../../../assets/logos/03.png'
import mapImage from '../../../assets/images/map-4x.png'

/* ── Types ────────────────────────────────────────────────────────── */

export interface TopCountry {
  rank: number
  flag: string
  name: string
  /** ISO numeric code (string, e.g. '840' for USA) */
  isoNumeric: string
  sources: number
}

export interface MediaBadge {
  name: string
  /** Imported logo image src */
  logo: string
  /** x position (absolute in slide px) */
  x: number
  /** y position (absolute in slide px) */
  y: number
}

export interface TopCountriesSlideProps {
  countries?: TopCountry[]
  mediaBadges?: MediaBadge[]
  footerRight?: string
  footerRightUrl?: string
}

/* ── Default data (Feb 2026) ──────────────────────────────────────── */

export const FEB_2026_COUNTRIES: TopCountry[] = [
  { rank: 1,  flag: '🇺🇸', name: 'USA',            isoNumeric: '840', sources: 52 },
  { rank: 2,  flag: '🇫🇷', name: 'France',          isoNumeric: '250', sources: 22 },
  { rank: 3,  flag: '🇮🇹', name: 'Italy',           isoNumeric: '380', sources: 21 },
  { rank: 4,  flag: '🇩🇪', name: 'Germany',         isoNumeric: '276', sources: 20 },
  { rank: 5,  flag: '🇬🇧', name: 'United Kingdom',  isoNumeric: '826', sources: 19 },
  { rank: 6,  flag: '🇨🇭', name: 'Switzerland',     isoNumeric: '756', sources: 16 },
  { rank: 7,  flag: '🇸🇬', name: 'Singapore',       isoNumeric: '702', sources: 15 },
  { rank: 8,  flag: '🇨🇳', name: 'China',           isoNumeric: '156', sources: 12 },
  { rank: 9,  flag: '🇬🇷', name: 'Greece',          isoNumeric: '300', sources: 11 },
  { rank: 10, flag: '🇦🇺', name: 'Australia',       isoNumeric: '036', sources: 10 },
]

/* Figma positions: Hodinkee x≈286 y=162, Chrono24 x≈423 y=169, GQ x≈448 y=205 */
export const FEB_2026_MEDIA_BADGES: MediaBadge[] = [
  { name: 'Hodinkee',           logo: logo01, x: 240, y: 195 },
  { name: 'Chrono24 Magazine',  logo: logo03, x: 420, y: 145 },
  { name: 'GQ Italia Orologi',  logo: logo02, x: 430, y: 180 },
]

/* ── Map dimensions ───────────────────────────────────────────────── */
/*
 * Map geometry (scale +20% from previous 142):
 *   container left=185, barely overlaps card-panel right-edge at 214px (29px)
 *   scale=170: Australia fully bleeds past right edge of slide
 *   translate_x=308: keeps USA at SVG x≈8 (same left position as before)
 *   MAP_W=750 to contain the wider projection
 */
const MAP_W = 700
const MAP_H = 401
const TOPO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

/* ── Dot-matrix world map ─────────────────────────────────────────── */

function WorldMap({ highlighted }: { highlighted: Map<string, number> }) {
  const [paths, setPaths] = useState<{ id: string; d: string }[]>([])
  const isPdf = typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('pdf') !== null

  useEffect(() => {
    fetch(TOPO_URL)
      .then(r => r.json())
      .then((topo: Topology) => {
        const projection = d3
          .geoNaturalEarth1()
          .scale(138)
          .translate([224, MAP_H / 2 + 61])

        const pathGen = d3.geoPath(projection)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const countries = feature(topo, (topo as any).objects.countries as GeometryCollection)
        const built: { id: string; d: string }[] = []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(countries as any).features.forEach((f: any) => {
          const d = pathGen(f)
          if (d) built.push({ id: String(f.id), d })
        })
        setPaths(built)
      })
      .catch(() => {/* silently fail */})
  }, [])

  /** Solid fill color for a given rank (PDF mode) or base (non-highlighted) */
  const solidFill = (rank: number | undefined) => {
    if (rank == null) return 'rgba(255,255,255,0.06)'
    const opacity = Math.max(0.20, 0.50 - (rank - 1) * 0.032)
    return `rgba(0,195,217,${opacity.toFixed(2)})`
  }

  return (
    <svg
      width={MAP_W}
      height={MAP_H}
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      style={{ display: 'block' }}
    >
      {!isPdf && (
        <defs>
          {/* Base: very dim dots for non-highlighted countries */}
          <pattern id="tc-dots-base" x="0" y="0" width="3.5" height="3.5" patternUnits="userSpaceOnUse">
            <circle cx="1.75" cy="1.75" r="0.75" fill="rgba(255,255,255,0.15)" />
          </pattern>

          {/* Highlighted: teal, brightness scales with rank (rank 1 = brightest) */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rank => {
            const opacity = Math.max(0.45, 1.0 - (rank - 1) * 0.058)
            return (
              <pattern
                key={rank}
                id={`tc-dots-t${rank}`}
                x="0" y="0" width="3.5" height="3.5"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1.75" cy="1.75" r="0.95" fill={`rgba(0,195,217,${opacity.toFixed(2)})`} />
              </pattern>
            )
          })}
        </defs>
      )}

      <g>
        {paths.map(({ id, d }) => {
          const rank = highlighted.get(id)
          let fill: string
          if (isPdf) {
            // Solid fills for PDF — stays 100% vector
            fill = solidFill(rank)
          } else {
            // Dot patterns for screen
            fill = rank != null ? `url(#tc-dots-t${rank})` : 'url(#tc-dots-base)'
          }
          return (
            <path
              key={id}
              d={d}
              fill={fill}
              stroke="none"
            />
          )
        })}
      </g>
    </svg>
  )
}

/* ── Media badge (floating source label on map) ───────────────────── */

function MediaBadgeEl({ name, logo }: { name: string; logo: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      {/* Avatar circle with real logo */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '0.5px solid rgba(255,255,255,0.24)',
          background: colors.thumbnailBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src={logo}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
      </div>
      {/* Name */}
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          fontWeight: 400,
          color: '#FFFFFF',
          whiteSpace: 'nowrap',
          lineHeight: 1.5,
        }}
      >
        {name}
      </span>
    </div>
  )
}

/* ── Slide ────────────────────────────────────────────────────────── */

/**
 * TopCountriesSlide — "Coverage: Top Countries"
 *
 * Pixel-perfect port of Figma node 51:3321.
 *
 * Layout (720×450px):
 *   Map:   absolute, left=80, top=35, w=670, h=410 — extends past right+bottom edges (bleed)
 *   Panel: absolute, left=32, top=72, w=182 — 10 rows × 32px, gap=2
 *   Badges: floating media labels on the map
 *
 * Card anatomy (h=32, glass, backdrop-blur):
 *   [rank: justify-end pb=12 | flag: pt=2 h-full | name+bar: justify-center | sources: justify-end pb=5]
 */
export function TopCountriesSlide({
  countries = FEB_2026_COUNTRIES,
  mediaBadges = FEB_2026_MEDIA_BADGES,
  footerRight = 'www.watch360.ai',
  footerRightUrl = 'https://www.watch360.ai',
}: TopCountriesSlideProps) {
  const maxSrc = Math.max(...countries.map(c => c.sources))

  return (
    <SlideFrame>
      <Header />

      {/* ── World Map: pre-rendered 4x PNG from assets ── */}
      <div
        style={{
          position: 'absolute',
          top: 25,
          left: 185,
          width: MAP_W,
          height: MAP_H,
          overflow: 'visible',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <img
          src={mapImage}
          alt="World Map"
          style={{
            width: MAP_W,
            height: MAP_H,
            display: 'block',
          }}
        />
      </div>

      {/* ── Media source badges — absolute on the slide ── */}
      {mediaBadges.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: b.x,
            top: b.y,
            zIndex: 2,
          }}
        >
          <MediaBadgeEl name={b.name} logo={b.logo} />
        </div>
      ))}

      {/* ── Title ── */}
      <p
        style={{
          position: 'absolute',
          top: 24,
          left: 32,
          margin: 0,
          fontFamily: 'Inter, sans-serif',
          fontSize: 32,
          fontWeight: 400,
          lineHeight: 1,
          whiteSpace: 'nowrap',
          zIndex: 3,
        }}
      >
        <span style={{ color: '#00C3D9' }}>Coverage: </span>
        <span style={{ color: '#FFFFFF' }}>Top Countries</span>
      </p>

      {/* ── Column headers ── */}
      <div
        style={{
          position: 'absolute',
          top: 68,
          left: 32,
          width: 182,
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: 2,
          zIndex: 3,
        }}
      >
        <div style={{ display: 'flex', gap: 26 }}>
          <span style={hdrStyle}>Rank</span>
          <span style={hdrStyle}>Country</span>
        </div>
        <span style={{ ...hdrStyle, textAlign: 'right' }}>Sources</span>
      </div>

      {/* ── Country rows ── */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 32,
          width: 182,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          zIndex: 3,
        }}
      >
        {countries.map(c => {
          const barPct = Math.max(6, (c.sources / maxSrc) * 100)
          const barColor = c.rank === 1 ? '#3DE0B8' : 'rgba(255,255,255,0.75)'
          const srcColor = c.rank === 1 ? '#00C3D9' : '#FFFFFF'
          const rankColor = c.rank === 1 ? '#00C3D9' : 'rgba(255,255,255,0.5)'
          const rankWeight = c.rank === 1 ? 700 : 400

          return (
            <div
              key={c.rank}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 32,
                gap: 4,
                paddingLeft: 8,
                paddingRight: 8,
                background: 'rgba(18,18,18,0.92)',
                borderRadius: 4,
                boxSizing: 'border-box',
              }}
            >
              {/* ── Rank: justify-end pb=12 (sits at ~baseline of country name) ── */}
              <div
                style={{
                  width: 13,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  paddingBottom: 12,
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 10,
                    fontWeight: rankWeight,
                    color: rankColor,
                    lineHeight: 1.5,
                  }}
                >
                  {c.rank}
                </span>
              </div>

              {/* ── Flag + Name+Bar ── */}
              <div
                style={{
                  flex: 1,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8, // increased gap flag→name per user request
                  minWidth: 0,
                  boxSizing: 'border-box',
                }}
              >
                {/* Flag: vertically centered to align with country name */}
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginTop: -3,
                  }}
                >
                  <span style={{ fontSize: 16, lineHeight: 1 }}>{c.flag}</span>
                </div>

                {/* Name + progress bar: centered */}
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 3,
                    minWidth: 0,
                    overflow: 'hidden',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 10,
                      fontWeight: 400,
                      color: '#FFFFFF',
                      lineHeight: 1.5,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {c.name}
                  </span>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: 500,
                      height: 4,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${barPct}%`,
                        height: '100%',
                        background: barColor,
                        borderRadius: 500,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* ── Sources: justify-end pb=2 ── */}
              <div
                style={{
                  width: 28,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  paddingBottom: 2,
                  flexShrink: 0,
                  boxSizing: 'border-box',
                  textAlign: 'right',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 20,
                    fontWeight: 400,
                    color: srcColor,
                    lineHeight: 1,
                  }}
                >
                  {c.sources}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <Footer right={footerRight} rightUrl={footerRightUrl} />
    </SlideFrame>
  )
}

/* ── Column header style ──────────────────────────────────────────── */

const hdrStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 7,
  fontWeight: 400,
  color: 'rgba(255,255,255,0.5)',
  textTransform: 'uppercase',
  letterSpacing: '0.14px',
  lineHeight: 1.5,
  whiteSpace: 'nowrap',
}

/* ── Map Service Page ─────────────────────────────────────────────── */
/**
 * Standalone page that renders ONLY the WorldMap on a dark background.
 * Used by export-pdf.mjs to capture a high-res 3x screenshot of the map
 * which is then substituted into the Countries slide during PDF export.
 *
 * Route: /?map
 */
export function MapServicePage() {
  const highlightedMap = new Map<string, number>(
    FEB_2026_COUNTRIES.map(c => [c.isoNumeric, c.rank])
  )
  return (
    <div
      id="map-service"
      style={{
        width: MAP_W,
        height: MAP_H,
        background: '#0D0D0D',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <WorldMap highlighted={highlightedMap} />
    </div>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import { Header } from '../ui/Header'
import { colors } from '../../theme/colors'
import { Footer } from '../ui/Footer'
import { SlideFrame } from '../ui/SlideFrame'

/* ── Types ────────────────────────────────────────────────────────── */

export interface CountryRow {
  rank: number
  flag: string
  name: string
  /** ISO numeric code (zero-padded 3 digits) — for map highlight */
  isoNumeric: string
  sources: number
}

export interface MediaSample {
  name: string
}

export interface CountriesSlideProps {
  title?: string
  countries?: CountryRow[]
  mediaSamples?: MediaSample[]
  footerRight?: string
  footerRightUrl?: string
}

/* ── Default data ─────────────────────────────────────────────────── */

export const DEFAULT_COUNTRIES: CountryRow[] = [
  { rank: 1,  flag: '🇺🇸', name: 'USA',         isoNumeric: '840', sources: 52 },
  { rank: 2,  flag: '🇫🇷', name: 'France',       isoNumeric: '250', sources: 22 },
  { rank: 3,  flag: '🇮🇹', name: 'Italy',        isoNumeric: '380', sources: 21 },
  { rank: 4,  flag: '🇩🇪', name: 'Germany',      isoNumeric: '276', sources: 20 },
  { rank: 5,  flag: '🇬🇧', name: 'UK',           isoNumeric: '826', sources: 19 },
  { rank: 6,  flag: '🇨🇭', name: 'Switzerland',  isoNumeric: '756', sources: 16 },
  { rank: 7,  flag: '🇸🇬', name: 'Singapore',    isoNumeric: '702', sources: 15 },
  { rank: 8,  flag: '🇨🇳', name: 'China',        isoNumeric: '156', sources: 12 },
  { rank: 9,  flag: '🇬🇷', name: 'Greece',       isoNumeric: '300', sources: 11 },
  { rank: 10, flag: '🇦🇺', name: 'Australia',    isoNumeric: '036', sources: 10 },
]

export const DEFAULT_MEDIA: MediaSample[] = [
  { name: 'Hodinkee' },
  { name: 'Monochrome' },
  { name: 'Fratello' },
  { name: 'aBlogToWatch' },
  { name: 'WatchTime' },
  { name: 'Revolution' },
  { name: 'WatchFinder' },
]

/* ── Map component (d3-geo + topojson) ───────────────────────────── */

const MAP_W = 550
const MAP_H = 268
const TOPO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

function WorldMap({ highlighted }: { highlighted: Set<string> }) {
  const [paths, setPaths] = useState<{ id: string; d: string }[]>([])

  useEffect(() => {
    fetch(TOPO_URL)
      .then(r => r.json())
      .then((topo: Topology) => {
        const projection = d3
          .geoNaturalEarth1()
          .scale(90)
          .translate([MAP_W / 2 - 50, MAP_H / 2 + 10])

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
      .catch(() => {/* silently fail — map just won't show */})
  }, [])

  return (
    <svg
      width={MAP_W}
      height={MAP_H}
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      style={{ display: 'block' }}
    >
      <defs>
        {/* Dot pattern for inactive countries */}
        <pattern id="dots-base" x="0" y="0" width="3.5" height="3.5" patternUnits="userSpaceOnUse">
          <circle cx="1.75" cy="1.75" r="0.8" fill="rgba(255,255,255,0.15)" />
        </pattern>
        {/* Dot pattern for highlighted (teal) countries */}
        <pattern id="dots-teal" x="0" y="0" width="3.5" height="3.5" patternUnits="userSpaceOnUse">
          <circle cx="1.75" cy="1.75" r="0.8" fill="rgba(0,195,217,0.9)" />
        </pattern>
        {/* Radial fade mask */}
        <radialGradient id="fade-mask-grad" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="fade-mask">
          <rect width={MAP_W} height={MAP_H} fill="url(#fade-mask-grad)" />
        </mask>
      </defs>

      {/* Render paths */}
      <g mask="url(#fade-mask)">
        {paths.map(({ id, d }) => (
          <path
            key={id}
            d={d}
            fill={highlighted.has(id) ? 'url(#dots-teal)' : 'url(#dots-base)'}
            stroke="none"
          />
        ))}
      </g>
    </svg>
  )
}

/* ── Slide ────────────────────────────────────────────────────────── */

/**
 * CountriesSlide — "Coverage: Top Countries"
 *
 * Layout (720×450px):
 *   Left  (428px): d3-geo dotted world map — highlighted countries in teal
 *   Right (240px): top-10 table: rank | flag | country | sources | bar
 *   Bottom strip:  media sample pills (placeholder logo + name)
 *
 * Map data: world-atlas@2 countries-110m.json (fetched from CDN at runtime)
 */
export function CountriesSlide({
  title = 'Top Countries',
  countries = DEFAULT_COUNTRIES,
  mediaSamples = DEFAULT_MEDIA,
  footerRight = 'www.watch360.ai',
  footerRightUrl = 'https://watch360.ai',
}: CountriesSlideProps) {
  const maxSrc = Math.max(...countries.map(c => c.sources))
  const highlighted = useRef(new Set(countries.map(c => c.isoNumeric))).current

  return (
    <SlideFrame>
      <Header />

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
        }}
      >
        <span style={{ color: '#00C3D9' }}>Coverage: </span>
        <span style={{ color: '#fff' }}>{title}</span>
      </p>

      {/* ── World Map (left, absolute) ── */}
      <div
        style={{
          position: 'absolute',
          top: 62,
          left: 38,
          width: MAP_W,
          height: MAP_H,
        }}
      >
        <WorldMap highlighted={highlighted} />
      </div>

      {/* ── Country Table (right) ── */}
      <div
        style={{
          position: 'absolute',
          top: 80, // 24px gap from title baseline
          left: 452,
          width: 240,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: 7,
            borderBottom: `1px solid ${colors.border}`,
            gap: 0,
          }}
        >
          <div style={{ ...hdr, width: 22 }}>#</div>
          <div style={{ ...hdr, width: 22 }} />
          <div style={{ ...hdr, flex: 1 }}>Country</div>
          <div style={{ ...hdr, width: 32, textAlign: 'right' }}>Srcs</div>
          <div style={{ width: 44 }} />
        </div>

        {/* Rows */}
        {countries.map(c => (
          <div
            key={c.rank}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderTop: c.rank === 1 ? 'none' : '0.5px solid rgba(255,255,255,0.07)',
              padding: '4.5px 0',
            }}
          >
            {/* Rank */}
            <div style={{ width: 22, ...rankStyle }}>
              {String(c.rank).padStart(2, '0')}
            </div>
            {/* Flag */}
            <div style={{ width: 22, fontSize: 12, lineHeight: '14px', flexShrink: 0 }}>
              {c.flag}
            </div>
            {/* Country */}
            <div
              style={{
                flex: 1,
                fontFamily: 'Inter, sans-serif',
                fontSize: 9,
                fontWeight: 400,
                color: '#fff',
                lineHeight: 1.4,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {c.name}
            </div>
            {/* Sources */}
            <div
              style={{
                width: 32,
                textAlign: 'right',
                fontFamily: 'Inter, sans-serif',
                fontSize: 9,
                fontWeight: 400,
                color: c.rank === 1 ? '#00C3D9' : '#fff',
                lineHeight: 1.4,
                flexShrink: 0,
              }}
            >
              {c.sources}
            </div>
            {/* Bar */}
            <div style={{ width: 44, paddingLeft: 6 }}>
              <div
                style={{
                  height: 2,
                  borderRadius: 500,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${Math.max(6, (c.sources / maxSrc) * 100)}%`,
                    height: '100%',
                    borderRadius: 500,
                    backgroundColor: '#00C3D9',
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Media Samples Strip ── */}
      <div
        style={{
          position: 'absolute',
          top: 350,
          left: 32,
          width: 656,
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
        }}
      >
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 7,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.14px',
          }}
        >
          Media samples
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {mediaSamples.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '3px 8px 3px 5px',
                border: '0.5px solid rgba(255,255,255,0.12)',
                borderRadius: 2,
                flexShrink: 0,
              }}
            >
              {/* Placeholder logo */}
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 8,
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.6)',
                  whiteSpace: 'nowrap',
                }}
              >
                {m.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Footer right={footerRight} rightUrl={footerRightUrl} />
    </SlideFrame>
  )
}

/* ── Shared styles ────────────────────────────────────────────────── */

const hdr: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 7,
  fontWeight: 400,
  color: 'rgba(255,255,255,0.45)',
  textTransform: 'uppercase',
  letterSpacing: '0.14px',
  lineHeight: 1.5,
  whiteSpace: 'nowrap',
  flexShrink: 0,
}

const rankStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 7,
  fontWeight: 400,
  color: 'rgba(255,255,255,0.35)',
  lineHeight: 1,
  flexShrink: 0,
}

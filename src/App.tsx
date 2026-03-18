import { useState, useEffect, useCallback } from 'react'
import { Toolbar, type ReportVersion } from './app/Toolbar'
import { CoverSlide } from './components/slides/CoverSlide'
import { TableSlide } from './components/slides/TableSlide'
import { WatchReferencesSlide } from './components/slides/WatchReferencesSlide'
import { QuoteSlide } from './components/slides/QuoteSlide'
import watchImg from '../assets/images/Watch 1.png'

/* ── Mock data ────────────────────────────────────────────── */

const MOCK_VERSIONS: ReportVersion[] = [
  { id: '2026-03-18', date: '2026-03-18', title: 'Watch Media' },
  { id: '2026-02-15', date: '2026-02-15', title: 'Watch Media' },
  { id: '2026-01-12', date: '2026-01-12', title: 'Watch Media' },
]

const MOCK_TABLE_ROWS = [
  { rank: 1, domain: 'teddybaldassarre.com', type: 'Watch Media', occurrence: 87 },
  { rank: 2, domain: 'hewore.com', type: 'Blog', occurrence: 76 },
  { rank: 3, domain: 'watchfinder.es', type: 'Marketplace', occurrence: 72 },
  { rank: 4, domain: 'techwriteredc.com', type: 'Blog', occurrence: 64 },
  { rank: 5, domain: 'watchcharts.com', type: 'Marketplace', occurrence: 62 },
  { rank: 6, domain: 'chrono24.com', type: 'Marketplace', occurrence: 56 },
  { rank: 7, domain: 'monochrome-watches.com', type: 'Watch Media', occurrence: 47 },
  { rank: 8, domain: 'omegawatches.com', type: 'Watch Media', occurrence: 11 },
]

const MOCK_INSIGHTS = [
  { text: 'Watch media dominates across most segments.' },
  { text: 'Marketplaces and manufacturer sites gain influence in higher price tiers.' },
]

const MOCK_WATCHES = [
  {
    image: watchImg,
    brand: 'Grand Seiko',
    model: 'Annual Accuracy Quartz SBGX361',
    launchDate: 'Launch Apr, 2026',
    mentions: 23, sources: 23, countries: 23,
    priceRange: '$10 000-$25 000', dialColor: 'Blue', dialColorHex: '#455691',
  },
  {
    image: watchImg,
    brand: 'Grand Seiko',
    model: 'Heritage Collection SBGA211',
    launchDate: 'Launch Mar, 2026',
    mentions: 19, sources: 17, countries: 14,
    priceRange: '$5 000-$10 000', dialColor: 'White', dialColorHex: '#C0C0C0',
  },
  {
    image: watchImg,
    brand: 'Omega',
    model: 'Seamaster Planet Ocean 600M',
    launchDate: 'Launch Feb, 2026',
    mentions: 31, sources: 28, countries: 19,
    priceRange: '$5 000-$10 000', dialColor: 'Black', dialColorHex: '#3A3A3A',
  },
  {
    image: watchImg,
    brand: 'Rolex',
    model: 'Submariner Date 126610LN',
    launchDate: 'Launch Jan, 2026',
    mentions: 45, sources: 38, countries: 27,
    priceRange: '$10 000-$25 000', dialColor: 'Black', dialColorHex: '#3A3A3A',
  },
]

/* ── Constants ────────────────────────────────────────────── */

const SLIDE_W = 720
const SLIDE_H = 450
const SIDE_PAD = 150
const MIN_ZOOM = 30
const MAX_ZOOM = 100

/**
 * Fit scale — вписывает слайд в viewport по ОБОИМ измерениям.
 * По высоте берём 80% чтобы оставить место для toolbar + gaps.
 */
function calcFitScale(vw: number, vh: number) {
  const byWidth = (vw - SIDE_PAD * 2) / SLIDE_W
  const byHeight = (vh * 0.8) / SLIDE_H
  return Math.min(byWidth, byHeight)
}

/* ── App ──────────────────────────────────────────────────── */

function App() {
  const [selectedVersion, setSelectedVersion] = useState(MOCK_VERSIONS[0].id)
  const [zoom, setZoom] = useState(100)
  const [fitScale, setFitScale] = useState(() =>
    calcFitScale(window.innerWidth, window.innerHeight),
  )
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 4

  useEffect(() => {
    const onResize = () =>
      setFitScale(calcFitScale(window.innerWidth, window.innerHeight))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // IntersectionObserver — следим за какой слайд сейчас в viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    for (let i = 0; i < totalSlides; i++) {
      const el = document.getElementById(`slide-${i}`)
      if (!el) continue
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setCurrentSlide(i)
        },
        { threshold: 0.5 },
      )
      obs.observe(el)
      observers.push(obs)
    }
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleExportPdf = () => {
    console.log('Export PDF — not implemented yet')
  }

  /** Финальный scale: fitScale * zoom(%) */
  const scale = fitScale * (zoom / 100)

  return (
    <div
      style={{
        background: '#000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 80,
        gap: 40,
      }}
    >
      <Toolbar
        versions={MOCK_VERSIONS}
        selectedId={selectedVersion}
        onSelect={setSelectedVersion}
        onExportPdf={handleExportPdf}
        currentSlide={currentSlide}
        totalSlides={totalSlides}
      />

      <SlideWrapper scale={scale} slideIndex={0}>
        <CoverSlide
          title="Watch Media"
          period="Dec 2025 – Feb 2026"
          website="www.watch360.ai"
        />
      </SlideWrapper>

      <SlideWrapper scale={scale} slideIndex={1}>
        <TableSlide
          titleLines={['Top Sources', 'Used by AI']}
          subtitle="Information sources used by AI models for diver watch recommendations across price segments"
          rows={MOCK_TABLE_ROWS}
          insights={MOCK_INSIGHTS}
          footerRight="www.watch360.ai"
        />
      </SlideWrapper>

      <SlideWrapper scale={scale} slideIndex={2}>
        <WatchReferencesSlide
          watches={MOCK_WATCHES}
          footerRight="www.watch360.ai"
        />
      </SlideWrapper>

      {/* Slide 04 — Quote */}
      <SlideWrapper scale={scale} slideIndex={3}>
        <QuoteSlide
          quote={"“AI doesn’t just recommend watches — it defines which brands exist in the consumer’s reality.”"}
          author="ChatGPT"
          authorDescription="AI Model, OpenAI"
          footerRight="www.watch360.ai"
        />
      </SlideWrapper>

      {/* Zoom control — bottom right */}
      <ZoomSlider zoom={zoom} onChange={setZoom} />
    </div>
  )
}

/* ── SlideWrapper ─────────────────────────────────────────── */

function SlideWrapper({
  scale,
  slideIndex,
  children,
}: {
  scale: number
  slideIndex: number
  children: React.ReactNode
}) {
  return (
    <div
      id={`slide-${slideIndex}`}
      style={{
        width: SLIDE_W * scale,
        height: SLIDE_H * scale,
        flexShrink: 0,
        position: 'relative',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      <div
        style={{
          width: SLIDE_W,
          height: SLIDE_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ── ZoomSlider — bottom-right ────────────────────────────── */

function ZoomSlider({
  zoom,
  onChange,
}: {
  zoom: number
  onChange: (v: number) => void
}) {
  const [hovered, setHovered] = useState(false)
  const handleFit = useCallback(() => onChange(100), [onChange])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 14px',
        borderRadius: 10,
        background: hovered
          ? 'rgba(255,255,255,0.08)'
          : 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'background 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Minus */}
      <button
        onClick={() => onChange(Math.max(MIN_ZOOM, zoom - 10))}
        style={iconBtnStyle}
        title="Zoom out"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Slider */}
      <input
        type="range"
        min={MIN_ZOOM}
        max={MAX_ZOOM}
        value={zoom}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: 100,
          height: 3,
          appearance: 'none',
          WebkitAppearance: 'none',
          background: `linear-gradient(to right, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) ${((zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100}%, rgba(255,255,255,0.12) ${((zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)) * 100}%, rgba(255,255,255,0.12) 100%)`,
          borderRadius: 2,
          outline: 'none',
          cursor: 'pointer',
        }}
      />

      {/* Plus */}
      <button
        onClick={() => onChange(Math.min(MAX_ZOOM, zoom + 10))}
        style={iconBtnStyle}
        title="Zoom in"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Percentage */}
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 11,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.45)',
          minWidth: 32,
          textAlign: 'center',
          fontVariantNumeric: 'tabular-nums',
          userSelect: 'none',
        }}
      >
        {zoom}%
      </span>

      {/* FIT button */}
      <button
        onClick={handleFit}
        style={{
          ...iconBtnStyle,
          fontSize: 10,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          letterSpacing: '0.04em',
          padding: '3px 8px',
          borderRadius: 4,
          background: zoom === 100 ? 'rgba(255,255,255,0.1)' : 'transparent',
        }}
        title="Fit to width"
      >
        FIT
      </button>
    </div>
  )
}

const iconBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'rgba(255,255,255,0.45)',
  cursor: 'pointer',
  padding: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  transition: 'color 0.15s ease',
}

export default App

import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'
import { SlideFrame } from '../ui/SlideFrame'

export interface WatchReference {
  /** URL картинки часов */
  image?: string
  /** Бренд (badge) */
  brand: string
  /** Модель */
  model: string
  /** Дата запуска */
  launchDate?: string
  /** Количество упоминаний */
  mentions: number
  /** Количество источников */
  sources: number
  /** Количество стран */
  countries: number
  /** Ценовой диапазон */
  priceRange: string
  /** Цвет циферблата (текст) */
  dialColor: string
  /** Цвет циферблата (hex для dot) */
  dialColorHex: string
}

export interface WatchReferencesSlideProps {
  /** Заголовок слайда */
  title?: string
  /** Данные часов */
  watches: WatchReference[]
  /** Правая часть футера */
  footerRight?: string
  /** URL для кликабельной ссылки в футере. Пример: "https://watch360.ai" */
  footerRightUrl?: string
}

/**
 * WatchReferencesSlide — слайд "Watch References"
 *
 * Таблица с карточками часов: изображение, модель (бренд badge),
 * mentions, sources, countries, price range, dial color (цветной dot).
 *
 * Figma: node 21-2192, file V8XA0PVaAjxvPbq24stJXk
 */
export function WatchReferencesSlide({
  title = 'Watch References',
  watches,
  footerRight = 'www.watch360.ai',
  footerRightUrl = 'https://watch360.ai',
}: WatchReferencesSlideProps) {
  return (
    <SlideFrame>
      <Header />

      {/* ── Title ── */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 32,
          width: 437,
          fontFamily: 'Inter, sans-serif',
          fontSize: 32,
          fontWeight: 400,
          lineHeight: 1,
          color: 'white',
        }}
      >
        {title}
      </div>

      {/* ── Table ── */}
      <div
        style={{
          position: 'absolute',
          top: 96,
          left: 32,
          width: 656,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Table Header */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Empty space for image column */}
          <div style={{ width: 72, height: 19, paddingBottom: 8, flexShrink: 0 }} />
          <div style={{ ...hdrStyle, width: 194 }}>Model</div>
          <div style={{ ...hdrStyle, width: 65 }}>Mentions</div>
          <div style={{ ...hdrStyle, width: 65 }}>Sources</div>
          <div style={{ ...hdrStyle, width: 65 }}>Countries</div>
          <div style={{ ...hdrStyle, width: 110 }}>Price Range</div>
          <div style={{ ...hdrStyle, flex: 1, textAlign: 'right' }}>Dial Color</div>
        </div>

        {/* Rows */}
        {watches.map((w, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderTop: '0.5px solid rgba(255,255,255,0.15)',
            }}
          >
            {/* Watch image */}
            <div style={{ padding: '8px 16px 8px 0', flexShrink: 0 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  border: '0.5px solid rgba(255,255,255,0.24)',
                  overflow: 'hidden',
                  backgroundColor: '#1d2437',
                  position: 'relative',
                }}
              >
                {w.image && (
                  <img
                    src={w.image}
                    alt={w.model}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 16,
                      display: 'block',
                    }}
                  />
                )}
              </div>
            </div>

            {/* Model info */}
            <div
              style={{
                width: 194,
                paddingRight: 16,
                paddingTop: 4,
                paddingBottom: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                justifyContent: 'center',
                alignSelf: 'stretch',
                flexShrink: 0,
              }}
            >
              {/* Brand badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px 8px',
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  alignSelf: 'flex-start',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 7,
                    fontWeight: 400,
                    color: 'white',
                    opacity: 0.7,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {w.brand}
                </span>
              </div>
              {/* Model name */}
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 10,
                  fontWeight: 400,
                  color: 'white',
                  lineHeight: 1.5,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {w.model}
              </span>
              {/* Launch date */}
              {w.launchDate && (
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 7,
                    fontWeight: 400,
                    color: 'white',
                    opacity: 0.5,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {w.launchDate}
                </span>
              )}
            </div>

            {/* Mentions */}
            <div style={{ ...cellStyle, width: 65 }}>{w.mentions}</div>

            {/* Sources */}
            <div style={{ ...cellStyle, width: 65 }}>{w.sources}</div>

            {/* Countries */}
            <div style={{ ...cellStyle, width: 65 }}>{w.countries}</div>

            {/* Price Range */}
            <div style={{ ...cellStyle, width: 110 }}>{w.priceRange}</div>

            {/* Dial Color */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 12,
                padding: '3px 0',
                alignSelf: 'stretch',
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 10,
                  fontWeight: 400,
                  color: 'white',
                  whiteSpace: 'nowrap',
                  textAlign: 'right',
                }}
              >
                {w.dialColor}
              </span>
              {/* Color dot */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 500,
                  backgroundColor: `${w.dialColorHex}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 1200,
                    backgroundColor: w.dialColorHex,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer right={footerRight} rightUrl={footerRightUrl} />
    </SlideFrame>
  )
}

/** Table header cell style */
const hdrStyle: React.CSSProperties = {
  paddingBottom: 8,
  fontFamily: 'Inter, sans-serif',
  fontSize: 7,
  fontWeight: 400,
  color: 'white',
  opacity: 0.5,
  textTransform: 'uppercase',
  letterSpacing: '0.14px',
  lineHeight: 1.5,
  whiteSpace: 'nowrap',
  flexShrink: 0,
}

/** Data cell style */
const cellStyle: React.CSSProperties = {
  padding: '8px 0',
  fontFamily: 'Inter, sans-serif',
  fontSize: 10,
  fontWeight: 400,
  color: 'white',
  lineHeight: 1.5,
  flexShrink: 0,
  alignSelf: 'stretch',
  display: 'flex',
  alignItems: 'center',
}

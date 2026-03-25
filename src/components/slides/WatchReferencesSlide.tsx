import { Header } from '../ui/Header'
import { BrandTag } from '../ui/BrandTag'
import { Footer } from '../ui/Footer'
import { SlideFrame } from '../ui/SlideFrame'
import { LaunchDate } from '../ui/LaunchDate'
import { colors } from '../../theme/colors'

export interface WatchReference {
  /** URL картинки часов */
  image?: string
  /** Бренд (badge) */
  brand: string
  /** Модель */
  model: string
  /** Дата запуска */
  launchDate?: string
  /** Количество статей (Articles) */
  articles: number
  /** Количество источников */
  sources: number
  /** Количество стран */
  countries: number
  /** Ценовой диапазон */
  priceRange: string
  /** Материал корпуса */
  caseMaterial?: string
  /** Цвет циферблата (текст - больше не показывается, но нужен) */
  dialColor: string
  /** Цвет циферблата (hex для dot) */
  dialColorHex: string
  /** Цвет обводки циферблата (опционально) */
  dialColorWrapperHex?: string
}

export interface WatchReferencesSlideProps {
  /** Заголовок слайда */
  title?: string
  /** Цветной суффикс заголовка (например "[1-5]") */
  titleHighlight?: string
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
  titleHighlight,
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
        <span style={{ lineHeight: 1 }}>{title}</span>
        {titleHighlight && (
          <span style={{ lineHeight: 1, color: '#00c3d9' }}>
            {' '}
            {titleHighlight}
          </span>
        )}
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
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            borderBottom: `0.5px solid ${colors.border}`,
            paddingBottom: 6,
            boxSizing: 'border-box',
          }}
        >
          <div style={{ ...hdrStyle, width: 81 }}>Rank</div>
          <div style={{ ...hdrStyle, width: 186 }}>Model</div>
          <div style={{ ...hdrStyle, width: 57 }}>Articles</div>
          <div style={{ ...hdrStyle, width: 57 }}>Sources</div>
          <div style={{ ...hdrStyle, width: 57 }}>Countries</div>
          <div style={{ ...hdrStyle, width: 108 }}>Price Range</div>
          <div style={{ ...hdrStyle, flex: 1 }}>Case Material</div>
          <div style={{ ...hdrStyle, width: 50.5, textAlign: 'right', justifyContent: 'flex-end', display: 'flex' }}>Dial Color</div>
        </div>

        {/* Rows */}
        {watches.map((w, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 62,
              borderTop: '0.5px solid rgba(255,255,255,0.15)',
              boxSizing: 'border-box',
            }}
          >
            {/* Rank */}
            <div
              style={{
                width: 19,
                fontFamily: 'Inter, sans-serif',
                fontSize: 10,
                fontWeight: 700,
                color: i === 0 ? '#00c3d9' : 'white',
                lineHeight: 1.5,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>

            {/* Watch image */}
            <div style={{ paddingRight: 8, flexShrink: 0 }}>
              <div
                style={{
                  width: 54,
                  height: 54,
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
                width: 186,
                paddingRight: 16,
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 10,
                  fontWeight: 400,
                  color: 'white',
                  lineHeight: 1.5,
                  whiteSpace: 'nowrap',
                  overflow: 'visible', // allows absolutes to be visible
                  width: '100%',
                  position: 'relative',
                }}
              >
                {/* Brand badge - absolutely positioned relative to Model baseline */}
                <div style={{ position: 'absolute', bottom: '100%', left: 0, marginBottom: 2 }}>
                  <BrandTag label={w.brand} />
                </div>

                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {w.model}
                </div>

                {/* Launch date / Novelties - absolutely positioned below relative to Model text bottom */}
                {w.launchDate && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 2 }}>
                    <LaunchDate date={w.launchDate} />
                  </div>
                )}
              </div>
            </div>

            {/* Articles */}
            <div style={{ ...cellStyle, width: 57 }}>{w.articles}</div>

            {/* Sources */}
            <div style={{ ...cellStyle, width: 57 }}>{w.sources}</div>

            {/* Countries */}
            <div style={{ ...cellStyle, width: 57 }}>{w.countries}</div>

            {/* Price Range */}
            <div style={{ ...cellStyle, width: 108 }}>{w.priceRange}</div>

            {/* Case Material */}
            <div style={{ ...cellStyle, flex: 1 }}>{w.caseMaterial || 'Steel'}</div>

            {/* Dial Color dot */}
            <div
              style={{
                width: 50.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                alignSelf: 'stretch',
              }}
            >
              <div
                style={{
                  padding: 4,
                  borderRadius: 500,
                  backgroundColor: w.dialColorWrapperHex || `${w.dialColorHex}33`, // custom wrapper or 20% opacity
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
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
  paddingBottom: 0,
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

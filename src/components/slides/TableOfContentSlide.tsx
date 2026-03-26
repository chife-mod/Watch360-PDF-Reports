import { SlideFrame } from '../ui/SlideFrame'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'

export interface TocItem {
  /** Номер страницы (01, 02…) */
  page: string
  /** Название раздела */
  title: string
  /** ID слайда для навигации (slide-0, slide-1…) */
  slideId?: string
}

interface Props {
  items: TocItem[]
  footerRight?: string
}

/**
 * TableOfContentSlide — оглавление отчёта.
 *
 * Figma node: 33:1370
 * Layout:
 *   - Title: "Table of Content" (32px, top-left)
 *   - TOC items: номер + пунктирная линия + название
 *   - Standard Header + Footer
 */
export function TableOfContentSlide({ items, footerRight = 'www.watch360.ai' }: Props) {
  // Pad items to 8 if needed so the grid structure looks complete
  const tiles = [...items]
  
  return (
    <SlideFrame>
      <Header />
      <Footer right={footerRight} rightUrl={footerRight ? `https://${footerRight}` : undefined} />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 32,
          fontFamily: 'Inter, sans-serif',
          fontSize: 32,
          fontWeight: 400,
          color: '#FFFFFF',
          lineHeight: 1,
        }}
      >
        Table of Content
      </div>

      {/* Grid of tiles (4 columns x 2 rows max) */}
      <div
        style={{
          position: 'absolute',
          top: 99,
          left: 32,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 161px)',
          gridAutoRows: '132px',
          gap: 4,
          width: 656,
        }}
      >
        {tiles.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              if (!item.slideId) return
              const el = document.getElementById(item.slideId)
              el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 4,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              cursor: item.slideId ? 'pointer' : 'default',
              transition: 'background 0.15s',
            }}
          >
            {/* Big transparent number */}
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 44,
                fontWeight: 400,
                color: '#FFFFFF',
                opacity: 0.20,
                lineHeight: 1,
              }}
            >
              {item.page}
            </span>

            {/* Title */}
            <div style={{ paddingRight: 29 }}>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 10,
                  fontWeight: 400,
                  color: '#FFFFFF',
                  lineHeight: 1.5,
                  display: 'block',
                }}
              >
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  )
}

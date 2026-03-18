import coverGraphic from '../../../assets/logos/cover-graphic.png'
import { Footer } from '../ui/Footer'
import { Header } from '../ui/Header'
import { SlideFrame } from '../ui/SlideFrame'

export interface CoverSlideProps {
  /** Заголовок отчёта. Пример: "Watch Media", "Luxury Watches" */
  title: string
  /** Период отчёта. Пример: "Dec 2025 - Feb 2026" */
  period: string
  /** Правая строка футера. Пример: "www.watch360.ai" */
  website?: string
}

/**
 * CoverSlide — обложка отчёта Watch 360.
 *
 * Структура (720×450px):
 *   - Header: логотипы top-right
 *   - Cover graphic: абстрактная иллюстрация (top: 72, h: 242, full width)
 *   - Title: 48px, left: 32, top: 340
 *   - Footer: период слева + сайт справа, top: 408
 *
 * Figma: node 4-802, file V8XA0PVaAjxvPbq24stJXk
 */
export function CoverSlide({
  title,
  period,
  website = 'www.watch360.ai',
}: CoverSlideProps) {
  return (
    <SlideFrame>
      <Header />

      {/* Абстрактная иллюстрация — по всей ширине, фиксированная высота */}
      <img
        src={coverGraphic}
        alt=""
        style={{
          position: 'absolute',
          top: 72,
          left: 0,
          width: 720,
          height: 242,
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Заголовок отчёта */}
      <h1
        style={{
          position: 'absolute',
          top: 340,
          left: 32,
          margin: 0,
          fontFamily: 'Inter, sans-serif',
          fontSize: 48,
          fontWeight: 400,
          color: 'white',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </h1>

      <Footer period={period} right={website} />
    </SlideFrame>
  )
}

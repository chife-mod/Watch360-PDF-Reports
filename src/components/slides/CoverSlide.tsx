const coverImage = '/images/Cover_Image.webp'
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
  /** URL для кликабельной ссылки в футере. Пример: "https://watch360.ai" */
  websiteUrl?: string
}

/**
 * CoverSlide — обложка отчёта Watch 360.
 *
 * Структура (720×450px):
 *   - Header: единый логотип Watch360 top-right (top: 25, right: 32)
 *   - Cover image: абстрактная иллюстрация (top: 72, h: 242, full width)
 *   - Title: 48px Inter Regular, left: 32, top: calc(50% + 115px) ≈ 340
 *   - Footer: период слева (left: 35, top: calc(50%+183px) ≈ 408) + сайт справа (50% opacity)
 *
 * Figma: node 4-802, file V8XA0PVaAjxvPbq24stJXk
 */
export function CoverSlide({
  title,
  period,
  website = 'www.watch360.ai',
  websiteUrl = 'https://watch360.ai',
}: CoverSlideProps) {
  return (
    <SlideFrame>
      <Header />

      {/* Абстрактная иллюстрация — по всей ширине, фиксированная высота */}
      <img
        src={coverImage}
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

      <Footer period={period} right={website} rightUrl={websiteUrl} />
    </SlideFrame>
  )
}

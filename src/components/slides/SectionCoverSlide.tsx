import coverImage from '../../../assets/images/Cover_Image.webp'
import { Header } from '../ui/Header'
import { SlideFrame } from '../ui/SlideFrame'
import { Footer } from '../ui/Footer'

export interface SectionCoverSlideProps {
  /** Первая строка заголовка. Пример: "Shaping Visibility" */
  titleLine1: string
  /** Вторая строка заголовка. Пример: "in the Age of AI" */
  titleLine2: string
  /** Категория. Пример: "Watch Media" */
  category?: string
  /** Период. Пример: "Dec 2025 - Feb 2026" */
  period?: string
  /** Правый футер — сайт. Пример: "www.watch360.ai" */
  website?: string
  /** URL для кликабельной ссылки. Пример: "https://watch360.ai" */
  websiteUrl?: string
}

/**
 * SectionCoverSlide — слайд-раздел внутри отчёта.
 *
 * Структура (720×450px):
 *   - Header: логотип Watch360 top-right (top: 25, right: 32)
 *   - Cover image: абстрактная иллюстрация (top: 72, h: 242, full width)
 *   - Title: 25px Inter Regular, две строки, left: 32, top: calc(50%+111px) = 336
 *   - Footer left: "Category: Period", 10px, opacity 50% (серый)
 *   - Footer right: website, 10px, opacity 50%
 *
 * Figma: node 30-4507, file V8XA0PVaAjxvPbq24stJXk
 */
export function SectionCoverSlide({
  titleLine1,
  titleLine2,
  category,
  period,
  website = 'www.watch360.ai',
  websiteUrl = 'https://watch360.ai',
}: SectionCoverSlideProps) {
  const footerLeft =
    category && period
      ? `${category}: ${period}`
      : category || period || undefined

  return (
    <SlideFrame>
      <Header />

      {/* Иллюстрация — по всей ширине, фиксированная высота */}
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

      {/* Заголовок — 25px, две строки, top: 336 */}
      <h1
        style={{
          position: 'absolute',
          top: 336,
          left: 32,
          margin: 0,
          fontFamily: 'Inter, sans-serif',
          fontSize: 25,
          fontWeight: 400,
          color: 'white',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {titleLine1}
        <br />
        {titleLine2}
      </h1>

      {/* Footer left — серый (50% opacity) */}
      {footerLeft && (
        <span
          style={{
            position: 'absolute',
            top: 408,
            left: 35,
            fontFamily: 'Inter, sans-serif',
            fontSize: 10,
            fontWeight: 400,
            color: 'white',
            opacity: 0.5,
            whiteSpace: 'nowrap',
          }}
        >
          {footerLeft}
        </span>
      )}

      {/* Footer right — website */}
      <Footer right={website} rightUrl={websiteUrl} />
    </SlideFrame>
  )
}

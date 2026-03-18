import { SlideFrame } from '../ui/SlideFrame'
import { Header } from '../ui/Header'
import quotesImg from '../../../assets/images/Quotes_Image_1.webp'

export interface QuoteSlideProps {
  /** Текст цитаты */
  quote: string
  /** Имя автора, напр. "ChatGPT" */
  author: string
  /** Описание автора, напр. "AI Model, OpenAI" */
  authorDescription: string
  /** Фоновое изображение */
  backgroundImage?: string
  /** Правый нижний угол — website */
  footerRight?: string
}

/**
 * QuoteSlide — слайд с полноразмерным фото, градиентом и цитатой справа.
 * Figma node 17:2084
 *
 * Выравнивание: "ChatGPT" и "AI Model" выровнены по левому краю
 * с www.watch360.ai внизу. Дефис "—" выступает за эту линию влево.
 */
export function QuoteSlide({
  quote,
  author,
  authorDescription,
  backgroundImage = quotesImg,
  footerRight = 'www.watch360.ai',
}: QuoteSlideProps) {
  /** Правый якорь — right: 32px, ширина текстового блока цитаты ~328px */
  const RIGHT_OFFSET = 32
  const BLOCK_WIDTH = 328

  return (
    <SlideFrame>
      {/* Background image — fills the entire slide 1:1 (image is 3x) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 720,
          height: 450,
          overflow: 'hidden',
        }}
      >
        <img
          src={backgroundImage}
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Gradient overlays — darken right side for text readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: [
              'linear-gradient(257deg, rgba(0,0,0,0.5) 11.7%, rgba(0,0,0,0.1) 47.9%)',
              'linear-gradient(-77deg, rgba(0,0,0,0.5) 35.4%, rgba(0,0,0,0.1) 69.8%)',
            ].join(', '),
          }}
        />
      </div>

      {/* Header — Watch360 logo top-right */}
      <Header />

      {/* Quote block — aligned right, anchored to right: 32px */}
      <div
        style={{
          position: 'absolute',
          top: 175,
          right: RIGHT_OFFSET,
          width: BLOCK_WIDTH,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 13,
          fontFamily: 'Inter, sans-serif',
          color: '#fff',
        }}
      >
        {/* Quote text */}
        <p
          style={{
            fontSize: 25,
            fontWeight: 400,
            lineHeight: 1,
            margin: 0,
            width: '100%',
            textIndent: '-0.45em',
          }}
        >
          {quote}
        </p>

        {/* Author — dash hangs left, author text aligns with quote left edge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8,
            lineHeight: 1.2,
            marginLeft: -20,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 400,
              whiteSpace: 'nowrap',
              width: 12,
              flexShrink: 0,
            }}
          >
            —
          </span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 400 }}>
              {author}
            </span>
            <span style={{ fontSize: 8, fontWeight: 400, opacity: 0.5 }}>
              {authorDescription}
            </span>
          </div>
        </div>
      </div>

      {/* Footer — website, right: 32px */}
      {footerRight && (
        <div
          style={{
            position: 'absolute',
            bottom: 17,
            right: RIGHT_OFFSET,
            fontFamily: 'Inter, sans-serif',
            fontSize: 10,
            fontWeight: 400,
            color: '#fff',
            opacity: 0.5,
          }}
        >
          {footerRight}
        </div>
      )}
    </SlideFrame>
  )
}

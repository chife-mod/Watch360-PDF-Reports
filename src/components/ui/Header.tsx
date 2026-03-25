import logoSvg from '../../../assets/logos/Logo_Top_No_Tagline.svg'

/**
 * Header — логотип Watch360 + подпись в правом верхнем углу каждого слайда.
 *
 * Logo SVG: иконка Watch360 + "WATCH360" (24px high)
 * Под ним: "Product of SemanticForce" (6px, lh 140%, letterSpacing 0.3px, 50% opacity)
 *
 * Figma: контейнер 112.5×31px, SVG at top:0 (24px), text at top:23px
 * Позиция: top: 25px, right: 32px
 * Figma node: 51-3322, 48:3077
 */
export function Header() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 25,
        right: 32,
        width: 113,
        height: 31,
      }}
    >
      <img
        src={logoSvg}
        alt="Watch 360"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 24,
          width: 113,
          display: 'block',
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: 23,
          left: 31,
          fontFamily: 'Inter, sans-serif',
          fontSize: 6,
          fontWeight: 400,
          color: 'white',
          opacity: 0.5,
          lineHeight: 1.4,
          letterSpacing: '0.3px',
          whiteSpace: 'nowrap',
        }}
      >
        Product of SemanticForce
      </span>
    </div>
  )
}

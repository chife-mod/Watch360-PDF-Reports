const sfLogo = '/logos/semantic-force.svg'
const w360Logo = '/logos/watch360.svg'

/**
 * Header — логотипы в правом верхнем углу каждого слайда.
 * "Powered by" · SF logo · разделитель · Watch360 logo
 * Позиция: top: 32px, right: 32px
 * Figma node: 5:1099
 */
export function Header() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 32,
        right: 32,
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        height: 16,
      }}
    >
      {/* "Powered by" */}
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 6,
          fontWeight: 400,
          color: 'white',
          opacity: 0.5,
          whiteSpace: 'nowrap',
          lineHeight: 1.4,
        }}
      >
        Powered by
      </span>

      {/* Semantic Force logo */}
      <img
        src={sfLogo}
        alt="Semantic Force"
        style={{ height: 16, width: 'auto', display: 'block' }}
      />

      {/* Разделитель — градиент серый */}
      <div
        style={{
          width: 0.375,
          height: 16,
          flexShrink: 0,
          background:
            'linear-gradient(180deg, rgba(151,151,151,0.2) 0%, rgb(151,151,151) 33.33%, rgb(151,151,151) 66.67%, rgba(151,151,151,0.2) 100%)',
        }}
      />

      {/* Watch360 logo */}
      <img
        src={w360Logo}
        alt="Watch 360"
        style={{ height: 16, width: 'auto', display: 'block' }}
      />
    </div>
  )
}

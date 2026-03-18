/**
 * Header — логотип Watch360 в правом верхнем углу каждого слайда.
 * Единый SVG: иконка Watch360 + "WATCH360" + "Powered by SemanticForce"
 * Позиция: top: 25px, right: от правого края (left: 75% + 36px по Figma)
 * Figma node: 23:2463
 */
export function Header() {
  return (
    <img
      src="/logos/Logo_Top_On_Dark.svg"
      alt="Watch 360 — Powered by Semantic Force"
      style={{
        position: 'absolute',
        top: 25,
        right: 32,
        height: 31,
        width: 'auto',
        display: 'block',
      }}
    />
  )
}

import React from 'react'

interface SlideFrameProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

/**
 * SlideFrame — базовая обёртка для всех слайдов.
 * Фиксированный размер 720×450px, bg #0D0D0D, position: relative.
 * Все дочерние элементы позиционируются абсолютно внутри.
 */
export function SlideFrame({ children, className, style }: SlideFrameProps) {
  return (
    <div
      className={className}
      style={{
        width: 720,
        height: 450,
        backgroundColor: '#0D0D0D',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

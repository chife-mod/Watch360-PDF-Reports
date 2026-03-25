import React from 'react'

interface FooterProps {
  /** Левая часть: период отчёта. Пример: "Dec 2025 - Feb 2026" */
  period?: string
  /** Правая часть: категория или сайт. Пример: "www.watch360.ai" или "Luxury Watches" */
  right?: string
  /** Если передан — правая часть становится кликабельной ссылкой. Стиль не меняется. */
  rightUrl?: string
}

/**
 * Footer — нижняя строка каждого слайда.
 * Слева: период (10px, white 100%) — опционально
 * Справа: домен/категория (10px, white 50%)
 * Позиция: bottom: 16px от нижнего края слайда
 */
export function Footer({ period, right, rightUrl }: FooterProps) {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 16,
    fontFamily: 'Inter, sans-serif',
    fontSize: 10,
    fontWeight: 400,
    color: 'white',
    whiteSpace: 'nowrap',
    lineHeight: 'normal',
    margin: 0,
  }

  const linkStyle: React.CSSProperties = {
    color: 'inherit',
    textDecoration: 'none',
  }

  return (
    <>
      {period && <span style={{ ...baseStyle, left: 35 }}>{period}</span>}
      {right && (
        <span style={{ ...baseStyle, right: 32, opacity: 0.5 }}>
          {rightUrl ? (
            <a href={rightUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              {right}
            </a>
          ) : (
            right
          )}
        </span>
      )}
    </>
  )
}

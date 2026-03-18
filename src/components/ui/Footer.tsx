import React from 'react'

interface FooterProps {
  /** Левая часть: период отчёта. Пример: "Dec 2025 - Feb 2026" */
  period?: string
  /** Правая часть: категория или ссылка. Пример: "www.watch360.ai" или "Luxury Watches" */
  right?: string
}

/**
 * Footer — нижняя строка каждого слайда.
 * Слева: период (10px, white 100%) — опционально
 * Справа: категория/сайт (10px, white 50%)
 * Позиция: top: 408px (= calc(50% + 183px) при высоте 450px)
 * Figma nodes: 5:988, 22:2429
 */
export function Footer({ period, right }: FooterProps) {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    top: 408,
    fontFamily: 'Inter, sans-serif',
    fontSize: 10,
    fontWeight: 400,
    color: 'white',
    whiteSpace: 'nowrap',
    lineHeight: 'normal',
    margin: 0,
  }

  return (
    <>
      {period && <span style={{ ...baseStyle, left: 35 }}>{period}</span>}
      {right && (
        <span style={{ ...baseStyle, right: 32, opacity: 0.5 }}>{right}</span>
      )}
    </>
  )
}

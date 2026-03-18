import React, { useEffect, useState, useCallback, useRef } from 'react'

/** Размер слайда в пикселях */
const SLIDE_W = 720
const SLIDE_H = 450

/** Отступы от краёв окна */
const PAD_X = 80
const PAD_TOP = 72  // место для тулбара
const PAD_BOTTOM = 48

interface ViewerProps {
  children: React.ReactNode[]
  onSlideChange?: (index: number) => void
}

/**
 * Viewer — полноэкранный просмотрщик слайдов.
 *
 * - Fit-to-screen: слайд масштабируется `transform: scale()` чтобы
 *   заполнить окно с отступами PAD_X по бокам
 * - Навигация: стрелки ← → или клик по краям слайда
 * - Индикатор текущего слайда (точки внизу)
 */
export function Viewer({ children, onSlideChange }: ViewerProps) {
  const slides = React.Children.toArray(children)
  const total = slides.length
  const [current, setCurrent] = useState(0)
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  /** Пересчёт масштаба при resize */
  const recalcScale = useCallback(() => {
    const availW = window.innerWidth - PAD_X * 2
    const availH = window.innerHeight - PAD_TOP - PAD_BOTTOM
    const s = Math.min(availW / SLIDE_W, availH / SLIDE_H)
    setScale(Math.min(s, 3)) // ограничиваем макс. зумом
  }, [])

  useEffect(() => {
    recalcScale()
    window.addEventListener('resize', recalcScale)
    return () => window.removeEventListener('resize', recalcScale)
  }, [recalcScale])

  /** Уведомляем родителя о смене слайда */
  useEffect(() => {
    onSlideChange?.(current)
  }, [current, onSlideChange])

  /** Навигация клавиатурой */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        setCurrent(c => Math.min(c + 1, total - 1))
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrent(c => Math.max(c - 1, 0))
      }
      if (e.key === 'Home') setCurrent(0)
      if (e.key === 'End') setCurrent(total - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Слайд-контейнер */}
      <div
        style={{
          width: SLIDE_W,
          height: SLIDE_H,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          borderRadius: 2,
          boxShadow: '0 8px 60px rgba(0,0,0,0.6)',
          flexShrink: 0,
        }}
      >
        {slides[current]}
      </div>

      {/* Пагинация (точки) — показываем только когда больше 1 слайда */}
      {total > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8,
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                borderRadius: 3,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                backgroundColor: i === current
                  ? 'rgba(255,255,255,0.9)'
                  : 'rgba(255,255,255,0.25)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Стрелки навигации — показываем только когда больше 1 слайда */}
      {total > 1 && (
        <>
          {current > 0 && (
            <button
              onClick={() => setCurrent(c => c - 1)}
              style={{
                position: 'absolute',
                left: 20,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                width: 40,
                height: 40,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                fontSize: 18,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
              }}
              aria-label="Previous slide"
            >
              ‹
            </button>
          )}
          {current < total - 1 && (
            <button
              onClick={() => setCurrent(c => c + 1)}
              style={{
                position: 'absolute',
                right: 20,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                width: 40,
                height: 40,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                fontSize: 18,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
              }}
              aria-label="Next slide"
            >
              ›
            </button>
          )}
        </>
      )}
    </div>
  )
}

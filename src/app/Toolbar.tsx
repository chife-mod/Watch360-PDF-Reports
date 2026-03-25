import { useState, useRef, useEffect } from 'react'

export interface ReportVersion {
  /** Уникальный ID версии */
  id: string
  /** Дата создания (ISO) */
  date: string
  /** Название отчёта (из title первого слайда) */
  title: string
  /** PDF файл (путь или URL) — undefined если ещё не сгенерирован */
  pdfUrl?: string
}

interface ToolbarProps {
  versions: ReportVersion[]
  selectedId: string
  onSelect: (id: string) => void
  onExportPdf: () => void
  onOpenTemplates?: () => void
  /** Текущий слайд / общее количество */
  currentSlide: number
  totalSlides: number
}

/**
 * Toolbar — верхняя панель Viewer.
 *
 * Слева:  номер слайда (01 / 03)
 * Центр:  (пусто — слайд под ним)
 * Справа: дропдаун версий + Export PDF
 */
export function Toolbar({
  versions,
  selectedId,
  onSelect,
  onExportPdf,
  onOpenTemplates,
  currentSlide,
  totalSlides,
}: ToolbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  /** Закрываем дропдаун при клике вне */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const selected = versions.find(v => v.id === selectedId)

  /** Форматируем дату: "18 Mar 2026" */
  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div
      data-print-hide
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '16px 24px',
        background: 'linear-gradient(180deg, #000 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
        pointerEvents: 'none',
      }}
    >
      {/* Левая часть: номер слайда */}
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.05em',
          pointerEvents: 'auto',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.8)' }}>
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        {' '}
        <span style={{ opacity: 0.5 }}>/</span>
        {' '}
        {String(totalSlides).padStart(2, '0')}
      </div>

      {/* Правая часть: дропдаун + Export PDF */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          pointerEvents: 'auto',
        }}
      >
        {/* Дропдаун версий */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.7)',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>
              {selected ? selected.title : 'No reports'}
            </span>
            {selected && (
              <span style={{ opacity: 0.4, fontSize: 11 }}>
                {formatDate(selected.date)}
              </span>
            )}
            {/* Chevron */}
            <svg
              width="10" height="6" viewBox="0 0 10 6" fill="none"
              style={{
                marginLeft: 2,
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            >
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isOpen && versions.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                right: 0,
                minWidth: 240,
                background: 'rgba(18,18,18,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: '6px',
                boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                zIndex: 200,
              }}
            >
              {versions.map(v => {
                const isSelected = v.id === selectedId
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      onSelect(v.id)
                      setIsOpen(false)
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '10px 12px',
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 12,
                      background: isSelected
                        ? 'rgba(255,255,255,0.08)'
                        : 'transparent',
                      color: isSelected
                        ? 'rgba(255,255,255,0.95)'
                        : 'rgba(255,255,255,0.6)',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                        e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                      }
                    }}
                  >
                    <span style={{ fontWeight: isSelected ? 500 : 400 }}>
                      {v.title}
                    </span>
                    <span style={{ opacity: 0.4, fontSize: 11, marginLeft: 16 }}>
                      {formatDate(v.date)}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Templates */}
        {onOpenTemplates && (
          <button
            onClick={onOpenTemplates}
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '8px 14px',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.7)',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            }}
          >
            Templates
          </button>
        )}

        {/* Export PDF */}
        <button
          onClick={onExportPdf}
          style={{
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            fontWeight: 500,
            color: '#000',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,1)'
            e.currentTarget.style.transform = 'scale(1.02)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.9)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          {/* Download icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.75V9.625M7 9.625L4.375 7M7 9.625L9.625 7M2.625 12.25H11.375" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Export PDF
        </button>
      </div>
    </div>
  )
}

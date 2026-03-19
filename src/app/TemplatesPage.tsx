import { useState, useEffect } from 'react'
import { SLIDE_TEMPLATES, ALL_TAGS, type SlideTag, type SlideTemplate } from './templateRegistry'

type ViewMode = 'list' | 'grid'

const SLIDE_W = 720
const SLIDE_H = 450

function calcFitScale(vw: number) {
  return Math.min((vw - 120) / SLIDE_W, 1)
}

/** Описания для list-view */
const DESCRIPTIONS: Record<string, string> = {
  'cover': 'Main report cover — title, period, illustration',
  'section-cover': 'Section divider — subtitle, category, illustration',
  'table': 'Top Sources table — 10 rows, insights panel, occurrence bars',
  'watch-models': 'Watch model cards — image, specs, metrics',
  'quote': 'Full-bleed quote — photo background, attribution',
}

export function TemplatesPage({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<ViewMode>('grid')
  const [activeTag, setActiveTag] = useState<SlideTag>('All')
  const [listScale, setListScale] = useState(() => calcFitScale(window.innerWidth))

  useEffect(() => {
    const onResize = () => setListScale(calcFitScale(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const filtered =
    activeTag === 'All'
      ? SLIDE_TEMPLATES
      : SLIDE_TEMPLATES.filter(t => t.tags.includes(activeTag))

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: 'white' }}>
      {/* ── Top bar ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            fontSize: 13,
            fontFamily: 'Inter, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 0',
          }}
        >
          ← Back to Report
        </button>

        <div style={{ flex: 1 }} />

        {/* Title */}
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          Templates
        </span>

        {/* View toggle */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 8,
            padding: 2,
          }}
        >
          {(['list', 'grid'] as ViewMode[]).map(m => (
            <button
              key={m}
              onClick={() => setView(m)}
              style={{
                background: view === m ? 'rgba(255,255,255,0.12)' : 'transparent',
                border: 'none',
                color: view === m ? 'white' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                padding: '6px 14px',
                borderRadius: 6,
                fontSize: 12,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                transition: 'all 0.15s',
              }}
            >
              {m === 'list' ? 'List' : 'Grid'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tag filters (grid view only) ── */}
      {view === 'grid' && (
        <div
          style={{
            display: 'flex',
            gap: 8,
            padding: '20px 32px 0',
            flexWrap: 'wrap',
          }}
        >
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                background:
                  activeTag === tag
                    ? 'rgba(255,255,255,0.12)'
                    : 'rgba(255,255,255,0.04)',
                border:
                  activeTag === tag
                    ? '1px solid rgba(255,255,255,0.2)'
                    : '1px solid rgba(255,255,255,0.06)',
                color: activeTag === tag ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                padding: '6px 16px',
                borderRadius: 20,
                fontSize: 12,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                transition: 'all 0.15s',
              }}
            >
              {tag}
            </button>
          ))}
          <span
            style={{
              marginLeft: 'auto',
              fontSize: 12,
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(255,255,255,0.3)',
              alignSelf: 'center',
            }}
          >
            {filtered.length} template{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* ── Content ── */}
      {view === 'grid' ? (
        <GridView templates={filtered} />
      ) : (
        <ListView templates={SLIDE_TEMPLATES} scale={listScale} />
      )}
    </div>
  )
}

/* ────────────────────────────  Grid View  ──────────────────────────── */

function GridView({ templates }: { templates: SlideTemplate[] }) {
  const thumbScale = 0.38

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: 24,
        padding: '24px 32px 80px',
      }}
    >
      {templates.map(t => (
        <div
          key={t.id}
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
            transition: 'border-color 0.2s, transform 0.2s',
            cursor: 'default',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {/* Preview */}
          <div
            style={{
              width: '100%',
              aspectRatio: `${SLIDE_W} / ${SLIDE_H}`,
              overflow: 'hidden',
              position: 'relative',
              background: '#0D0D0D',
            }}
          >
            <div
              style={{
                width: SLIDE_W,
                height: SLIDE_H,
                transform: `scale(${thumbScale})`,
                transformOrigin: 'top left',
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
              }}
            >
              {t.element}
            </div>
          </div>

          {/* Info */}
          <div style={{ padding: '14px 16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'white',
                }}
              >
                {t.name}
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                {t.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: 10,
                      padding: '2px 8px',
                      fontSize: 10,
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {DESCRIPTIONS[t.id] && (
              <p
                style={{
                  margin: '6px 0 0',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.35)',
                  lineHeight: 1.4,
                }}
              >
                {DESCRIPTIONS[t.id]}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ────────────────────────────  List View  ──────────────────────────── */

function ListView({
  templates,
  scale,
}: {
  templates: SlideTemplate[]
  scale: number
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 40,
        padding: '40px 0 80px',
      }}
    >
      {templates.map((t, i) => (
        <div key={t.id} style={{ position: 'relative' }}>
          {/* Tag badge */}
          <div
            style={{
              position: 'absolute',
              top: -12,
              left: 0,
              display: 'flex',
              gap: 6,
              alignItems: 'center',
              zIndex: 1,
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              {t.name}
            </span>
            {t.tags.map(tag => (
              <span
                key={tag}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 10,
                  padding: '2px 8px',
                  fontSize: 10,
                  fontFamily: 'Inter, sans-serif',
                  color: 'rgba(255,255,255,0.35)',
                }}
              >
                {tag}
              </span>
            ))}
            {DESCRIPTIONS[t.id] && (
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.2)',
                  marginLeft: 4,
                }}
              >
                — {DESCRIPTIONS[t.id]}
              </span>
            )}
          </div>

          {/* Slide render */}
          <div
            style={{
              width: SLIDE_W * scale,
              height: SLIDE_H * scale,
              overflow: 'hidden',
              borderRadius: 4,
            }}
          >
            <div
              style={{
                width: SLIDE_W,
                height: SLIDE_H,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                pointerEvents: 'none',
              }}
            >
              {t.element}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

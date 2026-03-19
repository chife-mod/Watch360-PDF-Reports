import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'
import { SlideFrame } from '../ui/SlideFrame'
import { getCategoryColor } from '../../theme/categories'
import tablerBulb from '../../../assets/icons/tabler_bulb.svg'

/** Максимальное occurrence для расчёта ширины бара */
const MAX_OCCURRENCE = 100

export interface TableRow {
  rank: number
  domain: string
  type: string
  occurrence: number
}

export interface InsightItem {
  text: string
}

export interface TableSlideProps {
  /** Заголовок — в одну строку: первое слово teal, второе белое. Пример: ["Top Sources ", "Used by AI"] */
  titleLines: [string, string]
  /** Описание справа от заголовка */
  subtitle?: string
  /** Строки таблицы */
  rows: TableRow[]
  /** Пункты Insights */
  insights: InsightItem[]
  /** Период отчёта */
  period?: string
  /** Правая часть футера */
  footerRight?: string
  /** URL для кликабельной ссылки в футере. Пример: "https://watch360.ai" */
  footerRightUrl?: string
}

/**
 * TableSlide — слайд "Top Sources Used by AI"
 *
 * Layout (720×450px):
 *   Left column (437px):
 *     - Title: 32px, одна строка inline (первая часть teal, вторая white), top: 24, left: 32
 *     - Table: Rank | Domain | Type (dot + label) | Occurrence (number + bar), top: 88
 *   Right column (183px):
 *     - Subtitle: описание, 10px, 50% opacity, top: 104
 *     - Insights: иконка bulb + нумерованный список
 *   Header: логотип top-right
 *   Footer: период + сайт
 *
 * Figma: node 2-6, file V8XA0PVaAjxvPbq24stJXk
 */
export function TableSlide({
  titleLines,
  subtitle,
  rows,
  insights,
  period,
  footerRight = 'www.watch360.ai',
  footerRightUrl = 'https://watch360.ai',
}: TableSlideProps) {
  return (
    <SlideFrame>
      <Header />

      {/* ── Title (left, top: 24) ── */}
      <p
        style={{
          position: 'absolute',
          top: 24,
          left: 32,
          width: 437,
          margin: 0,
          fontFamily: 'Inter, sans-serif',
          fontSize: 32,
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        <span style={{ color: '#00C3D9' }}>{titleLines[0]}</span>
        <span style={{ color: 'white' }}>{titleLines[1]}</span>
      </p>

      {/* ── Subtitle (right column, top: 104) ── */}
      {subtitle && (
        <p
          style={{
            position: 'absolute',
            top: 104,
            left: 505,
            width: 183,
            margin: 0,
            fontFamily: 'Inter, sans-serif',
            fontSize: 10,
            fontWeight: 400,
            lineHeight: 1.5,
            color: 'white',
            opacity: 0.5,
          }}
        >
          {subtitle}
        </p>
      )}

      {/* ── Table (left: 32, top: 88, width: 437) ── */}
      <div
        style={{
          position: 'absolute',
          top: 88,
          left: 32,
          width: 437,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Table Header */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ ...headerCellStyle, width: 39 }}>Rank</div>
          <div style={{ ...headerCellStyle, width: 160 }}>Domain</div>
          <div style={{ ...headerCellStyle, width: 129 }}>Type</div>
          <div style={{ ...headerCellStyle, flex: 1 }}>Occurrence</div>
        </div>

        {/* Table Rows */}
        {rows.map((row, i) => {
          const cat = getCategoryColor(row.type)
          const isFirst = i === 0
          const barWidth = Math.max(4, (row.occurrence / MAX_OCCURRENCE) * 100)

          return (
            <div
              key={row.rank}
              style={{
                display: 'flex',
                alignItems: 'center',
                borderTop: '0.5px solid rgba(255,255,255,0.15)',
              }}
            >
              {/* Rank */}
              <div style={{ ...cellStyle, width: 39 }}>
                <span
                  style={{
                    fontWeight: isFirst ? 700 : 400,
                    color: isFirst ? '#00C3D9' : 'white',
                    opacity: isFirst ? 1 : 0.5,
                  }}
                >
                  {row.rank}
                </span>
              </div>

              {/* Domain */}
              <div style={{ ...cellStyle, width: 160 }}>
                <span style={{ color: 'white' }}>{row.domain}</span>
              </div>

              {/* Type badge */}
              <div style={{ ...cellStyle, width: 129 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 6 }}>
                  {/* Dot with glow */}
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 500,
                      backgroundColor: cat.muted,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 500,
                        backgroundColor: cat.solid,
                      }}
                    />
                  </div>
                  <span style={{ color: 'white', opacity: 0.5, whiteSpace: 'nowrap' }}>
                    {row.type}
                  </span>
                </div>
              </div>

              {/* Occurrence: number + bar */}
              <div
                style={{
                  ...cellStyle,
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span style={{ color: 'white', width: 21, flexShrink: 0 }}>
                  {row.occurrence}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 500,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${barWidth}%`,
                      height: '100%',
                      borderRadius: 500,
                      backgroundColor: cat.solid,
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Insights (right column) ── */}
      <div
        style={{
          position: 'absolute',
          top: 263,
          left: 505,
          width: 183,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Insight header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <img
            src={tablerBulb}
            alt=""
            style={{ width: 16, height: 16, display: 'block' }}
          />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 7,
              fontWeight: 400,
              color: 'white',
              opacity: 0.5,
              textTransform: 'uppercase',
              letterSpacing: '0.14px',
              whiteSpace: 'nowrap',
            }}
          >
            Insight
          </span>
        </div>

        {/* Insight items */}
        {insights.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 6 }}>
            {/* Number */}
            <div
              style={{
                width: 13,
                flexShrink: 0,
                paddingTop: 4,
                fontFamily: 'Inter, sans-serif',
                fontSize: 7,
                fontWeight: 400,
                color: 'white',
                opacity: 0.5,
                lineHeight: 'normal',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            {/* Text */}
            <div
              style={{
                width: 164,
                fontFamily: 'Inter, sans-serif',
                fontSize: 10,
                fontWeight: 400,
                color: 'white',
                lineHeight: 1.5,
              }}
            >
              {item.text}
            </div>
          </div>
        ))}
      </div>

      <Footer period={period} right={footerRight} rightUrl={footerRightUrl} />
    </SlideFrame>
  )
}

/** Стиль ячейки заголовка таблицы */
const headerCellStyle: React.CSSProperties = {
  paddingBottom: 8,
  fontFamily: 'Inter, sans-serif',
  fontSize: 7,
  fontWeight: 400,
  color: 'white',
  opacity: 0.5,
  textTransform: 'uppercase',
  letterSpacing: '0.14px',
  lineHeight: 1.5,
  whiteSpace: 'nowrap',
}

/** Стиль обычной ячейки таблицы */
const cellStyle: React.CSSProperties = {
  padding: '8px 0',
  fontFamily: 'Inter, sans-serif',
  fontSize: 10,
  fontWeight: 400,
  lineHeight: 1.5,
}

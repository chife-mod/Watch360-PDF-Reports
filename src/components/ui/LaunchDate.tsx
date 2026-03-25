/**
 * LaunchDate — единый компонент для отображения даты запуска модели.
 *
 * Канонический формат отображения: LAUNCH • Dec, 2025
 *   - «LAUNCH» — капсом, 50% прозрачность
 *   - «•» — разделитель, 2×2px круглая точка, 50% прозрачность
 *   - Название месяца — 3-буквенное сокращение с заглавной буквы (Jan, Feb, Mar…)
 *   - Запятая и год — без изменений
 *
 * Входная строка launchDate может быть в любом формате: "Dec, 2025", "Jan 2026",
 * "Feb, 2026" и т.д. Компонент нормализует её к каноническому виду.
 *
 * Дизайн-система: typography 7px / Inter / opacity 0.5 / lineHeight 1
 */
export function LaunchDate({ date }: { date: string }) {
  // Normalize: extract month and year regardless of input format
  const normalized = normalizeDate(date)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 7,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          lineHeight: 1,
          letterSpacing: 0.14,
        }}
      >
        Launch
      </span>
      <div
        style={{
          width: 2,
          height: 2,
          borderRadius: 500,
          backgroundColor: 'rgba(255,255,255,0.5)',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 7,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1,
          letterSpacing: 0.14,
        }}
      >
        {normalized}
      </span>
    </div>
  )
}

/**
 * Normalize launchDate string to canonical "MMM, YYYY" format.
 * Handles formats like: "Dec, 2025", "DEC, 2025", "Jan 2026", "JANUARY 2026", etc.
 */
function normalizeDate(raw: string): string {
  const months: Record<string, string> = {
    january: 'Jan', february: 'Feb', march: 'Mar', april: 'Apr',
    may: 'May', june: 'Jun', july: 'Jul', august: 'Aug',
    september: 'Sep', october: 'Oct', november: 'Nov', december: 'Dec',
    jan: 'Jan', feb: 'Feb', mar: 'Mar', apr: 'Apr',
    jun: 'Jun', jul: 'Jul', aug: 'Aug', sep: 'Sep',
    oct: 'Oct', nov: 'Nov', dec: 'Dec',
  }

  // Strip any leading "LAUNCH" prefix (case-insensitive)
  const cleaned = raw.replace(/^launch\s*/i, '').trim()

  // Match month name + optional comma + year
  const match = cleaned.match(/([a-zA-Z]+)[,\s]+(\d{4})/)
  if (match) {
    const monthKey = match[1].toLowerCase()
    const year = match[2]
    const monthShort = months[monthKey] ?? match[1].charAt(0).toUpperCase() + match[1].slice(1, 3).toLowerCase()
    return `${monthShort}, ${year}`
  }

  return cleaned
}

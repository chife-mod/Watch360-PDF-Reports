import coverImage from '../../../assets/images/Cover_Image.webp'
import sacetLogo from '../../../assets/logos/sacet-logo 1.svg'
import sfLogo from '../../../assets/logos/SF Logo.svg'
import { SlideFrame } from '../ui/SlideFrame'

export interface CoverWeeklyPulseProps {
  /** Заголовок отчёта. Default: "Weekly Pulse" */
  title?: string
  /** Период. Default: "Apr 20, 2026 - Apr 26, 2026" */
  period?: string
  /** Домен в правом нижнем. Default: "www.semanticforce.ai" */
  website?: string
}

/**
 * CoverWeeklyPulse — обновлённая обложка (Figma node 160:3144).
 *
 * Layout (720×450):
 *   - Sacet logo placeholder (текст) — top-left   (32, 24)
 *   - SemanticForce combo (текст + sign mark) — top-right (29)
 *   - Cover image (без изменений) — top: 72, h: 242
 *   - Title 40px Inter Regular — left: 32, top: 348
 *   - Period 10px — left: 35, top: 422
 *   - Domain 10px 50% — right: 32, top: 422
 *
 * SVG-шки логотипов клиента и нового SF wordmark — placeholder до получения
 * экспорта из Figma. После замены — visually 1:1.
 */
export function CoverWeeklyPulse({
  title = 'Weekly Pulse',
  period = 'Apr 20, 2026 - Apr 26, 2026',
  website = 'www.semanticforce.ai',
}: CoverWeeklyPulseProps) {
  return (
    <SlideFrame>
      {/* Sacet logo (SVG) — top-left, 32×24 from Figma 32, 24, 69.3×24 */}
      <img
        src={sacetLogo}
        alt="Sacet"
        style={{
          position: 'absolute',
          top: 24,
          left: 32,
          height: 24,
          width: 'auto',
          display: 'block',
        }}
      />

      {/* SemanticForce combo (SVG) — top-right, 568, 29, 119.9×24 */}
      <img
        src={sfLogo}
        alt="SemanticForce"
        style={{
          position: 'absolute',
          top: 29,
          right: 32,
          height: 24,
          width: 'auto',
          display: 'block',
        }}
      />

      {/* Cover image (unchanged) */}
      <img
        src={coverImage}
        alt=""
        style={{
          position: 'absolute',
          top: 72,
          left: 0,
          width: 720,
          height: 242,
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Title */}
      <h1
        style={{
          position: 'absolute',
          top: 348,
          left: 32,
          margin: 0,
          fontFamily: 'Inter, sans-serif',
          fontSize: 40,
          fontWeight: 400,
          color: 'white',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </h1>

      {/* Period — bottom-left */}
      <span
        style={{
          position: 'absolute',
          top: 422,
          left: 35,
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          fontWeight: 400,
          color: 'white',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        }}
      >
        {period}
      </span>

      {/* Domain — bottom-right */}
      <a
        href={`https://${website}`}
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'absolute',
          top: 422,
          right: 32,
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          fontWeight: 400,
          color: 'white',
          opacity: 0.5,
          textDecoration: 'none',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        }}
      >
        {website}
      </a>
    </SlideFrame>
  )
}

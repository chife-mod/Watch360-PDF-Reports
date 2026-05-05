/**
 * Report Registry — все доступные отчёты.
 *
 * Каждый отчёт = файл в src/reports/ с SLIDES и REPORT_META,
 * или legacy набор слайдов из templateRegistry.
 * Первый в массиве = по умолчанию выбран в дропдауне.
 */
import type { ReportVersion } from '../app/Toolbar'
import { REPORT_SLIDES } from '../app/templateRegistry'

import * as feb2026 from './feb-2026'
import * as weeklyPulseDraft from './weekly-pulse-draft'
import * as sandbox from './sandbox'

export interface ReportDefinition {
  meta: ReportVersion
  slides: { id: string; element: React.ReactElement }[]
}

export const REPORTS: ReportDefinition[] = [
  // ── Weekly Pulse (DRAFT) — текущий драфт, по умолчанию ──
  {
    meta: {
      id: weeklyPulseDraft.REPORT_META.id,
      title: weeklyPulseDraft.REPORT_META.title,
      date: weeklyPulseDraft.REPORT_META.date,
    },
    slides: weeklyPulseDraft.SLIDES,
  },
  // ── Sandbox — отвергнутые/экспериментальные варианты ──
  {
    meta: {
      id: sandbox.REPORT_META.id,
      title: sandbox.REPORT_META.title,
      date: sandbox.REPORT_META.date,
    },
    slides: sandbox.SLIDES,
  },
  // ── Watch Media — Feb 2026 (без изменений) ──
  {
    meta: {
      id: feb2026.REPORT_META.id,
      title: feb2026.REPORT_META.title,
      date: feb2026.REPORT_META.date,
    },
    slides: feb2026.SLIDES,
  },
  // ── Legacy: утверждённые темплейты (v1) ──
  {
    meta: {
      id: 'legacy-templates',
      title: 'Templates v1',
      date: '2026-03-18',
    },
    slides: REPORT_SLIDES,
  },
]

/** Список версий для Toolbar dropdown */
export const REPORT_VERSIONS: ReportVersion[] = REPORTS.map(r => r.meta)

/** Найти отчёт по ID */
export function getReport(id: string): ReportDefinition | undefined {
  return REPORTS.find(r => r.meta.id === id)
}

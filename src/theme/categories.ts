/**
 * Category Colors — цветовая идентификация типов источников.
 *
 * Используются во всех компонентах: таблицы, чарты, бейджи, легенды.
 * Чтобы изменить цвет категории глобально — поменяй здесь.
 *
 * Каждая категория имеет:
 *   - `solid`  — основной цвет (для текста, точек, баров)
 *   - `muted`  — приглушённый фон (20% opacity, для бейджей и подложек)
 *
 * Figma reference: node 15-1863 (Legend)
 */

export interface CategoryColor {
  solid: string
  muted: string
}

export const categoryColors: Record<string, CategoryColor> = {
  'Watch Media': {
    solid: '#3DE0B8',
    muted: 'rgba(61, 224, 184, 0.2)',
  },
  'Blog': {
    solid: '#6BA4F7',
    muted: 'rgba(107, 164, 247, 0.2)',
  },
  'Marketplace': {
    solid: '#F0A543',
    muted: 'rgba(240, 165, 67, 0.2)',
  },
  'Forum': {
    solid: '#E06B3D',
    muted: 'rgba(224, 107, 61, 0.2)',
  },
  'News': {
    solid: '#C77DFF',
    muted: 'rgba(199, 125, 255, 0.2)',
  },
  'Social': {
    solid: '#FF6B9D',
    muted: 'rgba(255, 107, 157, 0.2)',
  },
  'Manufacturer': {
    solid: '#5CC8F7',
    muted: 'rgba(92, 200, 247, 0.2)',
  },
} as const

/** Fallback цвет для неизвестных категорий */
export const DEFAULT_CATEGORY_COLOR: CategoryColor = {
  solid: '#808080',
  muted: 'rgba(128, 128, 128, 0.2)',
}

/**
 * Получить цвет категории. Безопасный хелпер — если категория
 * не найдена, возвращает серый fallback.
 */
export function getCategoryColor(type: string): CategoryColor {
  return categoryColors[type] || DEFAULT_CATEGORY_COLOR
}

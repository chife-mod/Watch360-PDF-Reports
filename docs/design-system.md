# Watch 360 — Design System

> Единый источник всех визуальных токенов.
> Файлы: `src/theme/colors.ts`, `src/theme/categories.ts`, `src/theme/typography.ts`

---

## Цвета

### Фоны

| Токен | Значение | Использование |
|-------|----------|--------------|
| `colors.bg` | `#0D0D0D` | Фон всех слайдов |
| `colors.appBg` | `#000000` | Фон web-viewer |
| `colors.surface` | `#1a1a1a` | Карточки / компоненты (будущее) |

### Текст

| Токен | Значение | Использование |
|-------|----------|--------------|
| `colors.text.primary` | `#FFFFFF` | Основной текст |
| `colors.text.secondary` | `rgba(255,255,255,0.5)` | Вспомогательный (50% opacity) |

### Акцент

| Токен | Значение | Использование |
|-------|----------|--------------|
| `colors.accent.teal` | `#00C3D9` | Заголовки, выделение #1 в рейтинге |

### Граница

| Токен | Значение | Использование |
|-------|----------|--------------|
| `colors.border` | `#808080` | `border-bottom` на table header |

---

## Category Colors (цветовая идентификация)

**Файл:** `src/theme/categories.ts`

Каждая категория имеет два оттенка:
- `solid` — для текста, точек, баров
- `muted` — для подложек (20% opacity)

| Категория | Solid | Muted | Figma ref |
|-----------|-------|-------|-----------|
| Watch Media | `#3DE0B8` | `rgba(61,224,184,0.2)` | ✅ |
| Blog | `#6BA4F7` | `rgba(107,164,247,0.2)` | ✅ |
| Marketplace | `#F0A543` | `rgba(240,165,67,0.2)` | ✅ |
| Forum | `#E06B3D` | `rgba(224,107,61,0.2)` | — |
| News | `#C77DFF` | `rgba(199,125,255,0.2)` | — |
| Social | `#FF6B9D` | `rgba(255,107,157,0.2)` | — |
| Manufacturer | `#5CC8F7` | `rgba(92,200,247,0.2)` | — |

### Использование в коде

```tsx
import { getCategoryColor } from '../../theme/categories'

const cat = getCategoryColor('Watch Media')
// cat.solid → '#3DE0B8'
// cat.muted → 'rgba(61, 224, 184, 0.2)'

// Неизвестная категория → серый fallback
const unknown = getCategoryColor('Unknown Type')
// unknown.solid → '#808080'
```

---

## Типографика

**Шрифт:** Inter (все начертания)

| Роль | Размер | Вес | Opacity |
|------|--------|-----|---------|
| Slide title (H1) | 40–48px | 400 | 100% |
| Slide subtitle | 10px | 400 | 50% |
| Table header | 7px | 400 | 50%, uppercase, tracking 0.14px |
| Body / insights | 10px | 400 | 100% |
| Numbering (01, 02…) | 7px | 400 | 50% |
| Footer | 10px | 400 | 100% / 50% |
| "Powered by" | 6px | 400 | 50% |

---

## Правила стиля

1. **Не использовать:** glassmorphism, card shadows, border-radius на карточках, градиенты на тексте
2. **Иерархия** = font-size + opacity. Не добавлять цветовое разнообразие
3. **Максимум whitespace**
4. **Таблицы:** только `border-top: 0.5px solid rgba(255,255,255,0.15)` между строками, заголовок без рамки
5. **Бейджи типов:** dot (5px solid + 9px muted background) + label (50% opacity)
6. **Occurrence bars:** высота 4px, скругление 500px, фон `rgba(255,255,255,0.1)`, заполнение — цвет категории

---

## Слайд-фрейм

| Параметр | Значение |
|----------|----------|
| Размер | 720 × 450 px |
| Фон | `#0D0D0D` |
| Header | top-right, логотип `Logo_Top_On_Dark.svg` |
| Footer (обложка) | left: период, right: сайт (50%) |
| Footer (слайды) | right: сайт (50%), без даты |

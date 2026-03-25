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
4. **Таблицы:** только `border-top: 0.5px solid rgba(255,255,255,0.15)` между строками; заголовок — `border-bottom: 1px solid rgba(255,255,255,0.3)`, `paddingBottom: 6`, `alignItems: 'flex-end'`. Первая строка данных НЕ имеет `borderTop` (чтобы не дублировать линию заголовка). Этот стандарт применяется во **всех** слайдах с таблицами без исключения.
5. **Теги (бейджи) брендов:** текст всегда `#FFFFFF`, фон `rgba(255,255,255,0.12)`.  
6. **Выравнивание в таблицах:** Крайний правый столбец (Dial Color) — `flex: 1` + `justifyContent: 'flex-end'`. Все остальные колонки — левое выравнивание. Все ячейки используют `boxSizing: 'border-box'`.
7. **Bar Chart с числами:** Порядок строго `[Бар-чарт] -> [Число]`. Число размещается справа от чарта с выключкой по правому краю и НЕ меняет цвет (только для топ-1 `colors.accent.teal`). Высота бара 3px, скругление 500px, фон `rgba(255,255,255,0.08)`.
8. **Rank #1 highlight (обязательно для всех таблиц с рангами):**
   - Ранг: `fontWeight: 700`, `color: colors.accent.teal`, `opacity: 1`
   - Название (source / brand / etc.): `color: colors.accent.teal`
   - Числовое значение (articles qty): `color: colors.accent.teal`
   - Бар-чарт: `background: colors.accent.teal`
   - Остальные строки: ранг `opacity: 0.5`, текст `#FFFFFF`, бар `rgba(255,255,255,0.75)`
9. **Дата запуска модели (LaunchDate):** ВСЕГДА использовать компонент `src/components/ui/LaunchDate.tsx`. Канонический формат: `Launch • Dec, 2025`
   - «Launch» — с заглавной буквы, `textTransform: 'uppercase'`, 50% opacity, 7px, tracking 0.14px
   - «•» — круглая точка 2×2px, 50% opacity, gap 4px слева и справа
   - Дата: 3-буквенный месяц с заглавной (Jan, Feb…), запятая, год. НЕ капс.
   - Компонент автоматически нормализует входящую строку из любого формата.
10. **Отступ от заголовка до таблицы:** Строго **24px** от baseline заголовка (fontSize 32, lineHeight 1) до верхнего края блока с таблицей. В абсолютных координатах: title `top: 24`, table `top: 80` (`spacing.tableHeaderTop`). Применяется ко всем табличным слайдам без исключения.

---

## Слайд-фрейм

| Параметр | Значение |
|----------|----------|
| Размер | 720 × 450 px |
| Фон | `#0D0D0D` |
| Header | top-right, логотип `Logo_Top_On_Dark.svg` |
| Footer (обложка) | left: период, right: сайт (50%) |
| Footer (слайды) | right: сайт (50%), без даты |

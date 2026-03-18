# TableSlide — Top Sources + Insights

## Файл

`src/components/slides/TableSlide.tsx`

## Figma

- **Node:** `2-6`
- **File:** `V8XA0PVaAjxvPbq24stJXk`
- **Legend (цвета):** node `15-1863`

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│                                        [Watch360 Logo]  top-right │
│                                                              │
│  Top Sources (teal, 40px)        Subtitle (10px, 50%)        │
│  Used by AI  (white, 40px)       183px wide                  │
│                                                              │
│  ┌──────────────────────────┐                                │
│  │ RANK  DOMAIN  TYPE  OCC  │    💡 INSIGHT                  │
│  │─────────────────────────-│                                │
│  │ 1  domain.com  ● Type  87│    01  Text...                 │
│  │ 2  domain.com  ● Type  76│                                │
│  │ ...                      │    02  Text...                 │
│  └──────────────────────────┘                                │
│                                        www.watch360.ai  50%  │
└─────────────────────────────────────────────────────────────┘
         437px (table)                    183px (insights)
```

## Props

| Prop | Тип | Обязательный | Описание |
|------|-----|-------------|----------|
| `titleLines` | `[string, string]` | ✅ | Две строки заголовка. Первая — teal `#00C3D9`, вторая — white |
| `subtitle` | `string` | ❌ | Описание справа от заголовка (10px, 50%) |
| `rows` | `TableRow[]` | ✅ | Данные таблицы |
| `insights` | `InsightItem[]` | ✅ | Пункты Insights (нумеруются автоматически) |
| `period` | `string` | ❌ | Период отчёта (left footer). По умолчанию не показывается (дата только на обложке) |
| `footerRight` | `string` | ❌ | Текст справа footer (50% opacity) |

### TableRow

```ts
interface TableRow {
  rank: number       // 1-based
  domain: string     // "teddybaldassarre.com"
  type: string       // "Watch Media" | "Blog" | "Marketplace" ...
  occurrence: number // 0-100 (absolute, не %)
}
```

### InsightItem

```ts
interface InsightItem {
  text: string  // текст инсайта
}
```

## Размеры (из Figma)

| Элемент | Позиция / Размер |
|---------|-----------------|
| Title | top: 32, left: 32, width: 437 |
| Subtitle | top: 105, left: 505, width: 183 |
| Table | top: 142, left: 32, width: 437 |
| Insights | top: 263, left: 505, width: 183 |
| Footer right | top: 408, right: 32 |

## Колонки таблицы

| Колонка | Ширина | Содержимое |
|---------|--------|-----------|
| Rank | 39px | Номер. #1 → bold + teal, остальные → 50% opacity |
| Domain | 160px | Имя домена |
| Type | 129px | Цветной dot (5px + 9px muted bg) + label (50%) |
| Occurrence | flex | Число (21px) + bar (4px высота, цвет категории) |

## Цвета категорий

Берутся из `src/theme/categories.ts` через `getCategoryColor(type)`.
Смотри [design-system.md](../design-system.md) для полного списка.

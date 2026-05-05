# BarChartList Slide Template

> Базовый шаблон для **ranked-list слайдов** с горизонтальной bar-chart-заливкой.
> Сейчас используется в `SacetSoMeInsightsSlideV2`. Все будущие похожие слайды
> (Boutique Reviews, Newsletters, Audience etc.) собираются по этому же шаблону.

## Где живёт код

- Компонент: [src/components/slides/SacetSoMeInsightsSlideV2.tsx](../../src/components/slides/SacetSoMeInsightsSlideV2.tsx)
- Используется в: [src/reports/weekly-pulse-draft.tsx](../../src/reports/weekly-pulse-draft.tsx)
- Тип строки: `SoMePost` в [SacetSoMeInsightsSlide.tsx](../../src/components/slides/SacetSoMeInsightsSlide.tsx)

## Структура слайда (720×450)

```
┌────────────────────────────────────────────────────────┐
│                                              [SF logo] │  top:25 right:32
│                                                         │
│ Sacet Social Media Insights                            │  top:24 left:32 · 32px Inter Regular
│ 4 total posts on Instagram & Facebook                  │  top:64 · 10px / opacity 0.5
│                                                         │
│ ┌── Row N (flex:1) ─────────────────────────────────┐  │
│ │░░░░░░░░░░░░░░░░░░░░░░░░░░  bar overlay (engagement│  │
│ │ 01  [thumb]  Title text…                  34   │  │
│ │ ↳ rank   ↳ optional   ↳ post body         ↳ value│  │
│ │              [icon] APR 22, 2026   0,9% engagement│  │
│ │              ↳ source brand       ↳ uniform label│  │
│ └────────────────────────────────────────────────────┘  │
│ … 4 rows total                                          │
│                                                         │
│                            www.semanticforce.ai        │  bottom:16 right:32
└────────────────────────────────────────────────────────┘
```

## Ключевые правила выравнивания

| Элемент | Правило | Зачем |
|---|---|---|
| Title slide | `top:24, fontSize:32, lineHeight:1, color:#FFFFFF` | Стандарт legacy templates |
| Subtitle | `top:64, fontSize:10, opacity:0.5, lineHeight:1.5` | Под title без uppercase |
| Row | `display:grid, alignItems:stretch, flex:1` | Все строки одинаковой высоты |
| Rank `01` | Та же `fontSize:11, lineHeight:1.4` что у title поста | First-line baseline rank ≡ title |
| Date label + Engagement label | `marginTop:auto, height:24` каждый | На одной y-baseline |
| Иконка источника | 14×14, opacity 1, brand-asset SVG | См. ниже |
| Bar overlay | абсолютная заливка `width: engagement/max·100%` | Top: teal `rgba(0,195,217,0.10)`, остальные `rgba(255,255,255,0.04)` |
| Top post | engagement number = `colors.accent.teal` `#00C3D9` | Visual highlight |
| Бордюр | `border-top` каждой строки + `border-bottom` последней (1px rgba(255,255,255,0.08)) | Минимальный hairline |

## Props

```ts
interface SoMePost {
  rank: number
  title: string
  source: string         // 'Instagram' | 'Facebook' | 'YouTube' | …
  url?: string           // hyperlink на пост
  image?: string         // thumbnail (если есть)
  date: string           // 'Apr 22, 2026'
  engagement: number     // primary metric for bar width
  engagementRate: string // '0,9%'
}

interface SacetSoMeInsightsSlideV2Props {
  title?: string         // default: 'Sacet Social Media Insights'
  brand?: string
  period?: string
  totalLabel?: string    // subtitle override
  posts: SoMePost[]
  showThumbnails?: boolean   // default: true
  website?: string       // default: 'www.semanticforce.ai'
}
```

## Иконки источников

`SourceIcon` внутри компонента. Иконки brand-svg из `assets/logos/`:

| Source contains | Asset / Component | Цвет |
|---|---|---|
| `instagram` | `assets/logos/Instagram.svg` | brand colors (in SVG) |
| `facebook` | `assets/logos/facebook-logo 1.svg` | brand colors (in SVG) |
| `youtube` | Tabler `IconBrandYoutube` | `#FF0000` |
| `tiktok` | Tabler `IconBrandTiktok` | `#FFFFFF` |
| else | Tabler `IconWorld` | white 0.7 |

Когда придут SVG-шки YouTube / TikTok / прочих — заменяем `<img>` так же как Instagram/Facebook.

## Как использовать для нового слайда

Новые слайды на этой базе делаются **прямой копией** или путём вызова того же компонента с другими `posts`:

1. Если структура данных такая же (4–5 ranked items с metric) — переиспользуем компонент напрямую, передаём другие `posts` и `title`/`subtitle`.
2. Если нужны другие labels (например `★ 4.8` вместо `0,9% engagement`) — пока копируем компонент в новый файл с минимальной правкой формата `engagementRate engagement` строки. В будущем стоит вынести `BarChartListSlide` как универсальный с props `valueLabel` и `metaLabel`.

Кандидаты на этот шаблон (из шита Sacet Weekly Pulse):

- **Sacet Boutique Reviews** — 3 reviews · av rating
- **C: Gemmyo Boutique Reviews** — то же для конкурентов
- **Sacet SoMe Insights / Gemmyo SoMe Insights** — текущий случай
- **Newsletters Insights** — `From | Subject | Date`
- **Meta Ads Insights** — потенциально, как single-row сравнение

Не подходят (другая структура):

- Audience Dynamics (delta таблица)
- Stock Updates (single row)
- Demand Insights (multi-month time series)

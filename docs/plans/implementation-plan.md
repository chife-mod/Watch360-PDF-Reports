# Watch 360 PDF Reports — Design & Implementation Plan

## Context

Watch 360 — аналитический продукт на базе Semantic Force. Нужен инструмент для генерации корпоративных PDF-отчётов премиум-качества. Данные приходят из Google Sheets (по ссылке). На выходе — векторный PDF 720×450px, пригодный для экранов и печати. Веб-интерфейс для превью и скачивания. Будущая совместимость с Remotion для анимации слайдов.

## 1. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Charts | Recharts (React-native, легко стилизуется) |
| Icons | @tabler/icons-react |
| Fonts | Inter (данные/body) |
| PDF Export | Puppeteer (headless Chrome → векторный PDF) |
| Google Sheets | googleapis (Google Sheets API v4) |
| Styling | Tailwind CSS 4 |
| Animation (future) | Framer Motion → Remotion |

## 2. Project Structure

```
Watch360-PDF-Reports/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env                        # Google API keys
│
├── history/                    # Лог работы и решений
│   └── YYYY-MM-DD.md
│
├── docs/                       # Документация
│   ├── components/             # Описание layout-ов, блоков, слайдов
│   │   ├── cover.md
│   │   ├── table.md
│   │   ├── donut-chart.md
│   │   ├── bar-chart.md
│   │   ├── kpi-card.md
│   │   └── ...
│   ├── architecture.md         # Общая архитектура
│   ├── data-flow.md            # Как данные из Sheets → слайды
│   ├── style-guide.md          # Цвета, шрифты, spacing
│   └── plans/                  # Дизайн-документы
│
├── assets/                     # Статика
│   ├── logos/                  # Логотипы Watch 360, клиентов
│   ├── icons/                  # Кастомные иконки (если нужны помимо Tabler)
│   └── fonts/                  # Inter (woff2)
│
├── public/                     # Статические файлы Vite
│
├── reports/                    # Сгенерированные отчёты
│   └── YYYY-MM-DD/
│       ├── report.json         # Данные отчёта
│       ├── report.pdf          # Готовый PDF
│       └── meta.json           # Метаданные (дата, название, источник)
│
├── src/
│   ├── main.tsx                # Entry point
│   ├── App.tsx                 # Веб-интерфейс (превью + скачать)
│   │
│   ├── components/
│   │   ├── slides/             # Компоненты слайдов (каждый = один тип)
│   │   │   ├── CoverSlide.tsx
│   │   │   ├── TableSlide.tsx
│   │   │   ├── DonutChartSlide.tsx
│   │   │   ├── BarChartSlide.tsx
│   │   │   ├── KPISlide.tsx
│   │   │   ├── SummarySlide.tsx
│   │   │   └── index.ts        # Registry всех типов слайдов
│   │   │
│   │   ├── charts/             # Обёртки над Recharts
│   │   │   ├── DonutChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   ├── AreaChart.tsx
│   │   │   └── Heatmap.tsx
│   │   │
│   │   └── ui/                 # UI-примитивы
│   │       ├── Table.tsx        # Безрамочная таблица
│   │       ├── KPICard.tsx      # Большое число + label
│   │       ├── SlideFrame.tsx   # Обёртка 720×450 с padding
│   │       └── Logo.tsx
│   │
│   ├── layouts/                # Layout-шаблоны (добавляются по макетам)
│   │   └── TwoColumn.tsx       # Два столбца (таблица + insights)
│   │
│   ├── theme/                  # Дизайн-токены (из Figma)
│   │   ├── colors.ts           # #0D0D0D, white, opacity levels
│   │   ├── typography.ts       # Inter, размеры 6-48px
│   │   └── index.ts
│   │
│   ├── data/                   # Работа с данными
│   │   ├── sheets.ts           # Google Sheets API парсинг
│   │   ├── transform.ts        # Трансформация данных → props слайдов
│   │   └── types.ts            # TypeScript типы данных
│   │
│   ├── lib/                    # Утилиты
│   │   ├── pdf.ts              # Puppeteer PDF генерация
│   │   ├── report.ts           # Оркестрация: данные → слайды → PDF
│   │   └── storage.ts          # Сохранение/загрузка отчётов
│   │
│   └── app/                    # Веб-интерфейс
│       ├── Viewer.tsx          # Превью слайдов (карусель)
│       ├── VersionDropdown.tsx # Дропдаун предыдущих версий
│       ├── DownloadButton.tsx  # Кнопка скачать PDF
│       └── App.css             # Стили интерфейса (чёрный фон)
```

## 3. Slide Size & Rendering

- **Размер:** 720×450px (16:10, подходит для экрана и печати)
- **Rendering:** React компоненты рендерятся в `<div>` фиксированного размера
- **PDF:** Puppeteer открывает страницу с одним слайдом, делает `page.pdf()` с точными размерами
- **Масштаб:** CSS `transform: scale()` в превью для адаптации под размер окна

## 4. Visual Design (из Figma макетов)

### Цветовая палитра

```
Background:     #0D0D0D (почти чёрный)
Text Primary:   #FFFFFF
Text Secondary: #FFFFFF с opacity 50%
Border:         #808080 (только header таблиц)
Accent Graphics: gradient green/teal (в иллюстрациях)
```

### Типографика (только Inter)

- **H1 (заголовок слайда):** Inter Regular, 40-48px, white, leading-none
- **Subtitle:** Inter Regular, 10px, white, leading-1.5
- **Table header:** Inter Regular, 8px, white 50% opacity
- **Body/Insight text:** Inter Regular, 10px, white, leading-1.5
- **Numbering (01, 02...):** Inter Regular, 7px, white 50% opacity
- **Micro text (Powered by):** Inter Regular, 6px, white 50% opacity
- **Footer (дата, категория):** Inter Regular, 10px, white / white 50%

### Стиль: ультра-минимализм

- Никакого glassmorphism, карточек, теней, border-radius
- Иерархия через размер шрифта и opacity (50% vs 100%)
- Максимум whitespace
- Графические элементы — абстрактные иллюстрации с цветными градиентами
- Таблицы: только border-bottom на header (#808080), без рамок

### Повторяющиеся элементы на каждом слайде

- **Header (top-right):** "Powered by" + Semantic Force лого + разделитель + Watch360 лого
- **Footer left:** период (Dec 2025 - Feb 2026)
- **Footer right:** категория (Luxury Watches), opacity 50%

## 5. Slide Types (из Figma)

| Type | Description | Layout |
|------|------------|--------|
| cover | Обложка: заголовок 48px, период, категория, абстрактная иллюстрация по центру, логотипы | Фиксированный |
| table-with-insights | Заголовок 40px + subtitle + таблица (Rank/Domain/Type/Occurrence) слева + Insights справа (нумерованный список + Tabler icon) | Два столбца (65/35) |

> Новые типы будут добавляться по мере создания макетов в Figma

## 6. Data Flow

```
Google Sheet (ссылка)
    ↓
Google Sheets API → JSON (все закладки)
    ↓
Transform: определяем тип слайда для каждой закладки
    ↓
React: рендерим компоненты слайдов с данными
    ↓
Puppeteer: скриншот каждого слайда → PDF страницы
    ↓
Merge → единый PDF файл
    ↓
Save: reports/YYYY-MM-DD/report.pdf + meta.json
```

## 7. Web Interface

- **Фон:** абсолютно чёрный (#000000)
- **Слайд:** по центру экрана, с тенью, масштабируется под размер окна
- **Сверху:** дропдаун с датами предыдущих версий
- **Справа сверху:** кнопка "Download PDF"
- **Навигация:** стрелки влево/вправо между слайдами, индикатор страниц

## 8. Folder Purposes

| Folder | Purpose |
|--------|---------|
| history/ | Лог решений и изменений по датам |
| docs/components/ | Описание каждого типа слайда/блока |
| docs/ | Архитектура, data flow, style guide |
| assets/ | Логотипы, шрифты, кастомные иконки |
| reports/ | Сгенерированные отчёты по датам |
| src/ | Весь исходный код |

## 9. Verification

1. `npm run dev` — запустить Vite, открыть в браузере, увидеть превью слайдов
2. Проверить каждый тип слайда с тестовыми данными
3. `npm run pdf` — сгенерировать PDF, проверить качество (вектор, шрифты, цвета)
4. Проверить дропдаун версий с несколькими отчётами
5. Проверить скачивание PDF из веб-интерфейса

## 10. Phase 1 Scope (MVP)

1. Структура проекта + конфиги (Vite + React + TS + Tailwind)
2. Тема из Figma: цвета (#0D0D0D, white, opacity), Inter font, spacing
3. Общие компоненты: SlideFrame (720×450), Header (логотипы), Footer (период + категория)
4. 2 слайда из Figma: Cover, Table with Insights
5. Веб-интерфейс: превью на чёрном фоне + скачать PDF
6. Puppeteer PDF экспорт
7. Скачать и сохранить ассеты (логотипы SF + Watch360)
8. Документация компонентов в docs/components/

## 11. Figma References

- **Cover slide:** node-id=4-802 — обложка с абстрактной графикой
- **Table slide:** node-id=2-6 — Top 25 information sources + insights
- **File key:** V8XA0PVaAjxvPbq24stJXk

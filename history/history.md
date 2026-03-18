# Watch360 PDF Reports — История работы

---

## 2026-03-18 — Инициализация проекта

### ✅ Сделано

#### Инфраструктура
- [x] Инициализирован проект: Vite 6 + React 18 + TypeScript + Tailwind CSS 4
- [x] Настроены конфиги: `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- [x] `package.json` с зависимостями (Recharts, @tabler/icons-react, etc.)
- [x] `eslint.config.js`, `.gitignore`
- [x] Создан план реализации: `docs/plans/implementation-plan.md`

#### Тема (из Figma)
- [x] `src/theme/colors.ts` — палитра (#0D0D0D, white, opacity 50%, border #808080)
- [x] `src/theme/typography.ts` — Inter, размеры 6–48px, все уровни
- [x] `src/theme/index.ts` — реэкспорт токенов

#### Ассеты
- [x] `assets/logos/semantic-force.png` — логотип Semantic Force (скачан из Figma)
- [x] `assets/logos/watch360.png` — логотип Watch 360 (скачан из Figma)
- [x] `assets/logos/cover-graphic.png` — абстрактная иллюстрация для обложки (скачан из Figma)

#### База
- [x] `src/index.css` — базовые стили, подключение Tailwind
- [x] `src/App.css` — стили приложения
- [x] `src/main.tsx` — entry point
- [x] `src/App.tsx` — пока дефолтный шаблон Vite (требует замены)

### ⚠️ Проблемы / Инциденты

- **Figma `get_screenshot` → API 400 "Could not process image"**
  Агент попытался получить скриншот фрейма через Figma MCP — изображение оказалось слишком большим для Anthropic API. Агент упал без восстановления.
  **Решение:** не использовать `get_screenshot` для больших фреймов. Использовать `get_design_context` для структуры + ручной экспорт ассетов.

---

## ❌ Не сделано (Phase 1 MVP)

### Компоненты слайдов (`src/components/slides/`)
- [ ] `CoverSlide.tsx` — обложка (node-id: 4-802)
- [ ] `TableSlide.tsx` — Top 25 + Insights (node-id: 2-6)
- [ ] `slides/index.ts` — registry типов слайдов

### UI-примитивы (`src/components/ui/`)
- [ ] `SlideFrame.tsx` — обёртка 720×450px с padding
- [ ] `Header.tsx` — "Powered by" + SF лого + Watch360 лого (правый верхний угол)
- [ ] `Footer.tsx` — период (левый) + категория 50% opacity (правый)
- [ ] `Table.tsx` — безрамочная таблица (только border-bottom на header #808080)
- [ ] `KPICard.tsx` — большое число + label
- [ ] `Logo.tsx` — унифицированный компонент логотипа

### Чарты (`src/components/charts/`)
- [ ] `DonutChart.tsx`
- [ ] `BarChart.tsx`
- [ ] `AreaChart.tsx`

### Layouts (`src/layouts/`)
- [ ] `TwoColumn.tsx` — два столбца 65/35 (таблица + insights)

### Данные (`src/data/`)
- [ ] `types.ts` — TypeScript типы данных
- [ ] `sheets.ts` — Google Sheets API парсинг
- [ ] `transform.ts` — трансформация данных → props слайдов

### PDF экспорт (`src/lib/`)
- [ ] `pdf.ts` — Puppeteer PDF генерация
- [ ] `report.ts` — оркестрация: данные → слайды → PDF
- [ ] `storage.ts` — сохранение/загрузка отчётов

### Веб-интерфейс (`src/app/`)
- [ ] `Viewer.tsx` — превью слайдов (карусель, чёрный фон)
- [ ] `VersionDropdown.tsx` — дропдаун предыдущих версий
- [ ] `DownloadButton.tsx` — кнопка скачать PDF
- [ ] `App.tsx` — полная замена дефолтного шаблона

### Документация (`docs/components/`)
- [ ] `cover.md`
- [ ] `table.md`
- [ ] (остальные по мере добавления слайдов)

### Прочее
- [ ] `.env` — Google API ключи (структура файла)
- [ ] `npm run pdf` — скрипт для генерации PDF через Puppeteer
- [ ] Inter font подключён глобально (woff2)

---

## Приоритет следующего шага

1. **`SlideFrame` + `Header` + `Footer`** — общая обёртка для всех слайдов
2. **`CoverSlide`** — первый реальный слайд
3. **`TableSlide`** — второй слайд (самый сложный)
4. **`App.tsx`** — веб-интерфейс (превью + навигация)
5. **Puppeteer** — PDF экспорт

---

## 2026-03-18 — CoverSlide + UI primitives

### ✅ Сделано

#### UI примитивы (`src/components/ui/`)
- [x] `SlideFrame.tsx` — обёртка 720×450px, bg #0D0D0D, position: relative
- [x] `Header.tsx` — "Powered by" + SF logo + градиентный разделитель + Watch360 logo (top: 32, right: 32)
- [x] `Footer.tsx` — период слева (top: 408, left: 35) + right-текст справа (opacity 50%)

#### Слайды (`src/components/slides/`)
- [x] `CoverSlide.tsx` — обложка по Figma node 4-802
  - cover-graphic.png: top: 72, h: 242, full width
  - title: 48px Inter Regular, top: 340, left: 32
  - footer: период + www.watch360.ai

#### Веб-интерфейс
- [x] `App.tsx` — заменён дефолтный Vite шаблон, показывает CoverSlide на чёрном фоне

#### Документация
- [x] `docs/components/cover.md` — описание компонента, props, структура
- [x] `AGENTS.md` + `CLAUDE.md` — созданы в корне проекта
- [x] GitHub repo: https://github.com/chife-mod/Watch360-PDF-Reports (private)

### Технические решения
- Позиционирование: absolute + inline styles (px) — точное соответствие Figma
- Inter font: подключён в `index.css` через Google Fonts woff2
- Ассеты: лежат в `public/logos/` и подключаются строками `/logos/*.svg`

### ⚠️ Инциденты / Фиксы этой сессии

- **Assets сохранены как .png, но внутри SVG**
  Figma экспортировала SVG-файлы с расширением `.png`. Браузер не рендерил их (broken image).
  **Решение:** переименованы в `.svg`, перенесены в `public/logos/` (Vite отдаёт как статику по URL `/logos/`).
  **Вывод:** всегда проверять `file` command после скачивания ассетов из Figma.

- **preview_screenshot инструмента не рендерит картинки с localhost**
  Для проверки использовать `Claude in Chrome` MCP → `navigate` + `computer screenshot`.

- **Figma `get_screenshot` → смерть сессии**
  При экспорте большого фрейма: 400 "Could not process image". Изображение попадает в контекст → следующий запрос тоже падает. Выход только перезапуск сессии.
  **Правило:** никогда не вызывать `get_screenshot`. Только `get_design_context`.

---

## ❌ Не сделано (Phase 1 MVP — обновлено)

### Компоненты слайдов (`src/components/slides/`)
- [ ] `TableSlide.tsx` — Top 25 + Insights (node-id: 2-6)
- [ ] `slides/index.ts` — registry типов слайдов

### UI-примитивы (`src/components/ui/`)
- [ ] `Table.tsx` — безрамочная таблица (только border-bottom на header #808080)
- [ ] `KPICard.tsx` — большое число + label
- [ ] `Logo.tsx` — унифицированный компонент логотипа

### Чарты (`src/components/charts/`)
- [ ] `DonutChart.tsx`
- [ ] `BarChart.tsx`
- [ ] `AreaChart.tsx`

### Layouts (`src/layouts/`)
- [ ] `TwoColumn.tsx` — два столбца 65/35 (таблица + insights)

### Данные (`src/data/`)
- [ ] `types.ts` — TypeScript типы данных
- [ ] `sheets.ts` — Google Sheets API парсинг
- [ ] `transform.ts` — трансформация данных → props слайдов

### PDF экспорт (`src/lib/`)
- [ ] `pdf.ts` — Puppeteer PDF генерация
- [ ] `report.ts` — оркестрация: данные → слайды → PDF
- [ ] `storage.ts` — сохранение/загрузка отчётов

### Веб-интерфейс (`src/app/`)
- [ ] `Viewer.tsx` — превью слайдов (карусель, чёрный фон)
- [ ] `VersionDropdown.tsx` — дропдаун предыдущих версий
- [ ] `DownloadButton.tsx` — кнопка скачать PDF

### Прочее
- [ ] `.env` — Google API ключи (структура файла)
- [ ] `npm run pdf` — скрипт для генерации PDF через Puppeteer
- [ ] Inter font локально (woff2) — сейчас через Google Fonts (для Puppeteer нужен локальный)

---

## 2026-03-18 (вечер) — Обновление ассетов + CoverSlide fix

### ✅ Сделано

#### Ассеты: полная перезагрузка
- [x] Удалены старые SVG из `public/logos/` (semantic-force.svg, watch360.svg, cover-graphic.svg)
- [x] Новый единый логотип: `assets/logos/Logo_Top_On_Dark.svg` → `public/logos/Logo_Top_On_Dark.svg`
- [x] PNG → WebP (80% compression):
  - `Cover_Image.png` (700K) → `Cover_Image.webp` (164K) — **76% сжатие**
  - `Quotes_Image_1.png` (3.9M) → `Quotes_Image_1.webp` (147K) — **96% сжатие**
  - `Quotes_Image_2.png` (3.1M) → `Quotes_Image_2.webp` (68K) — **98% сжатие**
  - `Watch 1.png` (24K) → `Watch 1.webp` (3.2K) — **87% сжатие**
- [x] Tabler иконка: `assets/icons/tabler_bulb.svg` → `public/icons/tabler_bulb.svg`
- [x] Установлен `cwebp` (brew install webp) для конвертации

#### Компоненты
- [x] `Header.tsx` — переписан: единый SVG `Logo_Top_On_Dark.svg` вместо раздельных SF + Watch360
  - Позиция: top: 25px, right: 32px, height: 31px (по Figma node 23:2463)
- [x] `CoverSlide.tsx` — обновлён: `Cover_Image.webp` вместо `cover-graphic.svg`
  - Верифицирован через dev server + browser screenshot
  - Визуально идентичен Figma node 4-802

### Структура ассетов (финальная)

```
assets/                       ← исходники (не в public)
├── logos/Logo_Top_On_Dark.svg
├── images/*.png              ← оригиналы PNG
├── icons/tabler_bulb.svg
└── fonts/                    ← пока пусто

public/                       ← Vite static serving
├── logos/Logo_Top_On_Dark.svg
├── images/*.webp             ← конвертированные WebP (80% quality)
├── icons/tabler_bulb.svg
├── favicon.svg
└── icons.svg
```

---

## 2026-03-18 (вечер, сессия 2) — Viewer + Toolbar

### ✅ Сделано

#### Веб-интерфейс (`src/app/`)
- [x] `Viewer.tsx` — полноэкранный просмотрщик слайдов
  - Fit-to-screen: `transform: scale()` с отступами 80px по бокам
  - Навигация: ← → Space Home End + стрелки по бокам + точки-индикаторы
  - `onSlideChange` callback для связи с Toolbar
- [x] `Toolbar.tsx` — верхняя панель (объединяет VersionDropdown + DownloadButton)
  - Слева: счётчик слайдов (`01 / 03`, tabular-nums)
  - Справа: дропдаун версий (title + дата) + кнопка Export PDF
  - Gradient overlay (top → transparent), glassmorphic dropdown
  - Hover-эффекты на всех интерактивных элементах
- [x] `App.tsx` — пересобран: Toolbar + Viewer с моковыми версиями отчётов

### Архитектурные решения
- `VersionDropdown` и `DownloadButton` объединены в один `Toolbar.tsx` — меньше компонентов, проще связь
- Версии отчётов: пока `MOCK_VERSIONS[]` в App.tsx, будет заменено на данные из API/localStorage
- Масштаб слайда: `min(availableW / 720, availableH / 450)`, пересчитывается при resize
- Тулбар не блокирует клики по слайду: `pointerEvents: 'none'` на контейнере, `auto` на интерактивных элементах

---

## 2026-03-18 (вечер, сессия 3) — TableSlide + Design System

### ✅ Сделано

#### TableSlide (`src/components/slides/TableSlide.tsx`)
- [x] Реализован по Figma node `2-6`: Two-column layout (437px table + 183px insights)
- [x] Таблица: Rank | Domain | Type (цветной dot + label) | Occurrence (число + bar)
- [x] Type badges: dot 5px solid + 9px muted bg, label 50% opacity
- [x] Occurrence bars: 4px высота, 500px border-radius, цвет по категории
- [x] Rank #1: bold, `#00C3D9` (teal accent)
- [x] Insights: иконка bulb + нумерованные пункты (01, 02)
- [x] Footer: без даты (дата только на обложке), только `www.watch360.ai` справа
- [x] Footer.tsx: `period` теперь опциональный prop

#### Дизайн-система
- [x] `src/theme/categories.ts` — централизованные цвета категорий (solid + muted)
  - Watch Media: `#3DE0B8`, Blog: `#6BA4F7`, Marketplace: `#F0A543`
  - Forum, News, Social, Manufacturer — подготовлены
  - `getCategoryColor()` хелпер с серым fallback
- [x] `src/theme/colors.ts` — обновлён: accent.teal → `#00C3D9`, re-export categories
- [x] `docs/design-system.md` — полная документация всех токенов
- [x] TableSlide рефакторнут: цвета из `getCategoryColor()` вместо хардкода

#### Документация
- [x] `docs/components/table-slide.md` — props, layout, колонки, размеры
- [x] `docs/components/viewer.md` — props, масштабирование, навигация
- [x] `docs/design-system.md` — цвета, категории, типографика, правила

### Это было в плане?
- ✅ `TableSlide.tsx` — AGENTS.md п.5, implementation-plan.md §3.2
- ✅ Viewer/Toolbar — AGENTS.md п.6-7, implementation-plan.md §7
- ✅ Design system docs — implementation-plan.md §8 (docs/)

---

## Приоритет следующего шага

1. **Google Sheets API** — подключение данных (`src/data/`)
2. **Puppeteer** — PDF экспорт (`src/lib/pdf.ts`)
3. **Дополнительные слайды** — по мере появления в Figma

---

## 2026-03-18 (вечер, сессия 4) — WatchReferences + QuoteSlide + Viewer v2

### ✅ Сделано

#### Новые слайды
- [x] `WatchReferencesSlide.tsx` — по Figma node `21-2192`
  - 4 карточки часов: 56×56px rounded image + brand badge + model + метрики
  - Колонки: MODEL | MENTIONS | SOURCES | COUNTRIES | PRICE RANGE | DIAL COLOR
  - Dial color: текст + 12px dot с `dialColorHex`
  - Footer: `www.watch360.ai` справа
- [x] `QuoteSlide.tsx` — по Figma node `17-2084`
  - Полноразмерное фото `Quotes_Image_1.webp` (3x, WebP 80%, 2160×1350)
  - CSS-градиенты для затемнения правой стороны (как в Figma)
  - Цитата 25px, author + description, дефис «—» выступает за левую линию
  - Header: Watch360 logo, Footer: www.watch360.ai

#### Viewer v2 — вертикальный скролл + zoom
- [x] Переделан с карусели на вертикальный скролл (слайд под слайдом)
  - Удалён `Viewer.tsx`, вся логика в `App.tsx`
  - Fit-to-viewport: `min(fitWidth, fitHeight * 0.8)` — один слайд всегда виден целиком
  - Отступы по бокам: 150px
- [x] Zoom slider — правый нижний угол (fixed)
  - Диапазон: 30–100%, шаг ±10%
  - Glassmorphism panel: border, backdrop-blur
  - FIT кнопка: сброс зума на 100%
  - Кнопки −/+ и range slider
- [x] Toolbar — мягкий градиент сверху
  - Чёрный 100% у верха → transparent ~20px ниже кнопок
  - backdrop-blur только на кнопке dropdown (а не на всей полосе)
  - Не мешает скроллу (pointer-events: none на контейнере)

#### Ассеты
- [x] `1.png` → `Quotes_Image_1.webp` — конвертация cwebp -q 80, без ресайза (3x = 2160×1350)
- [x] `Watch 1.png` — используется как placeholder во всех карточках WatchReferencesSlide

#### Фиксы
- [x] Дата убрана со второго слайда (Footer.tsx: `period` — опциональный)
- [x] Блок "Information source" в TableSlide — позиция выровнена по верхней линии таблицы (по Figma)
- [x] Occurrence bars — максимальное значение = 100% полоски (не привязано к 100)
- [x] Unicode-кавычки: вместо `\u201C` — реальные UTF-8 символы в JSX

### Архитектурные решения
- Вертикальный скролл вместо карусели — удобнее для обзора нескольких слайдов
- Fit-to-viewport считает оба измерения — слайд не обрезается ни по ширине, ни по высоте
- Картинки 3x без ресайза — для печати. Только конвертация формата (WebP 80%)
- QuoteSlide: image fills slide 1:1 (720×450 = 2160×1350 / 3), без offset и object-fit:cover

---

## Приоритет следующего шага

1. **Google Sheets API** — подключение данных (`src/data/`)
2. **Puppeteer** — PDF экспорт (`src/lib/pdf.ts`)
3. **Дополнительные слайды** — по мере появления в Figma

---

## 2026-03-19 — Кликабельная ссылка в футере

### ✅ Сделано

#### Footer (`src/components/ui/Footer.tsx`)
- [x] Добавлен optional prop `rightUrl` — если передан, текст справа оборачивается в `<a>` без подчёркивания (`textDecoration: 'none'`, `color: 'inherit'`) и с `target="_blank" rel="noopener noreferrer"`
- [x] Стиль текста не меняется: opacity 50%, 10px Inter — всё то же

#### Слайды
- [x] `CoverSlide.tsx` — добавлен `websiteUrl?: string`, по умолчанию `'https://watch360.ai'`, передаётся в `Footer` как `rightUrl`
- [x] `TableSlide.tsx` — добавлен `footerRightUrl?: string`, по умолчанию `'https://watch360.ai'`
- [x] `WatchReferencesSlide.tsx` — добавлен `footerRightUrl?: string`, по умолчанию `'https://watch360.ai'`

### Технические решения
- Ссылка прозрачна визуально (без подчёркивания), но кликабельна в PDF и в браузере
- Backward-compatible: если `rightUrl` не передан — текст остаётся простым `<span>`, поведение не меняется

---

## Приоритет следующего шага

1. **Google Sheets API** — подключение данных (`src/data/`)
2. **Puppeteer** — PDF экспорт (`src/lib/pdf.ts`)
3. **Дополнительные слайды** — по мере появления в Figma


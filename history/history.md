# Watch360 PDF Reports — История работы

---

## 2026-03-25 (сессия 3) — Table of Contents & Table alignments

### ✅ Сделано

#### Table of Contents
- Обновлены плитки в `TableOfContentSlide` для февральского отчета `src/reports/feb-2026.tsx`.
- Теперь там 6 разделов, строго соответствующие текущим слайдам: Overview, Coverage, Top 10 Sources, Top 25 Brands, Top 20 Collections, Top 25 Watch References.
- В `AGENTS.md` добавлено строгое правило: **Always update `TableOfContentSlide` before committing**.

#### Фиксы таблиц (Header borders & Alignment)
- У всех таблиц линия под хедером сделана строго `1px` толщиной и `rgba(255, 255, 255, 0.3)` (30% brightness, pure white).
- `WatchReferencesSlide` и `TopModelsTableSlide`: исправлено пиксельное смещение колонки `Model` в хедере относительно контента. Добавлен `boxSizing: 'border-box'` для превью часов, и `paddingLeft` заголовку в `TopModelsTableSlide`.

---

## 2026-03-25 (сессия 2) — Фото моделей [6-15] + Back Cover + Footer fix

### ✅ Сделано

#### Фронтальные фото для Top Watch References [6-15]
- Скачаны 10 фото в `assets/images/top6-15/` (файлы `6.png`…`15.png`).
- Источники: Seiko official (1102×1102), Omega official (2000×2000), WatchBase CDN (433–500px), Longines official.
- Все импортированы в `feb-2026.tsx` и привязаны к `modelsTop10Data[].image`.
- Миниатюры 28×28px с `borderRadius:8` отображаются в колонке Rank.

#### Back Cover — завершающий слайд отчёта
- Добавлен `SectionCoverSlide` в конец `SLIDES[]` в `feb-2026.tsx` (id: `back-cover`).
- Данные берутся из `REPORT_META`: title, period, website.
- Компонент существовал — переиспользован без изменений логики.

#### Footer: `bottom: 16` → `bottom: 28` (Figma node 30-4507)
- `Footer.tsx`: `bottom: 16` → `bottom: 28` — влияет на все слайды.
- `SectionCoverSlide.tsx`: footer left `top: 408` → `bottom: 28`.
- Выравнивание левого и правого текста футера по одной линии.

### 🔲 Следующее
- Ревью консистентности отступов/цветов по всем слайдам (в процессе).
- Создать `Top Watch References [16-25]`.
- PDF экспорт: vector PDF через Puppeteer `page.pdf()` (план готов).

---

## 2026-03-25 — Слайд Top Watch References [6-15] + дизайн-система

### ✅ Сделано

#### Новый компонент `TopModelsTableSlide.tsx`
- Система колонок: `rank(50) + model(140) + brand(78) + articles(56) + sources(56) + countries(60) + price(84) + case(56) + dial(flex)`.
- Все ячейки: левое выравнивание, `flexShrink:0`, `boxSizing:border-box`. Только dial: `flex:1 + justifyContent:flex-end`.
- Заголовок: `Top Watch References` (белый) + `[6-15]` (teal). Таблица на `top:88`.
- `paddingLeft:8` на колонке Model — гарантированный отступ 8px от миниатюры.
- Dial Color dot: внешнее кольцо авто-генерируется как `dialColorHex + 26` (15% opacity).
- Footer с `www.watch360.ai`.

#### Реальные данные #6–15 из Excel
- Строки 6–15 из листа «6. Top 50 Models»: Seiko KS1969, Omega Speedmaster (×2), Longines Year of the Horse, IWC George Russell (×2), MB&F LM EVO, Patek Nautilus 5711, Seiko Presage SPB538, Panerai PAM00382.

#### `src/components/ui/LaunchDate.tsx`
- Единый компонент: `LAUNCH • Dec, 2025`. Месяц — 3 буквы с заглавной (не капс). Авто-нормализация входящего формата.
- Применён в `WatchReferencesSlide` и `TopModelsTableSlide`.

#### Унификация хедеров таблиц
- Все слайды с таблицами: `borderBottom: 0.5px solid #808080`, `paddingBottom:6`, `alignItems:flex-end`.
- Правило зафиксировано в `docs/design-system.md` (п. 4, новый п. 9).

### 🔲 Следующее
- Скачать фронтальные фото для моделей #6–15 и подключить к слайду.
- Создать `Top Watch References [16-25]`.

---

## 2026-03-25 — Архитектурный концепт и Product Vision

### ✅ Сделано
- Создан документ `docs/product-concept.md`, описывающий конечную цель проекта: создание максимально автономной системы (Google Sheets + Templates = PDF).
- В `docs/product-concept.md` зафиксирована механика работы: маппинг страниц таблицы на готовые React-шаблоны, интерфейс с версионностью (последний репорт по умолчанию, остальные через dropdown) и пополнение библиотеки темплейтов (как абсолютов).
- Обновлен `AGENTS.md`: добавлена ссылка на `docs/product-concept.md` для быстрого погружения новых агентов.

## 2026-03-25 — Финализация визуальной части слайдов отчёта

### ✅ Сделано

#### Top Sources (`TopSourcesSlide.tsx`)
- Унифицирована ширина колонок в таблице: `165px` для Источника, `120px` для Страны.
- Блоки "Период" и "Инсайты" в правой панели выровнены по левому краю в едином контейнере (`left: 505px`).
- Настроены отступы и gap, чтобы длинные названия стран не наезжали на бар-чарты.
- Подогнана иконка лампочки в блоке инсайтов под 16x16.

#### Top Countries (`TopCountriesSlide.tsx`)
- Масштаб и позиционирование карты вычислены заново через `scale` и `translate` D3.
- Ширина SVG расширена до `700px` (пропорционально). Карта размещена таким образом, чтобы США заходили за левый текстовый блок, а правый край Австралии обрезался слайдом.
- Точки неактивных стран высветлены до белой 15% заливки `rgba(255,255,255,0.15)`.
- Точно спозиционированы Media Badges (логотипы Hodinkee, Chrono24, GQ Italia) по координатам на карте (США, Северная Германия, Южная Италия соответственно).
- У больших чисел в столбце Sources настроен `paddingBottom: 2px` для идеального выравнивания по базовой линии.

#### Table of Content (`TableOfContentSlide.tsx`)
- Старый списочный формат заменён на 8 плиток модульной сетки по утвержденному клиентом прототипу из Figma.
- Применён `CSS Grid` со столбцами `repeat(4, 161px)` и отступом `gap: 4px`.
- Поверх тёмного полупрозрачного фона плит размещены гигантские прозрачные порядковые номера (44px, opacity 20%).

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

## 2026-03-19 — Layout-обновления + Templates page + архитектурный рефактор

### ✅ Сделано

#### Layout-обновления слайдов (по Figma)

- [x] **TableSlide** (Figma 2-6):
  - Заголовок: 40px → 32px, single-line, top: 32 → 24
  - Таблица: top: 142 → 88 (отступ 32px от заголовка)
  - Subtitle: top: 156 → 104
  - Количество строк: 8 → 10
- [x] **CoverSlide** (Figma 4-802):
  - Заголовок: 48px → 40px
  - Позиция: top: 340 → 344 (центрирование между иллюстрацией и футером)
- [x] **WatchReferencesSlide**:
  - Заголовок: 40px → 32px, top: 32 → 24 (как у TableSlide)
- [x] **QuoteSlide — слайд 05**:
  - Добавлен второй QuoteSlide в отчёт (цитата Claude, фон `2.webp`)

#### Новый слайд: SectionCoverSlide (Back Cover)

- [x] `src/components/slides/SectionCoverSlide.tsx` — Figma node 30-4507
  - Та же иллюстрация и логотип, что у обложки
  - Заголовок: 25px Inter, две строки, top: 336
  - Footer left: категория + период, 10px, opacity 50% (серый)
  - Footer right: website, 10px, opacity 50%
  - Пример: "Shaping Visibility / in the Age of AI"

#### Удаление `public/` — архитектурный фикс

- [x] Все ассеты перенесены из `public/` в `assets/` (ES-импорты)
- [x] `public/` **удалена полностью**
- [x] Все строковые пути (`'/images/...'`) заменены на `import img from '...'`
- [x] Файлы затронуты: `Header.tsx`, `CoverSlide.tsx`, `TableSlide.tsx`, `App.tsx`
- [x] Конвертация: `assets/images/2.png` → `assets/images/2.webp` (cwebp -q 80, 134KB)

**Почему:** в Vite есть два способа работы с файлами. `public/` + строковые пути — простой, но файлы не обрабатываются сборщиком. `assets/` + ES-импорты — правильный: Vite хеширует, оптимизирует, tree-shakes. Первая сессия использовала `public/` — это была ошибка, исправлена.

#### Templates page — библиотека шаблонов

- [x] `src/app/templateRegistry.tsx` — **единый реестр** всех шаблонов
  - `SLIDE_TEMPLATES[]` — уникальные типы (для Templates page)
  - `REPORT_SLIDES[]` — конкретные слайды в отчёте (могут повторять типы с разными данными)
  - Моковые данные вынесены из `App.tsx` сюда — **один источник истины**
  - Изменил компонент → обновился и в отчёте, и в темплейтах

- [x] `src/app/TemplatesPage.tsx` — страница библиотеки шаблонов
  - **List view**: полноразмерные слайды вертикально, с подписями (номер + имя + тег + описание)
  - **Grid view**: миниатюры (38% scale), фильтрация по тегам
  - Toggle List / Grid в top bar
  - Sticky header с backdrop-blur
  - Кнопка "← Back to Report"

- [x] Теги: `Cover`, `Table`, `Models`, `Quote`
  - Watch Models помечен как `['Table', 'Models']` (показывается в обоих фильтрах)
  - Один шаблон Quote (не дублируем одинаковые типы)

- [x] `Toolbar.tsx` — добавлена кнопка **Templates** (рядом с дропдауном)
- [x] `App.tsx` — переключение `view: 'report' | 'templates'`
  - `REPORT_SLIDES` для отчёта, `SLIDE_TEMPLATES` для Templates page
  - Никакого роутера — просто state

#### Мелкие фиксы
- [x] ListView: gap 40 → 80px между блоками (слайды не слипаются)
- [x] ListView: подписи top: -12 → -28px (не залезают на слайды)
- [x] Section Cover → Back Cover (название + описание)

### Структура ассетов (текущая)

```
assets/
├── logos/Logo_Top_On_Dark.svg     ← ES-import в Header.tsx
├── images/
│   ├── Cover_Image.webp           ← CoverSlide, SectionCoverSlide
│   ├── Quotes_Image_1.webp        ← QuoteSlide (default)
│   ├── 2.webp                     ← QuoteSlide (slide 06)
│   ├── Watch 1.webp               ← WatchReferencesSlide placeholder
│   ├── 1.png, 2.png, Cover_Image.png, Quotes_Image_1.png, Quotes_Image_2.png  ← оригиналы
│   └── Watch 1.png                ← оригинал
├── icons/tabler_bulb.svg          ← ES-import в TableSlide.tsx
└── fonts/                         ← пока пусто
```

> ⚠️ Папки `public/` больше нет. Все ассеты через ES-импорты из `assets/`.

### Архитектурные решения

- **templateRegistry** — реестр = единый источник данных и компонентов. Report и Templates берут из него. Не дублируем.
- **SLIDE_TEMPLATES vs REPORT_SLIDES** — в темплейтах только уникальные типы (5 шт.), в отчёте конкретный набор с конкретными данными (6 слайдов, два Quote с разными картинками)
- **Templates без роутера** — `useState<'report' | 'templates'>` в App.tsx. Пока не нужен react-router.
- **Back Cover** — не Section Divider. Это задняя обложка, последний слайд раздела.

---

## Текущий состав слайдов отчёта

| # | Слайд | Компонент |
|---|-------|-----------|
| 01 | Cover — "Watch Media" | CoverSlide |
| 02 | Back Cover — "Shaping Visibility in the Age of AI" | SectionCoverSlide |
| 03 | Top Sources Table | TableSlide |
| 04 | Watch References | WatchReferencesSlide |
| 05 | Quote — ChatGPT | QuoteSlide |
| 06 | Quote — Claude | QuoteSlide (другая картинка) |

---

## Приоритет следующего шага

1. **Google Sheets API** — подключение данных (`src/data/`)
2. **Puppeteer** — PDF экспорт (`src/lib/pdf.ts`)
3. **Дополнительные слайды** — по мере появления в Figma

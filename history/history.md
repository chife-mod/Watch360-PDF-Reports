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

## Приоритет следующего шага

1. **`TableSlide.tsx`** — Top 25 + Insights, Figma node `2-6`
2. **`TwoColumn.tsx`** layout + `Table.tsx` примитив
3. **`Viewer.tsx`** — карусель слайдов
4. **Puppeteer** — PDF экспорт

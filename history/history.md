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

# CoverSlide — Обложка отчёта

## Назначение

Первый слайд отчёта. Представляет название, период и брендинг.

## Figma

- **File key:** `V8XA0PVaAjxvPbq24stJXk`
- **Node:** `4-802`

## Компонент

```tsx
import { CoverSlide } from './components/slides/CoverSlide'

<CoverSlide
  title="Watch Media"
  period="Dec 2025 – Feb 2026"
  website="www.watch360.ai"
/>
```

## Props

| Prop | Тип | Обязательный | Описание |
|------|-----|-------------|----------|
| `title` | `string` | ✅ | Заголовок отчёта (48px) |
| `period` | `string` | ✅ | Период: "Dec 2025 – Feb 2026" |
| `website` | `string` | ❌ | Правая строка футера, default: `www.watch360.ai` |

## Структура (720×450px)

```
┌─────────────────────────────────────────────┐ top: 0
│                                  [Header]   │ top: 32
│                                             │
│  ┌─────────────────────────────────────┐   │ top: 72
│  │        cover-graphic.png            │   │ h: 242
│  └─────────────────────────────────────┘   │
│                                             │
│  Watch Media                                │ top: 340, 48px
│                                             │
│  Dec 2025 – Feb 2026     www.watch360.ai   │ top: 408, 10px
└─────────────────────────────────────────────┘ bottom: 450
```

## Зависимые компоненты

- `SlideFrame` — обёртка 720×450px
- `Header` — логотипы top-right
- `Footer` — период и сайт

## Ассеты

- `assets/logos/cover-graphic.png` — абстрактная иллюстрация
- `assets/logos/semantic-force.png` — лого SF (в Header)
- `assets/logos/watch360.png` — лого Watch360 (в Header)

## Дизайн-правила

- Заголовок: `Inter Regular 48px, white, line-height: 1`
- Иллюстрация: `object-fit: cover`, всегда 720×242px
- Никаких теней, border-radius, градиентов на тексте

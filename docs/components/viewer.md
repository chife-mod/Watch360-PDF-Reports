# Viewer — Полноэкранный просмотрщик слайдов

## Файлы

| Файл | Назначение |
|------|-----------|
| `src/app/Viewer.tsx` | Основной контейнер: масштабирование + навигация |
| `src/app/Toolbar.tsx` | Верхняя панель: версии + Export PDF |

## Viewer.tsx

### Описание
Полноэкранный просмотрщик слайдов с автоматическим масштабированием (fit-to-screen).

### Props

| Prop | Тип | Описание |
|------|-----|----------|
| `children` | `React.ReactNode[]` | Массив слайд-компонентов |
| `onSlideChange` | `(index: number) => void` | Callback при смене текущего слайда |

### Масштабирование
```
scale = min(
  (window.innerWidth  - PAD_X * 2) / 720,    // PAD_X = 80
  (window.innerHeight - PAD_TOP - PAD_BOTTOM) / 450  // PAD_TOP=72, PAD_BOTTOM=48
)
```
- Пересчитывается при `resize`
- Применяется через `transform: scale(N)` + `transform-origin: center center`
- Максимальный зум: 3x (для мелких экранов)

### Навигация
| Действие | Управление |
|----------|-----------|
| Следующий слайд | `→`, `Space`, кнопка `›` справа |
| Предыдущий слайд | `←`, кнопка `‹` слева |
| Первый слайд | `Home` |
| Последний слайд | `End` |

- Стрелки появляются только когда есть куда перейти
- Точки-индикаторы внизу: текущий = растянутый (20px), остальные = круглые (6px)

### Стилистика
- Фон: `#000000` (абсолютно чёрный)
- Тень на слайде: `0 8px 60px rgba(0,0,0,0.6)`
- Стрелки: `background: rgba(255,255,255,0.06)`, hover → `0.1`
- Анимации: `transition: all 0.2-0.3s ease`

---

## Toolbar.tsx

### Описание
Фиксированная верхняя панель. Наложена поверх Viewer через gradient overlay.

### Props

| Prop | Тип | Описание |
|------|-----|----------|
| `versions` | `ReportVersion[]` | Список версий отчётов |
| `selectedId` | `string` | ID текущей выбранной версии |
| `onSelect` | `(id: string) => void` | Callback при выборе версии |
| `onExportPdf` | `() => void` | Callback при нажатии Export PDF |
| `currentSlide` | `number` | Индекс текущего слайда (0-based) |
| `totalSlides` | `number` | Общее количество слайдов |

### ReportVersion

```ts
interface ReportVersion {
  id: string      // уникальный ID (обычно дата ISO)
  date: string    // дата создания (ISO)
  title: string   // название из title первого слайда
  pdfUrl?: string // путь к PDF (undefined если не сгенерирован)
}
```

### Структура (слева → справа)

1. **Счётчик слайдов**: `01 / 03` — Inter 12px, weight 500, tabular-nums
2. **(пусто — центр)**
3. **Дропдаун версий**: `Watch Media · 18 Mar 2026 ▾`
4. **Export PDF**: белая кнопка с иконкой скачивания

### Дропдаун
- Клик вне закрывает (useRef + mousedown)
- Glassmorphic: `background: rgba(18,18,18,0.95)`, `backdrop-filter: blur(20px)`
- Тень: `0 16px 48px rgba(0,0,0,0.5)`
- Текущий элемент — фон `rgba(255,255,255,0.08)`, font-weight 500

### Стилистика
- Верхняя панель: `height: 56px`, `pointer-events: none` на контейнере
- Gradient: `linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)`
- Export PDF: `background: rgba(255,255,255,0.9)`, color `#000`, hover → scale(1.02)

# Watch360 PDF Reports — Agent Onboarding

> Read this file first. It contains everything you need to work on this project.
> Keep `history/history.md` updated after every significant change.

---

## What This Project Is

A tool for generating **premium corporate PDF reports** for Watch 360 (powered by Semantic Force).
Data comes from Google Sheets. Output: a vector PDF at **720×450px**, suitable for screens and print.
Includes a web interface for preview and download.
Future: Remotion-compatible for animated slide exports.

> **Read Next:** For the overarching autonomous pipeline (Data -> Templates -> PDF) and product vision, read [docs/product-concept.md](docs/product-concept.md).

---

## Product Philosophy

This is **not** a one-off report for Watch360. It is a **universal white-label report template** used across 10+ brands under the Semantic Force umbrella.

### What stays the same across all brands:
- Dark theme, layout, typography, component structure
- Slide types (table, quote, watch references, etc.)
- Color system: hierarchy through font size + opacity only
- Visual language: maximum whitespace, no decorative elements

### What changes per brand:
- Logo in the header (replacing Watch360 logo)
- Report title and subtitle
- Data (from Google Sheets — different sheet per brand)
- Cover/quote imagery

### Design implications:
- **Neutral is intentional.** The dark theme and abstract aesthetics are brand-agnostic on purpose — they must work for watches, cosmetics, automotive, and any other category.
- **No brand-specific colors** in the template. Accent colors (teal for #1, category dots) are data-driven, not brand-driven.
- **The template IS the brand** — it's the Semantic Force / Watch360 platform brand, not the end-client brand.
- When evaluating design: "generic" = correct. The template should feel premium and professional without committing to any particular industry aesthetic.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Charts | Recharts |
| Icons | @tabler/icons-react |
| Font | Inter only (all sizes) |
| Styling | Tailwind CSS 4 |
| PDF Export | Puppeteer (headless Chrome → vector PDF) |
| Data Source | Google Sheets API v4 |
| Animation (future) | Framer Motion → Remotion |

---

## Current Status

**Phase 1 (MVP) is in progress.** See full log → [`history/history.md`](history/history.md)

### Done
- Project scaffold: Vite + React + TS + Tailwind
- Design tokens: `src/theme/colors.ts`, `src/theme/typography.ts`, `src/theme/categories.ts`
- Assets: `assets/logos/Logo_Top_On_Dark.svg`, images in WebP 80% (3x for print)
- Implementation plan: `docs/plans/implementation-plan.md`
- UI primitives: `SlideFrame.tsx`, `Header.tsx`, `Footer.tsx`
- Slides: `CoverSlide.tsx`, `TableSlide.tsx`, `WatchReferencesSlide.tsx`, `QuoteSlide.tsx`
- Viewer: vertical scroll layout, fit-to-viewport scaling (width + height)
- Toolbar: version dropdown + Export PDF button, gradient overlay
- Zoom slider: bottom-right, 30–100%, FIT button
- Design system docs: `docs/design-system.md`

### Not Done (build these next, in order)
1. `src/data/` — Google Sheets integration + data types
2. `src/lib/pdf.ts` — Puppeteer PDF generation
3. Additional slides as designed in Figma
4. `.env` — Google API keys

---

## Project Structure

```
Watch360-PDF-Reports/
├── AGENTS.md                   ← you are here
├── CLAUDE.md                   ← Claude Code specific
├── history/
│   └── history.md              ← log of all work done (update this!)
├── docs/
│   ├── plans/
│   │   └── implementation-plan.md
│   └── components/             ← per-component docs (add as you build)
├── assets/
│   └── logos/                  ← SF logo, Watch360 logo, cover graphic
├── src/
│   ├── theme/                  ← design tokens (colors, typography)
│   ├── components/
│   │   ├── slides/             ← one file per slide type
│   │   ├── charts/             ← Recharts wrappers
│   │   └── ui/                 ← primitives (SlideFrame, Header, Footer, Table...)
│   ├── layouts/                ← TwoColumn.tsx etc
│   ├── data/                   ← Google Sheets API + types
│   ├── lib/                    ← pdf.ts, report.ts, storage.ts
│   └── app/                    ← Viewer, VersionDropdown, DownloadButton
└── reports/                    ← generated PDFs (gitignored)
```

---

## Design Rules (strict — do not deviate)

### Colors
```
Background:      #0D0D0D  (near-black, all slides)
Text primary:    #FFFFFF
Text secondary:  rgba(255,255,255,0.5)  (50% opacity)
Border:          #808080  (table header only)
App background:  #000000  (web viewer)
```

### Typography (Inter only, no other fonts)
| Role | Size | Weight | Opacity |
|------|------|--------|---------|
| Slide title (H1) | 48px | Regular | 100% |
| Slide subtitle | 10px | Regular | 100% |
| Table header | 8px | Regular | 50% |
| Body / insights | 10px | Regular | 100% |
| Numbering (01, 02…) | 7px | Regular | 50% |
| Footer | 10px | Regular | 100% / 50% |
| Micro ("Powered by") | 6px | Regular | 50% |

### Style Rules
- **No** glassmorphism, card shadows, border-radius, gradients on text
- Hierarchy = font size + opacity only (no color variation)
- Maximum whitespace
- Tables: only `border-bottom` on header row (`#808080`), no other borders
- Graphics = abstract illustrations with color gradients (already in assets)

### Repeating elements on every slide
- **Header (top-right):** Watch360 + "Powered by SemanticForce" (single SVG: `Logo_Top_On_Dark.svg`)
- **Footer left:** period (e.g. "Dec 2025 – Feb 2026"), 10px — only on CoverSlide
- **Footer right:** website/category, 10px, 50% opacity

---

## Slide Types

| ID | Component | Figma node | Status |
|----|-----------|-----------|--------|
| cover | CoverSlide.tsx | 4-802 | ✅ built |
| table-with-insights | TableSlide.tsx | 2-6 | ✅ built |
| watch-references | WatchReferencesSlide.tsx | 21-2192 | ✅ built |
| quote | QuoteSlide.tsx | 17-2084 | ✅ built |

**Figma file key:** `V8XA0PVaAjxvPbq24stJXk`
Use `get_design_context` to inspect nodes — do NOT use `get_screenshot` (causes API errors with large frames).

---

## Slide Size & Rendering

- Fixed size: **720×450px** (16:10)
- In web viewer: `transform: scale()` to fit window
- PDF: Puppeteer opens each slide at exact dimensions, exports vector PDF

---

## Data Flow

```
Google Sheet URL
  → Google Sheets API v4 → JSON (all tabs)
  → transform.ts: map tabs → slide props
  → React: render slide components
  → Puppeteer: screenshot each → PDF pages
  → merge → reports/YYYY-MM-DD/report.pdf
```

---

## Working Conventions

- **Always update `TableOfContentSlide` before committing** (ensure all slides match the layout tiles).
- **Always update `history/history.md`** after completing a feature or fixing a bug
- Components are pure React — no side effects, data comes via props
- All sizes in px (not rem) — slides are fixed-size, not responsive
- Test each slide with `npm run dev` before moving to next
- Keep slide components dumb: no API calls, no state — just render props
- Figma is the source of truth for visual design

---

## Commands

```bash
npm run dev      # start Vite dev server
npm run build    # TypeScript check + Vite build
npm run lint     # ESLint
npm run pdf      # generate PDF via Puppeteer (not yet implemented)
```

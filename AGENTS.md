# Watch360 PDF Reports — Agent Onboarding

> Read this file first. It contains everything you need to work on this project.
> History is tracked via git log — use structured commit messages.

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

**Phase 1 (MVP) complete.** History: `git log --oneline -20`

### Done
- Project scaffold: Vite + React + TS + Tailwind
- Design tokens: `src/theme/colors.ts`, `typography.ts`, `spacing.ts`, `slideStyles.ts`
- Reusable UI primitives: SlideFrame, Header, Footer, SlideTitle, OverviewBar, BrandTable, ArticleBar, ModelCardColumn, BrandTag, LaunchDate
- Universal slides: KeywordBrandsSlide, KeywordModelsSlide (data-driven)
- Data layer: `src/data/keywords/` (types + per-keyword data files)
- Report: 16 slides (cover → back-cover), full vertical scroll viewer
- Toolbar: version dropdown + Export PDF, zoom slider (30–100% + FIT)

### Not Done (build these next, in order)
1. Google Sheets integration (`src/data/`)
2. PDF generation (`src/lib/pdf.ts`)
3. Additional slides as designed in Figma
4. `.env` — Google API keys

---

## Project Structure

```
Watch360-PDF-Reports/
├── AGENTS.md                   ← you are here
├── docs/
│   ├── plans/
│   │   └── implementation-plan.md
│   └── design-system.md
├── assets/
│   ├── logos/                  ← SF logo, Watch360 logo
│   └── images/                 ← cover, quotes, watch photos (3x WebP)
├── src/
│   ├── theme/                  ← design tokens
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── slideStyles.ts      ← shared inline style objects
│   ├── components/
│   │   ├── slides/             ← slide compositions (use ui/ primitives)
│   │   ├── charts/             ← Recharts wrappers
│   │   └── ui/                 ← reusable primitives (see Component Architecture)
│   ├── data/
│   │   └── keywords/           ← per-keyword data files + types.ts
│   ├── reports/                ← report definitions (feb-2026.tsx)
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

## Component Architecture

Slides are **compositions** of reusable UI primitives. Never copy-paste — compose.

### UI Primitives (`src/components/ui/`)
| Component | Purpose | Replaces |
|-----------|---------|----------|
| `SlideFrame` | 720×450 slide container | — |
| `Header` | Watch360 logo top-right | — |
| `Footer` | Period left, website right | — |
| `SlideTitle` | 32px slide heading | 15+ inline style blocks |
| `OverviewBar` | Sources/Articles/Comments row | 4+ duplicated blocks |
| `BrandTable` | Ranked brand table with bars | 3+ duplicated 100-line blocks |
| `ArticleBar` | Horizontal bar chart + number | 50+ inline bar implementations |
| `ModelCardColumn` | 5-card column with image+brand+model | 2+ duplicated 150-line blocks |
| `BrandTag` | Category pill label | — |
| `LaunchDate` | Launch date badge | — |

### Universal Slides (`src/components/slides/`)
| Component | Composes | Data source |
|-----------|----------|------------|
| `KeywordBrandsSlide` | SlideTitle + OverviewBar + 2×BrandTable | `data/keywords/*.ts` |
| `KeywordModelsSlide` | SlideTitle + OverviewBar + 2×ModelCardColumn | `data/keywords/*.ts` |

### Adding a new keyword section
1. Create `src/data/keywords/new-keyword.ts` (~42 lines)
2. Import in `feb-2026.tsx`, pass to `KeywordBrandsSlide` + `KeywordModelsSlide`
3. **Zero new components needed**

### Slide Types
| ID | Component | Status |
|----|-----------|--------|
| cover | CoverSlide | ✅ |
| toc | TableOfContentSlide | ✅ |
| overview | OverviewSlide | ✅ |
| top-brands | TopBrandsSlide | ✅ |
| top-countries | TopCountriesSlide | ✅ |
| top-sources | TopSourcesSlide | ✅ |
| top-collections | TopCollectionsSlide | ✅ |
| quote | QuoteSlide | ✅ |
| watch-references | WatchReferencesSlide | ✅ |
| top-models | TopModelsTableSlide | ✅ |
| keyword-brands | KeywordBrandsSlide (universal) | ✅ |
| keyword-models | KeywordModelsSlide (universal) | ✅ |
| section-cover | SectionCoverSlide | ✅ |

**Figma file key:** `V8XA0PVaAjxvPbq24stJXk`

---

## Slide Size & Rendering

- Fixed size: **720×450px** (16:10)
- In web viewer: `transform: scale()` to fit window
- PDF: Browser's native `window.print()` triggered via `/?pdf=all`
  - Print dialog MUST be set to `Save as PDF` / `Landscape`.
  - Background graphics are included natively (via CSS `@media print`).

---

## Data Flow

```
Google Sheet URL
  → Google Sheets API v4 → JSON (all tabs)
  → transform.ts: map tabs → slide props
  → React: render slide components
  → React: render slide components
  → Static web deployment (GitHub Pages)
  → Client clicks "Export PDF" → `window.print()` native generation
```

## Map Rendering Strategy (Critical)

Due to browser scaling issues with complex SVGs spanning multiple slides during `window.print()`, the **World Map** is rendered as a static, pre-rasterized 4x PNG asset, instead of a live React Recharts component.

- **Service Route:** Local dev `http://localhost:5173/?map` renders ONLY the live map.
- **Export Script:** `npm run map` calls Puppeteer to screenshot `/?map` at high DPI.
- **Output:** Saves to `assets/images/map-4x.png`, which is then imported conventionally in `TopCountriesSlide.tsx`.
```

---

## Working Conventions

- **Compose, don't copy-paste** — use ui/ primitives, create new ones when needed
- **Data separate from layout** — slide data lives in `src/data/`, not in components
- **Always update `TableOfContentSlide`** before committing (ensure all slides match)
- **Write structured commit messages** — this replaces history.md
- Components are pure React — no side effects, data comes via props
- All sizes in px (not rem) — slides are fixed-size, not responsive
- Test each slide with `npm run dev` before moving to next
- Keep slide components dumb: no API calls, no state — just render props
- Figma is the source of truth for visual design

---

## Deployment & Hosting

The application is a 100% static React SPA (Single Page Application). No backend or Node.js runtime is required for production.
It currently runs on GitHub Pages at `https://chife-mod.github.io/Watch360-PDF-Reports/`.

### How to deploy to GitHub Pages manually:
Because `dist/` is in `.gitignore`, a standard `git add -A` ignores the production build. You **must** forcefully add the `dist/` folder before pushing to avoid "Black Screen" (404 JS bundle missing) errors on GitHub Pages.

```bash
npm run build
git add -f dist
git commit -m "deploy: update github pages"
git subtree push --prefix dist origin gh-pages
```

If moving to a custom server (Nginx/S3/Vercel), simply upload the `dist/` folder and configure routing to point `404` requests to `index.html`.

---

## Commands

```bash
npm run dev      # start Vite dev server
npm run build    # TypeScript check + Vite build
npm run map      # export 4x PNG map asset from /?map route via Puppeteer
```

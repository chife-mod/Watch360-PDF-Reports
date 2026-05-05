# Watch360 / Market 360 Repo Split

> Why the Sacet (Jewelry) work is moving to its own repo, and how the two
> projects relate going forward.

## Two repos now

| Repo | URL | Vertical |
|---|---|---|
| `Watch360-PDF-Reports` (this) | https://chife-mod.github.io/Watch360-PDF-Reports/ | Watch Media (legacy clients, feb-2026 etc.) |
| `M360-jewelry-weekly-pulse` | https://chife-mod.github.io/M360-jewelry-weekly-pulse/ | Market 360 — Jewelry (Sacet, future jewelry clients) |

Each repo deploys to its own GitHub Pages URL. **A jewelry client never sees
Watch Media reports in the dropdown**, and vice versa.

## What got moved

The following components were copied to `M360-jewelry-weekly-pulse` and are
maintained there going forward:

- `CoverWeeklyPulse`
- `SacetSoMeInsightsSlideV2`
- `BoutiqueReviewsSlide`
- `AudienceDynamicsSlide`
- `CompetitiveSnapshotSlide`
- `DemandRankSlide`
- All UI primitives (`SlideFrame`, `SlideTitle`)
- `theme/` tokens
- Brand SVG assets (Sacet logo, SF Logo, Instagram, Facebook)

**Source of truth for Sacet / Jewelry slides is now `M360-jewelry-weekly-pulse`.**
This repo (Watch360) keeps its own copies for now (so we can still iterate
internally), but the canonical client deliverable lives there.

## Future shared library

When a second jewelry client lands (or a new Market 360 vertical like
auto-parts/Bilstein), we'll extract `BarChartListSlide` + theme + SVG icons
into `chife-mod/sf-report-shared` and connect both repos via git submodule.

The promotion workflow is documented in
`M360-jewelry-weekly-pulse/docs/architecture.md`.

**Promotion rule:** a component moves to `sf-report-shared` only after the
**second client** approves it — premature promotion creates more refactor pain
than it saves.

## Why not a monorepo

Considered, but rejected for now:
- Each client repo can have its own private/public visibility
- Each gets its own GitHub Pages URL (cleaner client comms)
- pnpm workspaces / Turborepo overhead isn't worth it for ≤5 clients

If we hit 5+ active clients we'll revisit.

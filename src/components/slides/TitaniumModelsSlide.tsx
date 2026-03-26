import { SlideFrame } from '../ui/SlideFrame'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'
import { BrandTag } from '../ui/BrandTag'
import { typography } from '../../theme/typography'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'

/* ── Types ────────────────────────────────────────────────── */

export interface TitaniumModelRow {
  rank: number
  model: string
  brand: string
  articles: number
}

export interface TitaniumModelsSlideProps {
  title?: string
  overview?: { sources: string; articles: string; comments: string }
  models?: TitaniumModelRow[]
  footerRight?: string
  footerRightUrl?: string
}

/* ── Data — top 10 from right table ─────────────────────── */

export const TITANIUM_MODELS: TitaniumModelRow[] = [
  { rank: 1,  brand: 'Vacheron Constantin', model: 'Overseas Tourbillon 6000V/210T-H179',              articles: 9 },
  { rank: 2,  brand: 'Angelus',             model: 'Chronodate Titanium Moka 0CDZF.C01A.C1282E',       articles: 4 },
  { rank: 3,  brand: 'Angelus',             model: 'Chronodate Red Gold Moka 0CDZE.C01A.C1282B',       articles: 4 },
  { rank: 4,  brand: 'MB&F',                model: 'LM Sequential Flyback EVO',                        articles: 2 },
  { rank: 5,  brand: 'Chopard',             model: 'Zagato Lab One Concept 168636-3001',               articles: 2 },
  { rank: 6,  brand: 'Audemars Piguet',     model: 'Royal Oak Offshore 26420IO.OO.A402CA.01',          articles: 1 },
  { rank: 7,  brand: 'Hublot',              model: 'Big Bang Unico Winter Titanium Ceramic 42mm',      articles: 1 },
  { rank: 8,  brand: 'Grand Seiko',         model: 'Heritage SBGX357',                                 articles: 1 },
  { rank: 9,  brand: 'Audemars Piguet',     model: 'Royal Oak Offshore 26420CD.OO.A029VE.01',          articles: 1 },
  { rank: 10, brand: 'Chopard',             model: 'Alpine Eagle 41 SL Cadence 8HF',                   articles: 1 },
]

/* ── Shared styles ───────────────────────────────────────── */

const HDR: React.CSSProperties = {
  fontFamily: typography.fontFamily,
  fontSize: 7,
  fontWeight: 400,
  color: '#FFFFFF',
  opacity: 0.5,
  textTransform: 'uppercase',
  letterSpacing: 0.14,
  lineHeight: 1,
  whiteSpace: 'nowrap',
}

/* ── Component ───────────────────────────────────────────── */

export function TitaniumModelsSlide({
  title = '\u201CTitanium\u201D in Titles',
  overview = { sources: '59', articles: '142', comments: '310' },
  models = TITANIUM_MODELS,
  footerRight = 'www.watch360.ai',
  footerRightUrl = 'https://www.watch360.ai',
}: TitaniumModelsSlideProps) {
  const maxArticles = Math.max(...models.map(m => m.articles), 1)
  const leftCol  = models.slice(0, 5)
  const rightCol = models.slice(5, 10)

  return (
    <SlideFrame>
      <Header />
      <Footer right={footerRight} rightUrl={footerRightUrl} />

      {/* ── Title ── */}
      <p style={{ position: 'absolute', top: spacing.titleTop, left: spacing.slideX, margin: 0, fontFamily: typography.fontFamily, fontSize: 32, fontWeight: 400, color: '#FFFFFF', lineHeight: 1 }}>
        {title}
      </p>

      {/* ── Overview metrics ── */}
      <div style={{ position: 'absolute', top: 68, left: spacing.slideX, display: 'flex', gap: 24, alignItems: 'center' }}>
        {[
          { label: 'Sources',  value: overview.sources  },
          { label: 'Articles', value: overview.articles },
          { label: 'Comments', value: overview.comments },
        ].map(({ label, value }) => (
          <span key={label} style={{ fontFamily: typography.fontFamily, fontSize: 7, fontWeight: 400, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1 }}>
            {label}:&nbsp;<span style={{ color: '#FFFFFF' }}>{value}</span>
          </span>
        ))}
      </div>

      {/* ── Two columns ── */}
      <div style={{ position: 'absolute', top: 83, left: spacing.slideX, width: 656, display: 'flex', gap: 32 }}>
        <ModelColumn title="Top 10 Models" data={leftCol}  maxArticles={maxArticles} showTitle />
        <ModelColumn title=""              data={rightCol} maxArticles={maxArticles} showTitle={false} />
      </div>
    </SlideFrame>
  )
}

/* ── ModelColumn ─────────────────────────────────────────── */

function ModelColumn({ title, data, maxArticles, showTitle }: { title: string; data: TitaniumModelRow[]; maxArticles: number; showTitle: boolean }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontFamily: typography.fontFamily, fontSize: 16, fontWeight: 400, color: showTitle ? '#FFFFFF' : 'transparent', lineHeight: 1.5, marginBottom: 8, userSelect: 'none' }}>
        {title || 'placeholder'}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', borderBottom: `1px solid ${colors.border}`, paddingBottom: 6, boxSizing: 'border-box' }}>
        <div style={{ ...HDR, width: 19 + 8 + 50 + 8 }}>Rank</div>
        <div style={{ ...HDR, flex: 1 }}>Model</div>
        <div style={{ ...HDR }}>Articles qty</div>
      </div>

      {data.map((row, i) => {
        const isTop = row.rank === 1
        const barPct = Math.max((row.articles / maxArticles) * 100, 4)
        return (
          <div key={row.rank} style={{ display: 'flex', alignItems: 'center', height: 58, borderTop: i === 0 ? 'none' : '0.5px solid rgba(255,255,255,0.15)', boxSizing: 'border-box' }}>
            {/* Rank */}
            <div style={{ width: 19, fontFamily: typography.fontFamily, fontSize: 10, fontWeight: isTop ? 700 : 400, color: isTop ? colors.accent.teal : 'rgba(255,255,255,0.5)', lineHeight: 1.5, flexShrink: 0 }}>
              {row.rank}
            </div>
            {/* Image placeholder */}
            <div style={{ paddingRight: 8, flexShrink: 0 }}>
              <div style={{ width: 50, height: 50, borderRadius: 16, border: '0.5px solid rgba(255,255,255,0.24)', backgroundColor: colors.thumbnailBg, overflow: 'hidden', boxSizing: 'border-box' }} />
            </div>
            {/* Brand + model */}
            <div style={{ flex: 1, minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, paddingRight: 8 }}>
              <BrandTag label={row.brand} />
              <span style={{ fontFamily: typography.fontFamily, fontSize: 10, fontWeight: 400, color: isTop ? colors.accent.teal : '#FFFFFF', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {row.model}
              </span>
            </div>
            {/* Articles + bar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0, width: 48 }}>
              <span style={{ fontFamily: typography.fontFamily, fontSize: 10, fontWeight: 400, color: isTop ? colors.accent.teal : '#FFFFFF', lineHeight: 1 }}>
                {row.articles}
              </span>
              <div style={{ width: '100%', height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 500, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${barPct}%`, background: isTop ? colors.accent.teal : 'rgba(255,255,255,0.75)', borderRadius: 500 }} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

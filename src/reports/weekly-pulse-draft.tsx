/**
 * Report: Sacet — Weekly Pulse — Apr 20-26, 2026 (DRAFT)
 *
 * Все слайды (кроме cover, audience, competitive snapshot, demand) собираются
 * по шаблону BarChartList. См. docs/templates/bar-chart-list-slide.md.
 */
import React from 'react'
import { CoverWeeklyPulse } from '../components/slides/CoverWeeklyPulse'
import {
  SacetSoMeInsightsSlideV2,
} from '../components/slides/SacetSoMeInsightsSlideV2'
import type { SoMePost } from '../components/slides/SacetSoMeInsightsSlide'
import {
  BoutiqueReviewsSlide,
  type BoutiqueReview,
} from '../components/slides/BoutiqueReviewsSlide'
import {
  AudienceDynamicsSlide,
  type AudiencePlatform,
} from '../components/slides/AudienceDynamicsSlide'
import {
  CompetitiveSnapshotSlide,
} from '../components/slides/CompetitiveSnapshotSlide'
import {
  DemandRankSlide,
  type DemandRankRow,
} from '../components/slides/DemandRankSlide'

export const REPORT_META = {
  id: 'weekly-pulse-draft',
  title: 'Weekly Pulse · Apr 20-26 (DRAFT)',
  date: '2026-05-05',
}

/* ── Tab 1: Sacet SoMe Insights ───────────────────────────── */
const SACET_SOME_POSTS: SoMePost[] = [
  {
    rank: 1,
    title: 'Prenez rendez-vous dans nos boutiques à Lyon et Paris.',
    source: 'Instagram',
    url: 'https://www.instagram.com/p/DXjLiyPszYg/',
    date: 'Apr 25, 2026',
    engagement: 20,
    engagementRate: '0,5%',
  },
  {
    rank: 2,
    title:
      'Un week-end à flâner dans Lyon, autour de notre nouvelle boutique Sacet.',
    source: 'Instagram',
    url: 'https://www.instagram.com/p/DXgp5sNCcZP/',
    date: 'Apr 24, 2026',
    engagement: 21,
    engagementRate: '0,5%',
  },
  {
    rank: 3,
    title:
      'Un immense merci aux artisans et entreprises qui ont contribué à donner vie à notre nouvelle boutique lyonnaise!',
    source: 'Instagram',
    url: 'https://www.instagram.com/p/DXe17rFk5i9/?img_index=1',
    date: 'Apr 23, 2026',
    engagement: 23,
    engagementRate: '0,6%',
  },
  {
    rank: 4,
    title:
      "Vous vous posez mille questions avant d'acheter une bague de fiançailles ?",
    source: 'Instagram',
    url: 'https://www.instagram.com/p/DXcJs6hCe2A/',
    date: 'Apr 22, 2026',
    engagement: 34,
    engagementRate: '0,9%',
  },
]

/* ── Tab 2: Gemmyo SoMe Insights ──────────────────────────── */
const GEMMYO_SOME_POSTS: SoMePost[] = [
  {
    rank: 1,
    title:
      'Le diamant s’adresse à celles qui affirment leur style avec raffinement et sobriété.',
    source: 'Instagram',
    url: 'https://www.instagram.com/p/DXls2-6u4PV/',
    date: 'Apr 26, 2026',
    engagement: 609,
    engagementRate: '0,1%',
  },
  {
    rank: 2,
    title:
      'Dans notre écrin de Saint-Germain-des-Prés, la collection Gemmyorama s’est dévoilée en avant-première à quelques invitées privilégiées.',
    source: 'Facebook',
    url: 'https://www.facebook.com/reel/1502629194825510',
    date: 'Apr 24, 2026',
    engagement: 5,
    engagementRate: '0,006%',
  },
  {
    rank: 3,
    title:
      'La collection Gemmyorama se fait pétillante et colorée, insufflant fraîcheur et liberté.',
    source: 'Instagram',
    url: 'https://www.instagram.com/p/DXa-Kk-glmQ/?img_index=1',
    date: 'Apr 22, 2026',
    engagement: 449,
    engagementRate: '0,1%',
  },
  {
    rank: 4,
    title:
      'La collection Gemmyorama offre une palette de teintes où chacun peut trouver la pierre qui résonne avec son propre style et sa personnalité.',
    source: 'Instagram',
    date: 'Apr 20, 2026',
    engagement: 489,
    engagementRate: '0,1%',
  },
]

/* ── Tab 3: Sacet Boutique Reviews ────────────────────────── */
const SACET_REVIEWS: BoutiqueReview[] = [
  {
    rank: 1,
    title: 'J’ai eu une excellente expérience chez Sacet.',
    source: 'googlemaps.com',
    url: 'https://www.google.com/maps/reviews/@48.8657406,2.3402194,637m/data=!3m1!1e3!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2xoSkxVNHphRVI2U205RloyOTZhMlZDY25oSGJrRRAB!2m1!1s0x0:0x348df86e7151ad2d!5m1!1e1?entry=ttu',
    location: '8 Rue de la Vrillière, 75001 Paris',
    date: 'Apr 20, 2026',
    starRating: 5,
  },
  {
    rank: 2,
    title:
      'Dès notre arrivée dans la boutique, un coup de cœur qui nous fait oublier le modèle que nous avions à l’esprit pour nos fiançailles.',
    source: 'googlemaps.com',
    url: 'https://www.google.com/maps/reviews/@48.8657406,2.3402194,637m/data=!3m2!1e3!4b1!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2pseWNGOTFUalowVWtwclJUUkpSMUp0YlVOT2VGRRAB!2m1!1s0x0:0x348df86e7151ad2d!5m1!1e1',
    location: '8 Rue de la Vrillière, 75001 Paris',
    date: 'Apr 22, 2026',
    starRating: 5,
  },
  {
    rank: 3,
    title:
      'Je tenais à laisser un avis sur la boutique de Julie et Sacet, que je recommande chaudement et sans la moindre hésitation.',
    source: 'googlemaps.com',
    location: '8 Rue de la Vrillière, 75001 Paris',
    date: 'Apr 22, 2026',
    starRating: 5,
  },
]

/* ── Tab 4: Gemmyo Boutique Reviews ───────────────────────── */
const GEMMYO_REVIEWS: BoutiqueReview[] = [
  {
    rank: 1,
    title:
      "C'est avec plaisir que je donne mon avis sur ma dernière expérience avec Gemmyo Lyon.",
    source: 'googlemaps.com',
    url: 'https://maps.app.goo.gl/j7RfycAhfRmw7NtP8',
    location: '2 Pl. des Célestins, 69002 Lyon',
    date: 'Apr 22, 2026',
    starRating: 5,
  },
  {
    rank: 2,
    title:
      'Les modèles sont jolis mais le service après-vente est médiocre.',
    source: 'googlemaps.com',
    url: 'https://maps.app.goo.gl/Eond2ktsMiyKaoH5A',
    location: '87 Rue de Courcelles, 75017 Paris',
    date: 'Apr 24, 2026',
    starRating: 3,
  },
  {
    rank: 3,
    title: 'Je change mon avis initial de 5 étoiles.',
    source: 'googlemaps.com',
    url: 'https://maps.app.goo.gl/iseAUR51bbkY5rLh8',
    location: '87 Rue de Courcelles, 75017 Paris',
    date: 'Apr 23, 2026',
    starRating: 1,
  },
  {
    rank: 4,
    title:
      "Vous souhaitez offrir un bijou d'exception, signifiant votre amour et représentant cet instant magique de votre demande en mariage.",
    source: 'googlemaps.com',
    url: 'https://maps.app.goo.gl/LrNbA8GEGUHomexd8',
    location: '74 Rue de Seine, 75006 Paris',
    date: 'Apr 24, 2026',
    starRating: 1,
  },
]

/* ── Tab 5: Audience Dynamics ─────────────────────────────── */
const SACET_AUDIENCE: AudiencePlatform[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/sacet_world/',
    start: 3819,
    end: 3822,
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/sacetjewellery',
    start: 1116,
    end: 1118,
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@SacetJewellery',
    start: 9,
    end: 9,
  },
]

/* ── Tabs 6-8: Stock / Ads / Newsletters → CompetitiveSnapshot ── */
const COMPETITIVE_BLOCKS = [
  {
    label: 'Stock & Novelties',
    rows: [{ brand: 'Gemmyo', value: '237', meta: 'Products in stock · Apr 26' }],
    note: 'No data shared by Sacet for this period',
  },
  {
    label: 'Active Meta Ads',
    rows: [
      { brand: 'Sacet', value: 4 },
      { brand: 'Gemmyo', value: 72 },
    ],
    note: 'As of Apr 26, 2026',
  },
  {
    label: 'Newsletters',
    rows: [
      { brand: 'Sacet', value: 0, meta: '—' },
      {
        brand: 'Gemmyo',
        value: 1,
        meta: 'Apr 24 · hello@gemmyo.com',
        subject:
          'Découvrez les rendez-vous design incontournables du Salone del Mobile et de la Milan Design Week',
      },
    ],
    note: 'Sent during the period',
  },
]

/* ── Tab 9: Demand × Products ─────────────────────────────── */
const DEMAND_KEYWORDS: DemandRankRow[] = [
  { rank: 1, label: 'alliances', volume: 60500, trend: '0%' },
  { rank: 2, label: 'bagues de fiançailles', volume: 60500, trend: '-18%' },
  { rank: 3, label: 'bagues en or', volume: 27100, trend: '0%' },
  { rank: 4, label: 'colliers en diamants', volume: 5400, trend: '0%' },
  { rank: 5, label: 'bijoux en diamants', volume: 3600, trend: '-70%' },
  { rank: 6, label: 'bandes', volume: 720, trend: '+22%' },
  { rank: 7, label: 'bijoux de mariée', volume: 590, trend: '-41%' },
  { rank: 8, label: 'accessoires de luxe', volume: 210, trend: '+24%' },
  { rank: 9, label: 'diamants éthiques', volume: 170, trend: '+23%' },
  { rank: 10, label: "boucles d'oreilles en diamants", volume: 20, trend: '0%' },
]

/* ── Tab 10: Demand × Brands ──────────────────────────────── */
const DEMAND_BRANDS: DemandRankRow[] = [
  { rank: 1, label: 'Gemmyo', volume: 33100, trend: '0%' },
  { rank: 2, label: 'Zeina Alliances', volume: 5400, trend: '+22%' },
  { rank: 3, label: 'Amantys', volume: 3600, trend: '+52%' },
  { rank: 4, label: 'Deloison', volume: 3600, trend: '+52%' },
  { rank: 5, label: 'Sacet', volume: 880, trend: '+324%', highlight: true },
]

export const SLIDES: { id: string; element: React.ReactElement }[] = [
  {
    id: 'cover',
    element: <CoverWeeklyPulse />,
  },
  {
    id: 'sacet-some',
    element: (
      <SacetSoMeInsightsSlideV2
        title="Sacet Social Media Insights"
        posts={SACET_SOME_POSTS}
        totalLabel="4 total posts on Instagram & Facebook"
        showThumbnails={false}
      />
    ),
  },
  {
    id: 'gemmyo-some',
    element: (
      <SacetSoMeInsightsSlideV2
        title="Gemmyo Social Media Insights"
        posts={GEMMYO_SOME_POSTS}
        totalLabel="7 total posts on Instagram & Facebook (top 4 shown)"
        showThumbnails={false}
      />
    ),
  },
  {
    id: 'sacet-reviews',
    element: (
      <BoutiqueReviewsSlide
        title="Sacet Boutique Reviews"
        reviews={SACET_REVIEWS}
        averageRating={5}
        totalLabel="3 reviews on Google Maps · Av. Rating 5/5"
      />
    ),
  },
  {
    id: 'gemmyo-reviews',
    element: (
      <BoutiqueReviewsSlide
        title="Gemmyo Boutique Reviews"
        reviews={GEMMYO_REVIEWS}
        averageRating="2,5"
        totalLabel="4 reviews on Google Maps · Av. Rating 2,5/5"
      />
    ),
  },
  {
    id: 'audience',
    element: (
      <AudienceDynamicsSlide
        title="Audience Dynamics"
        brand="Sacet"
        period="Apr 20–26, 2026"
        platforms={SACET_AUDIENCE}
      />
    ),
  },
  {
    id: 'competitive',
    element: (
      <CompetitiveSnapshotSlide
        title="Competitive Snapshot"
        subtitle="Stock · Active ads · Newsletters · Apr 20–26, 2026"
        blocks={COMPETITIVE_BLOCKS}
      />
    ),
  },
  {
    id: 'demand-keywords',
    element: (
      <DemandRankSlide
        title="Top Jewelry Keywords"
        subtitle="France · monthly avg search volume · 12-month trend"
        rows={DEMAND_KEYWORDS}
        labelColumnHeader="Keyword (FR)"
      />
    ),
  },
  {
    id: 'demand-brands',
    element: (
      <DemandRankSlide
        title="Top Brands"
        subtitle="France · monthly avg search volume · 12-month trend · Sacet highlighted"
        rows={DEMAND_BRANDS}
        labelColumnHeader="Brand"
      />
    ),
  },
]

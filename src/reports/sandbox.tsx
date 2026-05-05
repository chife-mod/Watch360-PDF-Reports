/**
 * Sandbox — экспериментальные / альтернативные варианты слайдов.
 *
 * Здесь живут отвергнутые или WIP-варианты, чтобы клиенту в основном
 * Weekly Pulse отчёте не было путаницы.
 */
import React from 'react'
import {
  SacetSoMeInsightsSlide,
  type SoMePost,
} from '../components/slides/SacetSoMeInsightsSlide'
import { SacetSoMeInsightsSlideV3 } from '../components/slides/SacetSoMeInsightsSlideV3'

export const REPORT_META = {
  id: 'sandbox',
  title: 'Sandbox · Variants',
  date: '2026-05-05',
}

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

export const SLIDES: { id: string; element: React.ReactElement }[] = [
  {
    id: 'sandbox-some-v1',
    element: (
      <SacetSoMeInsightsSlide
        posts={SACET_SOME_POSTS}
        totalLabel="V1 — list (rejected)"
      />
    ),
  },
  {
    id: 'sandbox-some-v3',
    element: (
      <SacetSoMeInsightsSlideV3
        posts={SACET_SOME_POSTS}
        totalLabel="V3 — cards + radial (rejected)"
      />
    ),
  },
]

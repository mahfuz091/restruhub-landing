@AGENTS.md

# RestruHub

SaaS landing page for restaurant review management. Helps restaurants reply to reviews, understand customer sentiment, protect ratings.

## Stack

- Next.js 16 + Turbopack
- Tailwind CSS v4
- TypeScript

## Design System

Tokens in `src/app/globals.css` `:root`:
- Brand: `--color-brand` (#00b67a), `--color-brand-deep` (#005128)
- Accent: `--color-accent` (#ee6a1f), `--color-warning` (#ffbf0f)
- Text: `--color-ink`, `--color-ink-soft`
- Neutrals: `--color-mute`, `--color-line`, `--color-card`, `--color-surface`

Fonts loaded via `next/font/google` in `layout.tsx`:
- **Poppins** (`--font-poppins`) — body/sans
- **Radio Canada Big** (`--font-radio-canada-big`) — display/headings

Use `@theme inline` tokens (e.g. `text-ink`, `bg-brand`) not hardcoded values.

## Components

- `src/components/Navbar.tsx` — site navigation
- `src/components/Hero.tsx` — headline, CTAs, review cards
- `src/components/ReviewCard.tsx` — review with ratings + owner reply
- `src/components/Icons.tsx` — shared SVG icons

## Button Hover Convention

CTA buttons use Calypso-style hover (circular blob fill + text bounce). No glossy/shiny/glow effects.

Structure: `a.btn-cta > span.btn-cta__inner > span.btn-cta__text > [span + span.btn-arrow]`

Variants: `.btn-cta--primary` (green), `.btn-cta--secondary` (grey).

## Assets

Image assets in `public/images/` — subdirectories for: avatars, steps, pricing-table, software, featured, footer, hurting, improvement, review-section, restaurant-icons.

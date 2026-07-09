# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

### Button

`components/ui/button.tsx`

Hand-built primitive (not shadcn CLI-generated — see Notes in progress-tracker.md). Exports `Button` and `buttonVariants(variant)` so the same classes can be applied to a `<button>` or a `next/link` `<Link>` used as a CTA.

Variants:

- `dark` — `bg-text-primary text-white hover:opacity-90`. Used for every primary CTA on the homepage (nav "Start for free", hero/CTA "Get Started"). Not in ui-tokens.md's original Buttons spec (which only defines purple `accent` as primary) — introduced because the delivered design's homepage CTAs are near-black, not purple. Built from the existing `--color-text-primary` token, never a hardcoded hex.
- `secondary` — `bg-surface border border-border text-text-primary hover:bg-surface-secondary`. Matches ui-tokens.md's Secondary button spec exactly.

Base classes: `inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors`.

### Navbar

`components/layout/Navbar.tsx`

Full width, `bg-surface`, inner content capped at `max-w-[1440px]`, `h-16`. Logo image (`/logo.png`, bakes in icon + wordmark) links to `/`. Nav items (Dashboard, Find Jobs, Profile) use `text-text-dark` — switch to `text-accent` for the active route once route-aware active state is wired up (not needed on the homepage itself, since none of the three items are ever active there). "Start for free" uses `buttonVariants("dark")` linking to `/login`.

### Footer

`components/layout/Footer.tsx`

`border-t border-border bg-surface`, same `max-w-[1440px]` content width as Navbar. Logo left, links right (Dashboard, Privacy Policy, Terms & Condition) in `text-text-secondary`.

### Hero

`components/homepage/Hero.tsx`

Gradient hero card: `bg-gradient-to-br from-accent-light via-background to-info-light` (token-based approximation of the design's pastel mesh gradient — no pink token exists in ui-tokens.md, so purple/blue tokens are blended instead). Headline + subhead centered, two CTAs (`dark` + `secondary` button variants). Dashboard preview screenshot (`/images/dashboard-demo.png`, browser chrome and glow already baked into the asset) sits in a `border border-border` card with `-mt-12`/`-mt-16` to overlap the gradient card above it.

### Features

`components/homepage/Features.tsx`

Two alternating two-column rows (`grid lg:grid-cols-2`), image side order flips with `lg:order-1`/`lg:order-2`. Each row: heading + a `FeatureList` of 3 items, each with a `border-l-2` accent strip — `border-accent` on the highlighted item, `border-border-muted` on the rest. Row 1 pairs with `/images/jobs-lists.png`, row 2 with `/images/agnet-log.png`.

### Testimonial

`components/homepage/Testimonial.tsx`

Centered single quote. "Success Stories" eyebrow label in `text-accent uppercase`. Avatar image (`/images/user-icon.png`) rendered `rounded-full`.

### CTASection

`components/homepage/CTASection.tsx`

Same gradient-card pattern as Hero (reversed gradient direction: `from-info-light ... to-accent-light`), same two CTA buttons. Bottom-of-page conversion banner before the Footer.

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

Full width, `bg-surface`, inner content capped at `max-w-[1440px]`, `h-16`. Logo image (`/logo.png`, bakes in icon + wordmark) links to `/`. Nav items (Dashboard, Find Jobs, Profile) use `text-text-dark` — switch to `text-accent` for the active route once route-aware active state is wired up (not needed on the homepage itself, since none of the three items are ever active there). "Start for free" uses `buttonVariants("dark")`, linking to `/dashboard` if `isAuthenticated` (prop, computed server-side in `app/page.tsx` via `createInsforgeServer()`) else `/login`.

### Footer

`components/layout/Footer.tsx`

`border-t border-border bg-surface`, same `max-w-[1440px]` content width as Navbar. Logo left, links right (Dashboard, Privacy Policy, Terms & Condition) in `text-text-secondary`.

### Hero

`components/homepage/Hero.tsx`

Gradient hero card: `bg-gradient-to-br from-accent-light via-background to-info-light` (token-based approximation of the design's pastel mesh gradient — no pink token exists in ui-tokens.md, so purple/blue tokens are blended instead). Headline + subhead centered, two CTAs (`dark` + `secondary` button variants), both linking to `/dashboard` if `isAuthenticated` (prop) else `/login`. Dashboard preview screenshot (`/images/dashboard-demo.png`, browser chrome and glow already baked into the asset) sits in a `border border-border` card with `-mt-12`/`-mt-16` to overlap the gradient card above it.

### Features

`components/homepage/Features.tsx`

Two alternating two-column rows (`grid lg:grid-cols-2`), image side order flips with `lg:order-1`/`lg:order-2`. Each row: heading + a `FeatureList` of 3 items, each with a `border-l-2` accent strip — `border-accent` on the highlighted item, `border-border-muted` on the rest. Row 1 pairs with `/images/jobs-lists.png`, row 2 with `/images/agnet-log.png`.

### Testimonial

`components/homepage/Testimonial.tsx`

Centered single quote. "Success Stories" eyebrow label in `text-accent uppercase`. Avatar image (`/images/user-icon.png`) rendered `rounded-full`.

### Login Page

`app/(auth)/login/page.tsx`

Centered auth card: `w-full max-w-sm rounded-2xl border border-border bg-surface p-6` with the ui-rules.md card shadow, vertically/horizontally centered in a `min-h-screen bg-background` wrapper. Logo, heading, and two OAuth buttons each rendered as `<Button variant="secondary" className="w-full gap-2">` inside a `<form action={signInWithGoogle|signInWithGithub}>` (Server Actions, not client handlers). Error banner (`?error=` search param) uses `bg-error/10 text-error`.

`components/ui/GoogleIcon.tsx` / `components/ui/GitHubIcon.tsx` — local inline-SVG brand marks. lucide-react ships no brand/logo icons, so these aren't sourced from the icon library; Google's mark keeps its official 4-color brand palette hardcoded in the SVG paths (not Tailwind classes) since that's a fixed brand asset, not a themeable design-system color.

### ComingSoon

`components/layout/ComingSoon.tsx`
Last updated: 2026-07-09

Temporary placeholder for routes not built yet (`/dashboard`, `/profile`, `/find-jobs`, `/find-jobs/[id]` — see Notes in progress-tracker.md). Centered card, same shape as the Login page card: `w-full max-w-sm rounded-2xl border border-border bg-surface p-6` with the ui-rules.md card shadow, centered in a `min-h-screen bg-background` wrapper.

| Property         | Class                                                             |
| ---------------- | ------------------------------------------------------------------ |
| Page background  | `bg-background` (`main`, `min-h-screen`, centered flex)            |
| Card background  | `bg-surface`                                                       |
| Card border      | `border border-border`                                             |
| Card radius      | `rounded-2xl`                                                      |
| Card shadow      | `shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]` (ui-rules.md card shadow — same arbitrary value as Login page card) |
| Card padding     | `p-6`, `text-center`                                               |
| Title (h1)       | `text-base font-semibold text-text-primary`                        |
| Body text        | `mt-1 text-xs text-text-muted`                                     |
| CTA              | `mt-6`, `buttonVariants("secondary")` on a `Link` back to `/`      |
| Accent usage     | none                                                                |

**Pattern notes:** No Navbar/Footer — intentionally distinct from real pages so it reads as a stand-in, not a finished page. Title/body text sizing matches ui-rules.md's Empty State pattern (short muted description + one CTA), not the Section Heading/Body Text hierarchy used on real content pages. Takes a `title` prop only. Delete each usage once its real page is built (see progress-tracker.md Notes for the phase → route mapping).

### CTASection

`components/homepage/CTASection.tsx`

Same gradient-card pattern as Hero (reversed gradient direction: `from-info-light ... to-accent-light`), same two CTA buttons, same `isAuthenticated` prop → `/dashboard`/`/login` link logic as Hero. Bottom-of-page conversion banner before the Footer.

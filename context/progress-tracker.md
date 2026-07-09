# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 1 — Foundation
**Last completed:** 01 Homepage
**Next:** 02 Auth

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [ ] 02 Auth
- [ ] 03 PostHog Initialization
- [ ] 04 Database Schema

### Phase 2 — Profile Page

- [ ] 05 Profile Page — Full UI
- [ ] 06 Profile Save Logic
- [ ] 07 AI Profile Extraction from Resume
- [ ] 08 Resume PDF Generation from Profile

### Phase 3 — Find Jobs Page

- [ ] 09 Find Jobs Page — Full UI
- [ ] 10 Adzuna Job Discovery
- [ ] 11 Filter + Sort + Pagination

### Phase 4 — Job Details Page

- [ ] 12 Job Details Page — Full UI
- [ ] 13 Company Research Agent

### Phase 5 — Dashboard

- [ ] 14 Dashboard Page — Full UI
- [ ] 15 Stats Bar — Real Data
- [ ] 16 Recent Activity — Real Data
- [ ] 17 Analytics Charts — PostHog Data

---

## Decisions Made During Build

- Homepage CTA buttons use a new `dark` Button variant (near-black, `bg-text-primary`) instead of the purple `accent` primary button defined in ui-tokens.md — the delivered `landing-page.png` design shows black CTAs on the homepage, not purple. Purple `accent` remains reserved for in-app primary actions per ui-tokens.md. See ui-registry.md → Button.
- Hero/CTASection gradients approximate the design's pastel mesh using existing `accent-light`/`info-light`/`background` tokens (blended via `bg-gradient-to-br`), since no pink token exists in ui-tokens.md and hardcoding a new hex is against the Rules That Never Change.
- Get Started / Start for free / Find Your First Match all link to `/login` for now — auth (Feature 02) isn't built yet, so the "redirect to /dashboard if authenticated" branch from build-plan.md doesn't apply until session state exists.

---

## Notes

- Fixed a misplaced asset folder: images were nested at `public/public/` (logo.png, images/) instead of `public/`. Moved to `public/logo.png` and `public/images/*` so Next.js serves them at the expected root paths.
- Ran `npx shadcn@latest init`, which scaffolded a "base-nova" style Button on `@base-ui/react` + `class-variance-authority` and appended a competing `@theme inline` + `:root`/`.dark` block to `app/globals.css` that shadowed the project's `--color-accent`/`--color-border` tokens with generic shadcn grayscale values, and installed several packages not on the approved dependency list in code-standards.md. Reverted `app/globals.css`, `package.json`, and `package-lock.json`, removed `components.json`, and hand-built `components/ui/button.tsx` directly against this project's own `@theme` tokens instead. `lucide-react` (already approved) was added separately and cleanly.

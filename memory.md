# Memory — Homepage Build (Feature 01)

Last updated: 2026-07-09

## What was built

- `components/ui/button.tsx` — hand-built `Button` + `buttonVariants("dark" | "secondary")`. Not shadcn-CLI-generated.
- `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`
- `components/homepage/Hero.tsx`, `Features.tsx`, `Testimonial.tsx`, `CTASection.tsx`
- `app/page.tsx` — composes Navbar, Hero, Features, Testimonial, CTASection, Footer
- Moved misplaced assets from `public/public/*` to `public/*` (logo.png, images/dashboard-demo.png, jobs-lists.png, agnet-log.png, user-icon.png)
- Updated `context/ui-registry.md` (full component entries) and `context/progress-tracker.md` (01 Homepage checked off, Phase 1, Next: 02 Auth)

## Decisions made

- Homepage CTAs use a new `dark` Button variant (`bg-text-primary text-white`) instead of the purple `accent` primary button from ui-tokens.md — the delivered `landing-page.png` shows near-black CTAs on the homepage. Purple `accent` stays reserved for in-app primary actions. Documented in ui-registry.md.
- Hero/CTASection gradients approximate the design's pastel mesh using existing tokens only (`from-accent-light via-background to-info-light`) — no pink token exists in ui-tokens.md, so hardcoding a new hex was avoided.
- All CTA buttons currently link to `/login` — auth (Feature 02) isn't built yet, so the "redirect to /dashboard if authenticated" branch from build-plan.md doesn't apply yet.

## Problems solved

- `npx shadcn@latest init` (this project's "base-nova" style) clobbered `app/globals.css` by appending a competing `@theme inline` + `:root`/`.dark` block that shadowed the project's `--color-accent` / `--color-border` tokens with generic grayscale values, and installed unapproved packages (`@base-ui/react`, `class-variance-authority`, `tw-animate-css`, `shadcn`, `tailwind-merge`). It also pre-scaffolded a `components/ui/button.tsx` built on those same unapproved deps. Reverted `app/globals.css`, `package.json`, `package-lock.json`; removed `components.json`; rewrote `button.tsx` by hand against the project's own `@theme` tokens. Kept `lucide-react` (already on the approved dependency list in code-standards.md).
- Fixed the misplaced `public/public/` nesting so Next.js actually serves the images.

## Current state

- Homepage renders (per user's screenshot) but does **not yet match the design**: user reported the hero section's padding is off and the corners are not rounded compared to `context/designs/landing-page.png`. This is unfixed as of this save — next session must open `components/homepage/Hero.tsx` (and check `CTASection.tsx`, same gradient-card pattern) and correct the `rounded-3xl` / padding values against the reference image.
- **Unresolved font conflict:** the user hand-edited `app/layout.tsx` outside of my tool calls, mid-session, to import `Geist` from `next/font/google` (in addition to `Inter`) and apply `geist.variable` as the `--font-sans` class on `<html>`, plus wrapped the className in a `cn()` call. This directly conflicts with `context/ui-tokens.md` / `context/ui-rules.md`, which mandate Inter as the only font (`--font-sans: "Inter", sans-serif`). I restored `lib/utils.ts` with a minimal, dependency-free `cn()` helper (no clsx/tailwind-merge, to stay within code-standards.md's approved dependency list) because the user explicitly asked to "add back cn" — but I did **not** touch the Geist import, since that was the user's own live edit and not mine to silently revert. **This needs an explicit decision from the user**: keep Geist (and update ui-tokens.md/ui-rules.md accordingly) or go back to Inter-only.
- Two dev servers were involved this session: one on port 3000 (PID 25076) that I did **not** start — it predates this session and I should not kill it without asking. My own attempt on port 3001 was interrupted/died before I could screenshot through it.
- I was mid-way through installing Playwright's Chromium (`npx playwright install chromium`) to take a verification screenshot when the user interrupted and pasted their own comparison screenshots instead (mine vs. the design), pointing out the padding/corner-radius mismatch.

## Next session starts with

1. Fix `components/homepage/Hero.tsx` padding and `rounded-3xl` so the gradient card matches `context/designs/landing-page.png` exactly (check both the Tailwind classes and whether a parent element is clipping the rounded corners). Apply the same fix to `components/homepage/CTASection.tsx` if it has the same issue (same gradient-card pattern).
2. Ask the user to resolve the Inter-vs-Geist font conflict in `app/layout.tsx` before further UI work, since it contradicts the mandatory ui-tokens.md spec.
3. Re-verify visually — ask the user for a fresh screenshot after the fix, or set up a local screenshot workflow (chromium-cli isn't installed on this machine; Playwright browser download was interrupted mid-install).

## Open questions

- Inter (per ui-tokens.md) or Geist (per the user's live layout.tsx edit) — which is the actual intended project font? ui-tokens.md needs updating either way to stop future drift.
- Should `lib/utils.ts`'s `cn()` stay dependency-free, or does the user want `clsx` + `tailwind-merge` added properly (which would require adding them to the approved dependency list in `context/code-standards.md` first, per that file's own rule)?

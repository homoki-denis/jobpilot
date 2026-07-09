# Memory — Auth Review, Config Fixes & ComingSoon Placeholders

Last updated: 2026-07-09

## What was built

This session picked up after Feature 02 (Auth — Google/GitHub OAuth via InsForge) had already been built in a prior, unmemoried session. Work done this session:

- Reviewed the Auth feature (`/review`) against `build-plan.md`, `architecture.md`, `code-standards.md`, `ui-tokens.md`.
- Fixed issues from that review:
  - `.gitignore` — added `.mcp.json` (contains a plaintext InsForge API key, was not previously ignored).
  - `app/page.tsx` — now checks the session server-side via `createInsforgeServer()` and passes `isAuthenticated` down to `Navbar`, `Hero`, `CTASection`.
  - `components/layout/Navbar.tsx`, `components/homepage/Hero.tsx`, `components/homepage/CTASection.tsx` — CTAs now link to `/dashboard` if authenticated, `/login` otherwise (previously hardcoded to `/login` always).
  - `context/architecture.md` — corrected a stale comment claiming `components/ui/` is "shadcn/ui components only" (it also holds hand-built primitives: `button.tsx`, `GoogleIcon.tsx`, `GitHubIcon.tsx`).
- Diagnosed the "Sign in failed" bug (`/recover`) — root cause found but **the fix was never applied** (see Current State).
- Diagnosed and fixed a 404 on `/dashboard` (`/recover`) — built `components/layout/ComingSoon.tsx` and minimal placeholder pages at `app/dashboard/page.tsx`, `app/profile/page.tsx`, `app/find-jobs/page.tsx`, `app/find-jobs/[id]/page.tsx`.
- Reviewed the ComingSoon feature (`/review`) — passed clean, no blocking issues.
- Ran `/imprint` on `ComingSoon` — full pattern table (background/border/radius/text/spacing/shadow) added to `context/ui-registry.md`.
- Updated `context/progress-tracker.md` (decisions log + a new Notes entry mapping each placeholder route to the real build-plan phase that should replace it).

## Decisions made

- Homepage auth-awareness lives in `app/page.tsx` (a single server-side `getCurrentUser()` call), not duplicated per-component — `isAuthenticated` is just a boolean prop passed down. Reuse this pattern if other marketing surfaces need the same treatment.
- `ComingSoon` placeholders intentionally exclude Navbar/Footer so they read as obvious stand-ins, not finished pages. Each one must be deleted when its real page ships: `/profile` → Phase 05, `/find-jobs` → Phase 09, `/find-jobs/[id]` → Phase 12, `/dashboard` → Phase 14.
- Chose **not** to attempt fixing InsForge's `allowedRedirectUrls` via `run-raw-sql` against InsForge's internal tables — no MCP tool exposes writing that setting, and treating it as a manual, dashboard-gated change was judged safer than improvising a write to a system I don't fully control.

## Problems solved

- Diagnosed (but did **not** apply) the root cause of "Sign in failed. Please try again.": `.env.local`'s `NEXT_PUBLIC_INSFORGE_URL` holds the InsForge **API key** (`[REDACTED_API_KEY]`) instead of the actual backend URL. Confirmed by cross-referencing `.mcp.json`'s `API_BASE_URL` value and the existing (correct) `INSFORGE_PROJECT_URL` entry already in `.env.local`. Correct value: `https://7ubd3623.eu-central.insforge.app`.
- Closed a secret-leak risk: `.mcp.json` was untracked and not gitignored. Confirmed via `git log --all -- .mcp.json` that it was never actually committed in either existing commit (`2665c37`, `3fa8b10`), so no history rewrite was needed — just added to `.gitignore` going forward.
- Diagnosed the `/dashboard` 404 as an expected gap, not a bug: the route is protected by `proxy.ts` and linked from the Navbar, but its real UI (build-plan Phase 14) was never built. Same root cause applies to `/profile`, `/find-jobs`, `/find-jobs/[id]`.

## Current state

- **`.env.local`'s `NEXT_PUBLIC_INSFORGE_URL` is still wrong as of this save.** I diagnosed it during `/recover` and proposed the fix, but the conversation moved on to `/review` before I made the edit or got explicit confirmation. OAuth sign-in is very likely still broken until this is corrected — **confirm with the user whether they applied it manually** before assuming it's still broken.
- **InsForge backend's `allowedRedirectUrls` is still empty** (confirmed via `get-backend-metadata` this session). Even after the env var is fixed, OAuth callbacks will be rejected until `http://localhost:3000/callback` is added via the InsForge dashboard. No MCP tool can write this — it's a manual step only the user can do.
- Auth feature (Feature 02) code itself passed review clean — architecture, tokens, error handling all correct. The only blockers are the two config issues above, not the code.
- Homepage now routes CTAs to `/dashboard` or `/login` based on real session state.
- `/dashboard`, `/profile`, `/find-jobs`, `/find-jobs/[id]` show a `ComingSoon` card instead of 404ing — temporary, tracked in `progress-tracker.md` Notes.
- `.mcp.json` is gitignored now and confirmed never present in git history.
- `progress-tracker.md` still shows Feature 02 (Auth) as the last completed phase; next unbuilt feature is **03 PostHog Initialization**.

## Next session starts with

1. Confirm whether `.env.local`'s `NEXT_PUBLIC_INSFORGE_URL` has already been hand-fixed. If not, change it to `https://7ubd3623.eu-central.insforge.app`, restart the dev server, and verify OAuth completes end to end.
2. Ask whether `http://localhost:3000/callback` has been added to InsForge's `allowedRedirectUrls` via the dashboard — OAuth will still fail otherwise even with #1 fixed.
3. Once auth is verified working end to end, move to build-plan Feature 03 — PostHog Initialization (`lib/posthog-client.ts`, `lib/posthog-server.ts`, root layout provider, `identify()`/`reset()` wiring on login/logout).

## Open questions

- Has the user already fixed the `.env.local` URL value outside this conversation? Never got explicit confirmation either way.
- Has `allowedRedirectUrls` been updated on the InsForge dashboard yet?
- Does the user want to build out Profile/Find Jobs/Dashboard real UI (Phases 2, 3, 5) before or after PostHog (Feature 03)? `build-plan.md` orders PostHog next — confirm that's still the intended sequence.

---
name: Miscurin Sprint 1 & 2 setup
description: Key architectural decisions from Sprint 1 (auth foundation) and Sprint 2 (design system) of the Miscurin platform.
---

## Sprint 1 — Auth Foundation

### Supabase env guard
`isSupabaseConfigured()` in `src/lib/supabase/config.ts` returns null-safe clients.
All callers check for null. App shows "Not connected" warning rather than crashing.
**Why:** Replit env vars may be absent during cold starts; crashing the app is worse than degraded mode.

### Role authority model
Roles (`customer`, `staff`, `founder`) stored in `public.profiles.role` with a CHECK constraint + DB trigger.
No client-side role self-assignment. Default role is `customer`, auto-assigned on registration.
**Why:** Client-side role claims are a security anti-pattern; enforce at DB layer.

### Open-redirect allowlist
`isSafeRedirect()` in `src/utils/url.ts` validates `?redirectTo` against `SAFE_REDIRECT_PREFIXES` in `src/constants/routes.ts`.
Imported by both `src/middleware.ts` and `LoginForm.tsx`.
**Why:** Open-redirect vulnerabilities are trivial to exploit; allowlist is the only safe pattern.

---

## Sprint 2 — Design System

### Component prop conventions (learned from tsc errors)
- `Alert` uses `variant` + `message` props, NOT `type` + children.
- `Badge` variant union is `default | brand | success | warning | error | info | outline` (no `primary`).
- `Chip` uses `variant` prop, NOT `color`.
- `Checkbox` extends `InputHTMLAttributes` — use `onChange` (not `onCheckedChange`); static checkboxes need `readOnly`.
- `RadioGroup` has NO built-in `value`/`onChange` — control via native `checked`/`onChange` on each `Radio`.
- `EmptyState` uses `action` (not `primaryAction`) for the primary CTA.
- `Icon` `IconName` union does NOT include: `home`, `bag`, `warning`, `unlock`, `logout`, `phone`, `share`.
  Correct equivalents: `shopping-bag`, `alert-triangle`, `alert-circle`, `lock`.
**Why:** Durable reminder — showcase page hit all these mismatches; check component files before using in new pages.

### Toast system
`ToastProvider` wraps the root layout. `useToast()` is the hook for client components.
`Toaster` renders via React portal at `z-[500]`. Duration 0 = persistent.
**Why:** Portal ensures toasts overlay modals/drawers correctly.

### next/image remote patterns
Any external image hostname used with `<Image>` must be added to `next.config.ts` under `images.remotePatterns`.
Unsplash (`images.unsplash.com`) is already added.
**Why:** Next.js throws at runtime (not build time) if the hostname is missing.

### Design system route
`/design-system` is a public route (no auth group). Layout adds the internal-reference banner.
All 19 sections are interactive (toasts, modal, drawer fire live).

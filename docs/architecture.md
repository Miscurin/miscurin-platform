# Architecture

## Overview

Miscurin is a Next.js 15 App Router application using Supabase for authentication and data storage. All auth is server-side — no tokens are stored in `localStorage`.

---

## Request Flow

```
Browser Request
      │
      ▼
 src/middleware.ts
      │
      ├── Is route protected?
      │     ├── No  → pass through
      │     └── Yes → check Supabase session cookie
      │                   ├── Valid → allow
      │                   └── Invalid → redirect /login
      │
      ▼
 Route Group Layout
      │
      ├── (auth)/layout.tsx     — centered auth shell
      └── (protected)/layout.tsx — fetch user, redirect if invalid
      │
      ▼
 Page Component (RSC)
      │
      ├── Server Components: use src/lib/supabase/server.ts
      └── Client Components: use src/lib/supabase/client.ts
```

---

## Route Groups

| Group | Path prefix | Purpose |
|---|---|---|
| `(auth)` | `/login`, `/register`, etc. | Unauthenticated pages. Redirects to `/dashboard` if already signed in. |
| `(protected)` | `/dashboard`, `/account`, etc. | Requires a valid Supabase session. Redirects to `/login` if not. |

---

## Supabase Helpers

Three files in `src/lib/supabase/`:

| File | Context | Notes |
|---|---|---|
| `client.ts` | Browser (Client Components) | Uses `createBrowserClient`. Returns `null` when unconfigured. |
| `server.ts` | Server (RSC, Server Actions, Route Handlers) | Uses `createServerClient` with cookie store. Returns `null` when unconfigured. |
| `config.ts` | Both | `isSupabaseConfigured()` guard. All callers check for null before use. |

The null-return pattern means the app renders a clear warning UI instead of crashing when environment variables are missing.

---

## Component Architecture

```
src/components/
├── ui/          Primitive, stateless UI atoms. No business logic.
│                Button, Input, Label, Card, Alert, Logo, Divider.
│
├── auth/        Auth form components (Client Components).
│                Own their form state; call Supabase client directly.
│                Display warning banner when Supabase is unconfigured.
│
└── layout/      Structural components.
                 ProtectedNav: sticky header with avatar and sign-out.
```

---

## Middleware

`src/middleware.ts` runs on every matched request. It:

1. Checks `isSupabaseConfigured()` — skips auth check if not configured
2. Refreshes the Supabase session cookie (keeps sessions alive)
3. Redirects unauthenticated users away from protected routes
4. Redirects authenticated users away from auth routes
5. Validates `?redirectTo` query params against an explicit allowlist to prevent open redirect attacks

The allowlisted redirect destinations are: `/dashboard`, `/account`, `/admin`.

---

## Role Authority

Roles are stored in `public.profiles.role`. The column has a `CHECK` constraint: only `customer`, `staff`, `founder` are accepted.

- `customer` — assigned automatically via a database trigger on signup
- `staff` and `founder` — can only be set by a Founder editing the `profiles` table directly or via an admin tool

The registration form hardcodes `role = 'customer'`. There is no client-side path to self-assign an elevated role.

---

## Environment Guard Pattern

Every Supabase helper returns `null` when env vars are absent or placeholder. Callers handle null explicitly:

```typescript
const supabase = createClient()
if (!supabase) {
  // show warning UI, return early, or redirect
}
```

This pattern prevents runtime crashes in environments where credentials haven't been configured yet, and produces actionable UI feedback instead of a 500 error.

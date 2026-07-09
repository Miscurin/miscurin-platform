# Development Guide

---

## Prerequisites

- Node.js 20+
- npm 10+
- A Supabase project (free tier works fine)
- Git

---

## Local Setup

```bash
# 1. Clone
git clone https://github.com/Miscurin/miscurin-platform.git
cd miscurin-platform

# 2. Install dependencies
npm install

# 3. Copy env template
cp .env.example .env.local
# Fill in your Supabase URL and anon key

# 4. Start the dev server
npm run dev
# → http://localhost:5000
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Your Supabase anon (public) key |

Both are available in Supabase → Project Settings → API.

When env vars are missing, the app renders a "Not connected" warning on auth pages instead of crashing. This is intentional — see the [architecture docs](./architecture.md) for the env guard pattern.

---

## Folder Conventions

| Folder | Convention |
|---|---|
| `src/app/` | Pages and layouts only. No business logic. |
| `src/components/ui/` | Stateless primitives. No Supabase calls, no routing. |
| `src/components/auth/` | Auth forms. Client Components (`'use client'`). |
| `src/components/layout/` | Shell, nav, header components. |
| `src/actions/` | Next.js Server Actions. One file per domain. |
| `src/hooks/` | Custom React hooks. Client-side only. |
| `src/lib/` | External service integrations (Supabase, etc.). |
| `src/utils/` | Pure functions. No side effects, no imports from `lib/`. |
| `src/types/` | Shared TypeScript types and interfaces. |

---

## Naming Conventions

- **Components**: PascalCase (`LoginForm.tsx`, `ProtectedNav.tsx`)
- **Utilities / hooks**: camelCase (`useAuth.ts`, `formatDate.ts`)
- **Types**: PascalCase interfaces (`UserProfile`, `AuthFormState`)
- **Route folders**: lowercase with hyphens (`forgot-password/`)
- **Server Actions**: camelCase functions, one file per domain (`auth.ts`, `products.ts`)

---

## Adding a New Protected Page

1. Create `src/app/(protected)/<page-name>/page.tsx`
2. The `(protected)/layout.tsx` handles auth — no extra auth code needed in the page
3. If the page needs the current user, read it from `layout.tsx` props or call `supabase.auth.getUser()` in the page itself

---

## Adding a New UI Component

1. Create `src/components/ui/MyComponent.tsx`
2. Keep it stateless — accept props, return JSX
3. Use Tailwind only — no inline styles
4. Export as named export: `export function MyComponent(...)`

---

## Scripts

```bash
npm run dev      # Dev server on :5000 with hot reload
npm run build    # Production build (outputs to .next/)
npm run start    # Serve the production build on :5000
npm run lint     # ESLint (non-interactive, CI-safe)
```

---

## Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code only |
| `dev` | Integration branch for sprint work |
| `feat/<name>` | Feature branches — merge into `dev` via PR |
| `fix/<name>` | Bug fix branches |

All merges to `main` go through a pull request. Direct pushes to `main` are for repository setup only.

---

## Code Quality

- **TypeScript strict mode** — all files must type-check with `npx tsc --noEmit`
- **ESLint** — `npm run lint` must pass before merging
- **No `any`** — use proper types or `unknown` with narrowing
- **No secrets in source** — all credentials via environment variables

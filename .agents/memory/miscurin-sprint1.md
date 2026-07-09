---
name: Miscurin Sprint 1 Foundation
description: Durable decisions and constraints from Sprint 1 — roles, security, and Supabase integration patterns.
---

# Miscurin Sprint 1 Foundation

## Role model authority
Public registration is locked to 'customer'. Staff/Founder roles are assigned by a Founder via the `profiles` table. Never trust `user_metadata.role` for authorization — always read role from a server-side `profiles` query under RLS.

**Why:** Supabase user_metadata is client-readable and self-writable at registration. Trusting it for role gates is a privilege escalation risk.

## Supabase env guard pattern
Both server-side code and middleware must guard against placeholder/missing Supabase credentials. The safe pattern: check `NEXT_PUBLIC_SUPABASE_URL` before constructing any Supabase client; gracefully fall through (e.g. redirect to /login, or pass the request) rather than crashing with an invalid URL error.

**Why:** Middleware and server components run before the user can set up Supabase. A crash at the root breaks all routes, including /login.

## Open redirect guard
The `redirectTo` query param on /login must be validated against an allowlist of known-safe path prefixes before use. Anything else falls back to `/dashboard`.

**Why:** Unvalidated redirectTo enables open-redirect attacks via crafted URLs.

## Cookie typing in Supabase SSR
The `setAll` callback must be explicitly typed to satisfy TypeScript strict mode. Import `CookieOptions` from `@supabase/ssr` and annotate the parameter as `{ name: string; value: string; options: CookieOptions }[]`.

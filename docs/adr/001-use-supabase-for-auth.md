# ADR 001 — Use Supabase for Authentication and Database

**Date:** 2026-07-09
**Status:** Accepted
**Deciders:** Miscurin founding team

---

## Context

The Miscurin Commerce Platform needs:
- User registration, login, password reset, and email verification
- A PostgreSQL database for application data
- Role-based access control (customer / staff / founder)
- Session management that works with Next.js App Router (Server Components + middleware)

We needed to choose between building auth from scratch, using a third-party auth library (NextAuth.js, Clerk, Auth0), or using a managed BaaS (Supabase, Firebase, Appwrite).

---

## Decision

Use **Supabase** for both authentication and the primary database.

Integrate using `@supabase/ssr` (not the deprecated `@supabase/auth-helpers-nextjs`) with the cookie-based session pattern documented by Supabase for Next.js App Router.

---

## Rationale

| Criterion | Supabase | NextAuth.js | Clerk | Auth0 |
|---|---|---|---|---|
| Managed PostgreSQL | ✅ Yes | ❌ Bring your own | ❌ Bring your own | ❌ Bring your own |
| App Router / RSC support | ✅ Via `@supabase/ssr` | ✅ Yes | ✅ Yes | ✅ Yes |
| Free tier | ✅ Generous | ✅ Open source | ⚠️ Limited | ⚠️ Limited |
| Self-host option | ✅ Yes (Docker) | ✅ Yes | ❌ No | ❌ No |
| Row Level Security | ✅ First-class | ❌ Not applicable | ❌ Not applicable | ❌ Not applicable |
| Real-time subscriptions | ✅ Yes | ❌ No | ❌ No | ❌ No |
| Edge-compatible middleware | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |

Supabase is the only option that collapses auth + database into a single managed service with a generous free tier and a self-host path. This significantly reduces infrastructure complexity at the early stage.

---

## Implementation Details

- **Session storage**: HTTP-only cookies, managed by `@supabase/ssr`
- **Middleware**: `src/middleware.ts` — refreshes session on every request; protects routes
- **Server helper**: `src/lib/supabase/server.ts` — used in RSC, Server Actions, Route Handlers
- **Client helper**: `src/lib/supabase/client.ts` — used in Client Components
- **Environment guard**: Both helpers return `null` when env vars are missing, enabling graceful degradation during local development before credentials are configured

---

## Consequences

**Positive:**
- Single vendor for auth + DB reduces operational overhead
- Row Level Security enforces data access rules at the database layer
- Supabase CLI enables database migrations and type generation in later sprints
- Large community, active development, and extensive documentation

**Negative / risks:**
- Vendor lock-in: migrating off Supabase requires replacing both the auth system and moving database data
- Supabase's free tier pauses projects after 1 week of inactivity — acceptable for development, not production
- The `@supabase/ssr` API has changed significantly across versions; must pin carefully and read changelogs on upgrades

**Mitigation for lock-in:** The database access layer is abstracted behind `src/lib/supabase/`. Switching auth providers would require changing these helpers and the middleware, but page components and form logic would remain largely unchanged.

---

## Alternatives Considered

### NextAuth.js v5 (Auth.js)
Rejected because it does not include a database — we would still need to provision and manage PostgreSQL separately, doubling infrastructure complexity.

### Clerk
Rejected because the free tier is limited, there is no self-host option, and it does not provide a database.

### Firebase (Google)
Rejected because Firebase's NoSQL data model (Firestore) is a poor fit for commerce data with relational requirements (orders, line items, inventory).

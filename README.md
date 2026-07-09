# Miscurin Commerce Platform

> Enterprise-grade commerce platform — Next.js 15 · TypeScript · Tailwind CSS · Supabase

![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ecf8e?logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/License-Private-red)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Roles & Access Control](#roles--access-control)
- [Getting Started](#getting-started)
- [Available Routes](#available-routes)
- [Scripts](#scripts)
- [Documentation](#documentation)
- [Architecture Decisions](#architecture-decisions)
- [Contributing](#contributing)
- [Security](#security)
- [Roadmap](#roadmap)

---

## Overview

Miscurin is a full-stack commerce platform built for production from day one. It uses Next.js 15's App Router with server-side authentication via Supabase — no tokens in localStorage, no client-side auth state exposed to JavaScript. Role-based access control is enforced at the database layer via Row Level Security.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 3 |
| Auth & Database | Supabase (Auth + PostgreSQL) | Latest |
| SSR Auth | @supabase/ssr | 0.6+ |
| Runtime | Node.js | 20 |

---

## Project Structure

```
miscurin-platform/
├── docs/                        # Technical documentation
│   ├── adr/                     # Architecture Decision Records
│   ├── architecture.md
│   ├── authentication.md
│   ├── contributing.md
│   ├── database.md
│   ├── deployment.md
│   ├── development.md
│   └── security.md
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/              # Public auth pages (no session required)
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   ├── reset-password/
│   │   │   ├── verify-email/
│   │   │   └── layout.tsx       # Centered auth shell
│   │   ├── (protected)/         # Authenticated pages (session required)
│   │   │   ├── dashboard/
│   │   │   └── layout.tsx       # Auth gate + nav shell
│   │   ├── globals.css
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # → redirects to /login
│   │
│   ├── components/
│   │   ├── auth/                # Auth form components (Client Components)
│   │   ├── layout/              # Nav, header, shell components
│   │   └── ui/                  # Stateless UI primitives
│   │
│   ├── constants/
│   │   └── routes.ts            # Route prefixes — single source of truth
│   │
│   ├── actions/                 # Next.js Server Actions (Sprint 2+)
│   ├── hooks/                   # Custom React hooks (Sprint 2+)
│   │
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts        # Browser client (Client Components)
│   │       ├── server.ts        # Server client (RSC, Actions, Handlers)
│   │       └── config.ts        # isSupabaseConfigured() guard
│   │
│   ├── middleware.ts            # Auth guard + session refresh (Edge)
│   │
│   ├── types/
│   │   ├── index.ts             # Domain types (UserRole, UserProfile, …)
│   │   └── supabase.ts          # Database schema types (Supabase CLI target)
│   │
│   └── utils/
│       └── url.ts               # isSafeRedirect — open-redirect prevention
│
├── .env.example                 # Environment variable template
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Roles & Access Control

| Role | Assigned by | Access |
|---|---|---|
| `customer` | Automatically on registration | Storefront, orders, account |
| `staff` | Founder (via database) | Product management, operations |
| `founder` | Direct database edit | Full platform access |

Roles are stored in `public.profiles.role` with a `CHECK` constraint. They are read server-side on every protected request. There is no client-side path to self-assign an elevated role.

See [authentication docs](./docs/authentication.md) for the full security model.

---

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (free tier works)

### 1. Clone and install

```bash
git clone https://github.com/Miscurin/miscurin-platform.git
cd miscurin-platform
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public key |

### 3. Set up the database

Apply the Sprint 1 migration in Supabase → SQL Editor:

```sql
-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  role text not null default 'customer'
    check (role in ('customer', 'staff', 'founder')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Row Level Security
alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'customer');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 4. Configure Supabase redirect URLs

In Supabase → Authentication → URL Configuration:

- **Site URL**: `http://localhost:5000`
- **Redirect URLs**: `http://localhost:5000/**`

Add your production domain when you deploy.

### 5. Start the dev server

```bash
npm run dev
# → http://localhost:5000
```

---

## Available Routes

| Route | Auth | Description |
|---|---|---|
| `/` | Public | Redirects to `/login` |
| `/login` | Public | Email + password sign-in |
| `/register` | Public | New account (customer role) |
| `/forgot-password` | Public | Request password reset email |
| `/reset-password` | Public | Set new password via email link |
| `/verify-email` | Public | Post-registration confirmation |
| `/dashboard` | Required | Role-aware landing page |

---

## Scripts

```bash
npm run dev          # Dev server with hot reload on :5000
npm run build        # Production build
npm run start        # Serve production build on :5000
npm run lint         # ESLint (must pass — no errors)
npm run type-check   # TypeScript strict check (must pass before every commit)
```

---

## Documentation

| Document | Description |
|---|---|
| [Architecture](./docs/architecture.md) | Request flow, route groups, Supabase helper pattern, env guard |
| [Authentication](./docs/authentication.md) | Auth flows, session management, security decisions |
| [Database](./docs/database.md) | Schema, RLS policies, migrations |
| [Development Guide](./docs/development.md) | Conventions, folder structure, naming, branching |
| [Contributing](./docs/contributing.md) | PR process, commit format, checklist |
| [Deployment](./docs/deployment.md) | Production checklist, Vercel/Replit deploy steps |
| [Security](./docs/security.md) | Security model, vulnerability reporting |

---

## Architecture Decisions

Significant architectural choices are recorded as ADRs in [`docs/adr/`](./docs/adr/):

| ADR | Decision |
|---|---|
| [001](./docs/adr/001-use-supabase-for-auth.md) | Use Supabase for authentication and database |

---

## Contributing

See [docs/contributing.md](./docs/contributing.md) for the full guide including branch strategy, commit format, and PR checklist.

Quick rules:
- `npm run type-check` and `npm run lint` must pass before opening a PR
- No `console.log` in production code
- No `any` — use `unknown` + narrowing when the type is genuinely unknown
- All merges to `main` via pull request

---

## Security

For vulnerability reports, see [docs/security.md](./docs/security.md).

**Do not open a public issue for security vulnerabilities.** Email `security@miscurin.com` instead.

---

## Roadmap

| Sprint | Status | Scope |
|---|---|---|
| Sprint 1 — Foundation & Auth | ✅ Complete | Auth pages, middleware, roles, Supabase, enterprise repo setup |
| Sprint 2 — Product Catalogue | 🔜 Planned | Products, inventory, staff tools |
| Sprint 3 — Cart & Checkout | 📋 Backlog | Cart, orders, payment processing |
| Sprint 4 — Customer Account | 📋 Backlog | Order history, profile, preferences |

---

## License

Private. All rights reserved. © 2026 Miscurin.

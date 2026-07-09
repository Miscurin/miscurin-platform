# Miscurin Commerce Platform

A full-stack commerce platform built with Next.js 15, TypeScript, Tailwind CSS, and Supabase. Designed for production from day one — role-based access control, server-side authentication, and a clean component architecture ready to scale.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v3 |
| Auth & Database | Supabase (Auth + PostgreSQL) |
| Runtime | Node.js 20 |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Login, register, password reset, email verify
│   ├── (protected)/        # Authenticated routes (dashboard, account, etc.)
│   ├── globals.css
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Entry — redirects to /login
├── components/
│   ├── auth/               # Auth form components
│   ├── layout/             # Nav, header, shell components
│   └── ui/                 # Reusable primitives (Button, Input, Card, etc.)
├── actions/                # Next.js Server Actions
├── hooks/                  # Custom React hooks
├── lib/
│   └── supabase/           # Client, server, and config helpers
├── types/                  # Shared TypeScript types
└── utils/                  # Pure utility functions
```

---

## Roles

| Role | Description |
|---|---|
| `customer` | Default role. Assigned automatically on registration. |
| `staff` | Internal team access. Assigned by a Founder via the database. |
| `founder` | Full access. Assigned directly in the `profiles` table. |

Roles are stored in `public.profiles.role` and read server-side. They cannot be self-assigned.

---

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project

### 1. Clone and install

```bash
git clone https://github.com/Miscurin/miscurin-platform.git
cd miscurin-platform
npm install
```

### 2. Environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public key |

### 3. Set up the database

Run the following SQL in your Supabase SQL editor (Settings → SQL Editor):

```sql
-- User profiles table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'staff', 'founder')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Row Level Security
alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    'customer'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 4. Configure Supabase redirect URLs

In Supabase → Authentication → URL Configuration:

- **Site URL**: `https://your-domain.com`
- **Redirect URLs**: `https://your-domain.com/**`

For local development add: `http://localhost:3000/**`

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000).

---

## Available Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Redirects to `/login` |
| `/login` | Public | Email + password sign-in |
| `/register` | Public | New account (customer role) |
| `/forgot-password` | Public | Request password reset email |
| `/reset-password` | Public | Set new password via email link |
| `/verify-email` | Public | Post-registration confirmation |
| `/dashboard` | Auth required | Role-aware landing page |

---

## Documentation

See the [`docs/`](./docs) folder for technical documentation:

- [Architecture](./docs/architecture.md) — system design and patterns
- [Authentication](./docs/authentication.md) — auth flows and security decisions
- [Database](./docs/database.md) — schema, RLS policies, and migrations
- [Development Guide](./docs/development.md) — local setup, conventions, and workflow

---

## Scripts

```bash
npm run dev      # Start dev server (port 5000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

---

## Sprints

| Sprint | Status | Scope |
|---|---|---|
| Sprint 1 — Foundation & Auth | ✅ Complete | Auth pages, middleware, roles, Supabase integration |
| Sprint 2 — Product Catalogue | 🔜 Planned | Products, inventory, staff tools |

---

## License

Private. All rights reserved.

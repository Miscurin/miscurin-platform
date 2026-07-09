# Miscurin Commerce Platform

A modular, scalable commerce platform built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Auth & DB | Supabase |
| Runtime | Node.js 20 |

## Running the App

```bash
npm run dev       # Dev server on port 5000
npm run build     # Production build
npm run start     # Production server on port 5000
npm run type-check # TypeScript check without emitting
```

## Required Environment Variables

Create `.env.local` (already templated):

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Get these from your Supabase project dashboard → Settings → API.

## Supabase Database Setup

Run this SQL in your Supabase SQL editor to create the profiles table:

```sql
-- Profiles table (mirrors auth.users with role info)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'staff', 'founder')),
  email_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Row Level Security
alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

Also configure in Supabase Authentication settings:
- **Site URL**: your Replit dev domain (e.g. `https://your-repl.your-username.replit.dev`)
- **Redirect URLs**: add `https://your-repl.your-username.replit.dev/**`

## Project Structure

```
src/
  app/
    (auth)/           # Public auth routes (login, register, etc.)
    (protected)/      # Authenticated routes (dashboard, etc.)
    layout.tsx        # Root layout
    page.tsx          # Root redirect (→ /login or /dashboard)
  components/
    auth/             # Auth form components (LoginForm, RegisterForm, etc.)
    layout/           # Shared layout components (ProtectedNav)
    ui/               # Reusable primitives (Button, Input, Alert, etc.)
  lib/
    supabase/
      client.ts       # Browser Supabase client
      server.ts       # Server Supabase client
  middleware.ts       # Auth guard (protected routes + auth redirects)
  types/
    index.ts          # Shared types (UserRole, UserProfile, etc.)
```

## Sprint 1 — Completed Features

- [x] Clean Next.js App Router architecture
- [x] Login (email + password)
- [x] Register (email, password, role selection)
- [x] Forgot Password (email reset link)
- [x] Reset Password (token-based from email)
- [x] Email verification page
- [x] Protected routes via middleware
- [x] Customer, Staff, Founder roles
- [x] Role-aware dashboard
- [x] Responsive mobile-first UI
- [x] Reusable UI component library
- [x] Light theme

## Roles

| Role | Description |
|---|---|
| `customer` | Public self-registration, shop access |
| `staff` | Internal team, operations management |
| `founder` | Full platform access, super admin |

## User Preferences

- Modular, scalable, production-ready code
- Mobile-first responsive design
- Light theme
- No Products / Cart / Checkout / Payments / Dashboard (full) / Inventory / Marketing in Sprint 1

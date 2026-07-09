# Database

Miscurin uses Supabase's managed PostgreSQL. The database extends Supabase's built-in `auth.users` table with a `public.profiles` table.

---

## Schema

### `public.profiles`

Stores application-level user data. One row per user, created automatically on signup.

| Column | Type | Default | Notes |
|---|---|---|---|
| `id` | `uuid` | — | PK, FK → `auth.users.id` (cascade delete) |
| `full_name` | `text` | `null` | Populated from signup metadata |
| `role` | `text` | `'customer'` | CHECK: `customer`, `staff`, `founder` |
| `created_at` | `timestamptz` | `now()` | |
| `updated_at` | `timestamptz` | `now()` | |

---

## Migrations

All schema changes are applied manually via the Supabase SQL editor during Sprint 1. A migration toolchain (e.g. Supabase CLI or Drizzle) will be introduced in a later sprint.

### Sprint 1 — initial schema

```sql
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'staff', 'founder')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

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

---

## Row Level Security

All tables use RLS. The policies in Sprint 1:

| Table | Policy | Rule |
|---|---|---|
| `profiles` | Select | `auth.uid() = id` |
| `profiles` | Update | `auth.uid() = id` |

No insert policy exists — inserts are handled exclusively by the `handle_new_user` trigger running as `security definer`.

No delete policy exists — users cannot delete their own profile directly.

---

## Role Assignment

Roles can be updated by a Founder via direct SQL:

```sql
-- Promote a user to staff
update public.profiles
set role = 'staff', updated_at = now()
where id = '<user-uuid>';

-- Promote a user to founder
update public.profiles
set role = 'founder', updated_at = now()
where id = '<user-uuid>';
```

An admin UI for role management is planned for Sprint 2.

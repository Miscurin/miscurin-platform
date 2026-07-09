# Authentication

Miscurin uses [Supabase Auth](https://supabase.com/docs/guides/auth) with the `@supabase/ssr` package for server-side session management.

---

## Flows

### Register

1. User submits name, email, password on `/register`
2. `RegisterForm` calls `supabase.auth.signUp()` with `role: 'customer'` in `data`
3. Supabase creates the user in `auth.users`
4. The `on_auth_user_created` trigger inserts a row in `public.profiles` with `role = 'customer'`
5. User is redirected to `/verify-email`

> The role in `data` (user metadata) is informational only. The authoritative role is always the one in `public.profiles`. See [Task #3](../README.md#sprints) for DB-backed role reads.

### Login

1. User submits email + password on `/login`
2. `LoginForm` calls `supabase.auth.signInWithPassword()`
3. Supabase sets a session cookie
4. Middleware picks up the cookie on subsequent requests
5. User is redirected to `/dashboard` (or a validated `?redirectTo`)

### Forgot Password

1. User submits email on `/forgot-password`
2. `ForgotPasswordForm` calls `supabase.auth.resetPasswordForEmail()` with `redirectTo` pointing to `/reset-password`
3. Supabase sends a password-reset email
4. Always shows a success message regardless of whether the email exists (prevents user enumeration)

### Reset Password

1. User lands on `/reset-password` from the email link (contains a one-time token in the URL hash)
2. `ResetPasswordForm` calls `supabase.auth.updateUser()` with the new password
3. On success, redirects to `/login?message=password-updated`

### Sign Out

1. `ProtectedNav` sign-out button calls `supabase.auth.signOut()`
2. Supabase clears the session cookie
3. User is redirected to `/login`

---

## Session Management

Sessions are stored in HTTP-only cookies managed by `@supabase/ssr`. The middleware calls `supabase.auth.getUser()` on every protected request, which:

- Validates the session token with Supabase's servers
- Refreshes the access token when it is near expiry
- Writes the refreshed token back to the cookie

This means sessions stay alive as long as the user is active, without any client-side token management.

---

## Security Decisions

### No role selector on registration
The registration form does not expose a role field. All public registrations are `customer`. Staff and Founder roles are assigned out-of-band by a Founder editing the database.

### Open redirect prevention
The `?redirectTo` query parameter accepted by `/login` is validated against an explicit allowlist before use. Any value not on the list is silently discarded and the user goes to `/dashboard`.

Allowlisted destinations: `/dashboard`, `/account`, `/admin`.

### User enumeration resistance
The forgot-password form always displays a success message, regardless of whether the submitted email address exists in the system. This prevents an attacker from probing which email addresses have accounts.

### No secrets in source
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are the only Supabase credentials used in the codebase. The anon key is safe to expose in client bundles — it is scoped by Row Level Security policies on the database. The service-role key is never used or stored.

---

## Email Templates

Configure email templates in Supabase → Authentication → Email Templates. The default templates work, but you should customise the sender name, subject lines, and branding before going live.

Templates used:
- **Confirm signup** — sent after `/register`
- **Reset password** — sent after `/forgot-password`

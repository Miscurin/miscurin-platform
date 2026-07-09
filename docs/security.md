# Security

---

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Contact the security team directly at: `security@miscurin.com`

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested mitigations

You will receive a response within 48 hours. We aim to patch confirmed vulnerabilities within 7 days.

---

## Security Model

### Authentication
- All session tokens are stored in **HTTP-only cookies** — inaccessible to JavaScript
- Sessions are validated server-side on every protected request via `supabase.auth.getUser()`
- No tokens stored in `localStorage` or `sessionStorage`
- Supabase handles token refresh automatically via the `@supabase/ssr` middleware pattern

### Authorisation
- Role (`customer`, `staff`, `founder`) is stored in `public.profiles.role` with a `CHECK` constraint
- Roles are read server-side — never trusted from client input or JWTs alone
- Row Level Security (RLS) is enabled on all Supabase tables
- Public registration is locked to `customer` role; elevated roles require direct database access by a Founder

### Open Redirect Prevention
- The `?redirectTo` query parameter is validated against an explicit allowlist (`SAFE_REDIRECT_PREFIXES`)
- Any path not starting with `/dashboard`, `/admin`, or `/account` is discarded
- Validation runs in both middleware (Edge) and client-side login form
- Shared via `src/utils/url.ts` — single implementation, no duplication

### Credential Handling
- Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are used — both safe to expose in client bundles
- The Supabase **service-role key** is never referenced in this codebase
- All secrets are stored in environment variables, not source code
- `.env*` files are gitignored (except `.env.example` which contains only placeholders)

### User Enumeration
- The forgot-password form always returns a success message regardless of whether the email exists

---

## Dependency Security

```bash
# Audit dependencies for known vulnerabilities
npm audit

# Auto-fix low/moderate issues
npm audit fix
```

Run `npm audit` before every production deployment. Address all critical and high-severity findings before releasing.

---

## Content Security Policy

Not yet configured. CSP headers will be added to `next.config.ts` in a future sprint before any public launch.

---

## Security Checklist (pre-launch)

- [ ] `npm audit` — zero critical or high vulnerabilities
- [ ] CSP headers configured in `next.config.ts`
- [ ] Supabase RLS verified on every table
- [ ] Rate limiting on auth endpoints (Supabase dashboard → Auth → Rate Limits)
- [ ] Supabase email templates reviewed for phishing-resistance
- [ ] Service-role key never referenced in codebase (`git grep SERVICE_ROLE_KEY`)
- [ ] No sensitive data logged (`git grep console.log`)
- [ ] Production Supabase project separate from development

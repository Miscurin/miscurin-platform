# Deployment

---

## Production Checklist

Before any production deployment:

- [ ] All `NEXT_PUBLIC_SUPABASE_*` env vars set in the deployment environment
- [ ] Supabase redirect URLs include the production domain
- [ ] Supabase email templates customised (sender name, branding)
- [ ] Row Level Security policies verified on all tables
- [ ] `npm run build` succeeds locally
- [ ] `npm run type-check` passes
- [ ] No `.env.local` or local credentials in the repository

---

## Environment Variables

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon (public) key — safe in client bundle |

Both are prefixed `NEXT_PUBLIC_` and inlined at build time. **Restart the server after changing them.**

The Supabase **service-role key** is never used in this codebase. Do not add it.

---

## Supabase Configuration (per environment)

### Authentication → URL Configuration

| Setting | Development | Production |
|---|---|---|
| Site URL | `http://localhost:5000` | `https://miscurin.com` |
| Redirect URLs | `http://localhost:5000/**` | `https://miscurin.com/**` |

Add all environments you use (staging, preview, etc.) to Redirect URLs.

---

## Deploying to Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy preview
vercel

# Deploy production
vercel --prod
```

Set environment variables in the Vercel dashboard under **Settings → Environment Variables**. Use different Supabase projects for Preview and Production environments.

---

## Deploying to Replit

The dev server runs on port 5000 (`npm run dev`). For a production-style build on Replit:

1. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Replit Secrets
2. Use the **Deploy** button in the Replit UI (runs `npm run build && npm run start`)
3. Add the deployed `.replit.app` domain to Supabase → Authentication → Redirect URLs

---

## Build Command Reference

```bash
npm run build          # Production build — must succeed before deploying
npm run start          # Serve the production build on :5000
npm run type-check     # Verify TypeScript — run before every deploy
npm run lint           # ESLint — must pass (no errors)
```

---

## Database Migrations

Sprint 1 uses manual SQL applied via the Supabase SQL editor. A migration workflow (Supabase CLI or Drizzle Kit) will be introduced in a later sprint. Until then:

1. Test all SQL changes against the dev Supabase project first
2. Record every change in `docs/database.md` under a versioned section
3. Apply to production Supabase project only after dev is verified

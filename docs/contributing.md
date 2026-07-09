# Contributing

Thank you for contributing to the Miscurin Commerce Platform.

---

## Branching Strategy

| Branch | Purpose | Merge via |
|---|---|---|
| `main` | Production-ready. Deployable at any commit. | PR only |
| `dev` | Sprint integration branch | PR to `main` |
| `feat/<name>` | New features | PR to `dev` |
| `fix/<name>` | Bug fixes | PR to `dev` or `main` |
| `chore/<name>` | Tooling, config, deps | PR to `dev` |

**No direct pushes to `main`.** All changes go through a pull request, regardless of size.

---

## Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short summary>

[optional body]

[optional footer]
```

**Types:**

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, whitespace (no logic change) |
| `refactor` | Code restructure without behaviour change |
| `test` | Adding or updating tests |
| `chore` | Build process, dependency updates, config |
| `perf` | Performance improvement |

**Examples:**

```
feat(auth): add email verification resend button
fix(middleware): handle missing redirectTo param gracefully
chore(deps): upgrade Next.js to 15.2.0
docs(architecture): document supabase helper pattern
```

---

## Pull Request Checklist

Before requesting review:

- [ ] `npm run type-check` passes (zero TypeScript errors)
- [ ] `npm run lint` passes (zero ESLint errors)
- [ ] `npm run build` succeeds
- [ ] No `console.log` left in production code
- [ ] No hardcoded secrets or credentials
- [ ] New public functions have JSDoc comments
- [ ] `README.md` or `docs/` updated if the change affects setup or architecture

---

## Code Conventions

See [Development Guide](./development.md) for full conventions. Quick reference:

- **TypeScript strict mode** is on. No `any`. Use `unknown` + narrowing when the type is truly unknown.
- **Imports**: prefer `import type` for type-only imports.
- **Components**: one component per file, named export preferred, `default` for page/layout files.
- **Server vs Client**: mark Client Components with `'use client'`. Everything else is a Server Component by default.
- **Supabase**: always call `createClient()` and check for `null` before use.

---

## Local Development

```bash
git clone https://github.com/Miscurin/miscurin-platform.git
cd miscurin-platform
npm install
cp .env.example .env.local
# Fill in .env.local with your Supabase credentials
npm run dev
```

---

## Reporting Issues

Open a GitHub issue with:
1. Steps to reproduce
2. Expected behaviour
3. Actual behaviour
4. Environment (OS, Node version, browser)

For security vulnerabilities, see [security.md](./security.md).

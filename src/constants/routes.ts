/**
 * Route constants — single source of truth for protected/auth route logic.
 * Used by middleware and client-side components. No Node.js imports;
 * safe to use in Edge Runtime.
 */

/** Prefixes that require an authenticated session */
export const PROTECTED_PREFIXES = ['/dashboard', '/admin', '/account'] as const

/** Public auth routes — authenticated users are redirected away from these */
export const AUTH_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
] as const

/**
 * Allowed destination prefixes for the ?redirectTo query param.
 * Must overlap with PROTECTED_PREFIXES to prevent open-redirect attacks.
 */
export const SAFE_REDIRECT_PREFIXES: readonly string[] = PROTECTED_PREFIXES

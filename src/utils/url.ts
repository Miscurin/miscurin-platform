import { SAFE_REDIRECT_PREFIXES } from '@/constants/routes'

/**
 * Returns true when a path is safe to use as a post-login redirect target.
 *
 * Validates against an explicit allowlist to prevent open-redirect attacks.
 * Pure function — no side effects, no Node.js APIs. Safe in Edge Runtime.
 */
export function isSafeRedirect(path: string): boolean {
  return (
    path.startsWith('/') &&
    !path.startsWith('//') &&
    !path.includes(':') &&
    SAFE_REDIRECT_PREFIXES.some((prefix) => path.startsWith(prefix))
  )
}

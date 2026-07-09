const PLACEHOLDER = 'your_supabase_project_url'

/**
 * Returns true when Supabase env vars are present and non-placeholder.
 * Safe to call on both client and server (NEXT_PUBLIC_ vars are inlined
 * at build time and available in the browser bundle).
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!(
    url &&
    key &&
    url !== PLACEHOLDER &&
    (url.startsWith('https://') || url.startsWith('http://'))
  )
}

export const SUPABASE_UNCONFIGURED_MESSAGE =
  'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables, then restart the server.'

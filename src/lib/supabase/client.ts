import { createBrowserClient } from '@supabase/ssr'
import { isSupabaseConfigured } from './config'

/**
 * Returns a Supabase browser client, or null when Supabase is not yet
 * configured. Always check the return value before using.
 */
export function createClient() {
  if (!isSupabaseConfigured()) return null

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

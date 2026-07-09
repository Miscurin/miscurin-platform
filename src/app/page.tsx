import { redirect } from 'next/navigation'

// Always redirect to /login — the middleware handles forwarding
// authenticated users from /login to /dashboard automatically.
// This avoids calling the Supabase server client at the root,
// which would crash when NEXT_PUBLIC_SUPABASE_URL is not yet configured.
export default function RootPage() {
  redirect('/login')
}

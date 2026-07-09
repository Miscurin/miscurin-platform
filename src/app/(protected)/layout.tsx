import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { UserProfile } from '@/types'
import ProtectedNav from '@/components/layout/ProtectedNav'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Supabase not configured yet — send to login where a notice will be shown
  if (!supabase) {
    redirect('/login')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const profile: UserProfile = {
    id: user.id,
    email: user.email ?? '',
    full_name: user.user_metadata?.full_name ?? null,
    role: user.user_metadata?.role ?? 'customer',
    email_verified: user.email_confirmed_at != null,
    created_at: user.created_at,
    updated_at: user.updated_at ?? user.created_at,
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ProtectedNav profile={profile} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

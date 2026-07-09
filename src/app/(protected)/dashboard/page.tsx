import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { UserProfile, UserRole } from '@/types'
import { ROLE_LABELS } from '@/types'

export const metadata: Metadata = {
  title: 'Dashboard',
}

const roleWelcome: Record<UserRole, { title: string; description: string }> = {
  customer: {
    title: 'Welcome to Miscurin',
    description: "You're all set. Products, cart, and checkout are coming in future sprints.",
  },
  staff: {
    title: 'Staff Dashboard',
    description: 'Operations and management tools are coming in future sprints.',
  },
  founder: {
    title: 'Founder Dashboard',
    description: 'Full platform access is coming in future sprints.',
  },
}

export default async function DashboardPage() {
  const supabase = await createClient()

  // Protected layout already handles the !supabase redirect, but guard here
  // too so TypeScript knows supabase is non-null below.
  if (!supabase) {
    redirect('/login')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const role: UserRole = (user?.user_metadata?.role as UserRole) ?? 'customer'
  const fullName: string = user?.user_metadata?.full_name ?? 'there'
  const welcome = roleWelcome[role]

  const profile: UserProfile = {
    id: user?.id ?? '',
    email: user?.email ?? '',
    full_name: fullName,
    role,
    email_verified: user?.email_confirmed_at != null,
    created_at: user?.created_at ?? '',
    updated_at: user?.updated_at ?? user?.created_at ?? '',
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
          Hello, {profile.full_name} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {welcome.title} &mdash; {welcome.description}
        </p>
      </div>

      {/* Role badge + info cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          label="Account Type"
          value={ROLE_LABELS[role]}
          icon="🪪"
          accent="brand"
        />
        <InfoCard
          label="Email"
          value={user?.email ?? '—'}
          icon="✉️"
          accent="slate"
        />
        <InfoCard
          label="Email Verified"
          value={user?.email_confirmed_at ? 'Verified' : 'Pending verification'}
          icon={user?.email_confirmed_at ? '✅' : '⏳'}
          accent={user?.email_confirmed_at ? 'green' : 'amber'}
        />
      </div>

      {/* Sprint notice */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          Sprint 1 — Foundation &amp; Authentication
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Authentication, protected routes, and role management are complete.
          Products, cart, checkout, payments, inventory, and marketing features
          will be added in future sprints.
        </p>
      </div>
    </div>
  )
}

function InfoCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string
  value: string
  icon: string
  accent: 'brand' | 'slate' | 'green' | 'amber'
}) {
  const accentMap = {
    brand: 'bg-brand-50 border-brand-100',
    slate: 'bg-slate-50 border-slate-200',
    green: 'bg-green-50 border-green-100',
    amber: 'bg-amber-50 border-amber-100',
  }

  return (
    <div className={`rounded-xl border p-5 ${accentMap[accent]}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {label}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-slate-800 truncate">
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

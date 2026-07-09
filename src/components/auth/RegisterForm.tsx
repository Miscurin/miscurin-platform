'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured, SUPABASE_UNCONFIGURED_MESSAGE } from '@/lib/supabase/config'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Alert from '@/components/ui/Alert'

type FieldErrors = {
  fullName?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export default function RegisterForm() {
  const router = useRouter()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  function validate(): boolean {
    const errors: FieldErrors = {}
    if (!fullName.trim()) errors.fullName = 'Full name is required'
    if (!email) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = 'Enter a valid email'
    if (!password) errors.password = 'Password is required'
    else if (password.length < 8)
      errors.password = 'Password must be at least 8 characters'
    if (!confirmPassword) errors.confirmPassword = 'Please confirm your password'
    else if (password !== confirmPassword)
      errors.confirmPassword = 'Passwords do not match'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!validate()) return

    if (!isSupabaseConfigured()) {
      setError(SUPABASE_UNCONFIGURED_MESSAGE)
      return
    }

    setLoading(true)
    const supabase = createClient()!

    // Role is always 'customer' for public self-registration.
    // Staff and Founder roles are assigned by a Founder via the profiles table.
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          role: 'customer',
        },
        emailRedirectTo: `${window.location.origin}/verify-email`,
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/verify-email?type=signup')
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {!isSupabaseConfigured() && (
        <Alert
          variant="warning"
          title="Not connected"
          message="Supabase credentials are not configured. Registration will not work until you add your environment variables."
        />
      )}

      {error && <Alert variant="error" message={error} />}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fullName" required>
          Full name
        </Label>
        <Input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={fieldErrors.fullName}
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" required>
          Email address
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password" required>
          Password
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Min. 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword" required>
          Confirm password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={fieldErrors.confirmPassword}
          disabled={loading}
        />
      </div>

      {/* Role notice */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-xs text-slate-600">
          <strong className="font-medium text-slate-700">Account type:</strong>{' '}
          All new registrations start as Customer accounts. Staff and Founder
          roles are assigned by a Founder from the admin panel.
        </p>
      </div>

      <Button type="submit" fullWidth loading={loading} size="lg">
        {loading ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  )
}

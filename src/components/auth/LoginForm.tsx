'use client'

import { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured, SUPABASE_UNCONFIGURED_MESSAGE } from '@/lib/supabase/config'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Alert from '@/components/ui/Alert'

const ALLOWED_REDIRECT_PREFIXES = ['/dashboard', '/admin', '/account']

function isSafeRedirect(path: string): boolean {
  return (
    path.startsWith('/') &&
    !path.startsWith('//') &&
    !path.includes(':') &&
    ALLOWED_REDIRECT_PREFIXES.some((prefix) => path.startsWith(prefix))
  )
}

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const rawRedirect = searchParams.get('redirectTo') ?? ''
  const redirectTo = isSafeRedirect(rawRedirect) ? rawRedirect : '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string
    password?: string
  }>({})

  function validate(): boolean {
    const errors: { email?: string; password?: string } = {}
    if (!email) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = 'Enter a valid email'
    if (!password) errors.password = 'Password is required'
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

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(
        authError.message === 'Invalid login credentials'
          ? 'Incorrect email or password. Please try again.'
          : authError.message
      )
      setLoading(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {!isSupabaseConfigured() && (
        <Alert
          variant="warning"
          title="Not connected"
          message="Supabase credentials are not configured. Sign-in will not work until you add your environment variables."
        />
      )}

      {error && <Alert variant="error" message={error} />}

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
        <div className="flex items-center justify-between">
          <Label htmlFor="password" required>
            Password
          </Label>
          <Link
            href="/forgot-password"
            className="text-xs text-brand-600 hover:text-brand-700 font-medium"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          disabled={loading}
        />
      </div>

      <Button type="submit" fullWidth loading={loading} size="lg">
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}

'use client'

import { useState, type FormEvent } from 'react'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured, SUPABASE_UNCONFIGURED_MESSAGE } from '@/lib/supabase/config'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Alert from '@/components/ui/Alert'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | undefined>()
  const [submitted, setSubmitted] = useState(false)

  function validate(): boolean {
    if (!email) {
      setEmailError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Enter a valid email address')
      return false
    }
    setEmailError(undefined)
    return true
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

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo: `${window.location.origin}/reset-password` }
    )

    if (resetError) {
      setError(resetError.message)
      setLoading(false)
      return
    }

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <Alert
        variant="success"
        title="Check your email"
        message={`We've sent a password reset link to ${email}. The link expires in 1 hour.`}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {!isSupabaseConfigured() && (
        <Alert
          variant="warning"
          title="Not connected"
          message="Supabase credentials are not configured. Password reset will not work until you add your environment variables."
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
          error={emailError}
          disabled={loading}
        />
      </div>

      <Button type="submit" fullWidth loading={loading} size="lg">
        {loading ? 'Sending link…' : 'Send reset link'}
      </Button>
    </form>
  )
}

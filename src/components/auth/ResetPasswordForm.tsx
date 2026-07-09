'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured, SUPABASE_UNCONFIGURED_MESSAGE } from '@/lib/supabase/config'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import Alert from '@/components/ui/Alert'

export default function ResetPasswordForm() {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{
    password?: string
    confirmPassword?: string
  }>({})

  function validate(): boolean {
    const errors: { password?: string; confirmPassword?: string } = {}
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

    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    router.push('/login?message=password-updated')
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
        <Label htmlFor="password" required>
          New password
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
          Confirm new password
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

      <Button type="submit" fullWidth loading={loading} size="lg">
        {loading ? 'Updating password…' : 'Update password'}
      </Button>
    </form>
  )
}

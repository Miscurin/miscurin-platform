import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import LoginForm from '@/components/auth/LoginForm'
import Alert from '@/components/ui/Alert'

export const metadata: Metadata = {
  title: 'Sign In',
}

interface LoginPageProps {
  searchParams: Promise<{ message?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const message = params.message

  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Sign in to your Miscurin account
        </p>
      </div>

      {/* Success messages */}
      {message === 'password-updated' && (
        <Alert
          variant="success"
          message="Password updated successfully. Please sign in with your new password."
        />
      )}

      {/* Form */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>

      {/* Footer link */}
      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-brand-600 hover:text-brand-700"
        >
          Create one
        </Link>
      </p>
    </div>
  )
}

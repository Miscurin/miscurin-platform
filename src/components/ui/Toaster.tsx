'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useToastContext, type Toast, type ToastType } from '@/contexts/ToastContext'
import { cn } from '@/lib/cn'

// ── Icons ──────────────────────────────────────────────────────────────────────

function ToastIcon({ type }: { type: ToastType }) {
  const configs = {
    success: {
      bg: 'bg-success-50',
      icon: 'text-success-600',
      path: 'M5 13l4 4L19 7',
    },
    error: {
      bg: 'bg-error-50',
      icon: 'text-error-600',
      path: 'M18 6L6 18M6 6l12 12',
    },
    warning: {
      bg: 'bg-warning-50',
      icon: 'text-warning-600',
      path: 'M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
    },
    info: {
      bg: 'bg-info-50',
      icon: 'text-info-600',
      path: 'M12 8h.01M12 12v4M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z',
    },
  }
  const c = configs[type]
  return (
    <span
      className={cn('flex-shrink-0 flex items-center justify-center rounded-full h-8 w-8', c.bg)}
    >
      <svg
        className={cn('h-4 w-4', c.icon)}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={c.path} />
      </svg>
    </span>
  )
}

// ── Single toast item ──────────────────────────────────────────────────────────

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const [exiting, setExiting] = useState(false)

  function handleDismiss() {
    setExiting(true)
    setTimeout(() => onDismiss(toast.id), 220)
  }

  // Progress bar
  const hasDuration = (toast.duration ?? 0) > 0
  const duration = toast.duration ?? 4000

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn(
        'group relative flex w-full max-w-sm items-start gap-3',
        'bg-white rounded-2xl border border-slate-100 shadow-lg p-4',
        'overflow-hidden',
        exiting ? 'animate-toast-out' : 'animate-toast-in'
      )}
    >
      <ToastIcon type={toast.type} />

      <div className="flex-1 min-w-0 pt-0.5">
        {toast.title && (
          <p className="text-sm font-semibold text-slate-900 leading-none mb-1">
            {toast.title}
          </p>
        )}
        <p className="text-sm text-slate-600 leading-snug">{toast.message}</p>
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss notification"
        className={cn(
          'flex-shrink-0 rounded-lg p-1 text-slate-400',
          'hover:bg-slate-100 hover:text-slate-600',
          'transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300'
        )}
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
        </svg>
      </button>

      {/* Auto-dismiss progress bar */}
      {hasDuration && (
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-slate-200 w-full"
          aria-hidden="true"
        >
          <div
            className={cn(
              'h-full origin-left',
              toast.type === 'success' && 'bg-success-500',
              toast.type === 'error' && 'bg-error-500',
              toast.type === 'warning' && 'bg-warning-500',
              toast.type === 'info' && 'bg-info-500'
            )}
            style={{
              animation: `shrink ${duration}ms linear forwards`,
            }}
          />
        </div>
      )}
    </div>
  )
}

// ── Toaster (renders all toasts) ───────────────────────────────────────────────

export function Toaster() {
  const { toasts, dismiss } = useToastContext()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <>
      <style>{`@keyframes shrink { from { transform: scaleX(1); } to { transform: scaleX(0); } }`}</style>
      <div
        aria-label="Notifications"
        className="fixed bottom-0 right-0 z-[500] flex flex-col items-end gap-2 p-6 pointer-events-none"
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto w-full max-w-sm">
            <ToastItem toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </>,
    document.body
  )
}

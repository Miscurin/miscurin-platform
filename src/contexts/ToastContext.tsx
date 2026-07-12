'use client'

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title?: string
  message: string
  duration?: number // ms — 0 means no auto-dismiss
}

interface ToastOptions {
  title?: string
  duration?: number
}

interface ToastContextValue {
  toasts: Toast[]
  dismiss: (id: string) => void
  toast: {
    success: (message: string, options?: ToastOptions) => string
    error: (message: string, options?: ToastOptions) => string
    warning: (message: string, options?: ToastOptions) => string
    info: (message: string, options?: ToastOptions) => string
  }
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const counterRef = useRef(0)

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const add = useCallback(
    (type: ToastType, message: string, options?: ToastOptions): string => {
      const id = `toast-${++counterRef.current}`
      const duration = options?.duration ?? (type === 'error' ? 6000 : 4000)

      setToasts((prev) => [
        ...prev,
        { id, type, message, title: options?.title, duration },
      ])

      if (duration > 0) {
        setTimeout(() => dismiss(id), duration)
      }

      return id
    },
    [dismiss]
  )

  const value: ToastContextValue = {
    toasts,
    dismiss,
    toast: {
      success: (msg, opts) => add('success', msg, opts),
      error: (msg, opts) => add('error', msg, opts),
      warning: (msg, opts) => add('warning', msg, opts),
      info: (msg, opts) => add('info', msg, opts),
    },
  }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToastContext must be used within <ToastProvider>')
  }
  return ctx
}

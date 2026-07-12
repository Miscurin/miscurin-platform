'use client'

import { useToastContext } from '@/contexts/ToastContext'

/**
 * Hook to trigger toast notifications from any Client Component.
 *
 * Usage:
 *   const { toast } = useToast()
 *   toast.success('Saved successfully')
 *   toast.error('Something went wrong', { title: 'Error', duration: 8000 })
 */
export function useToast() {
  const { toast, dismiss } = useToastContext()
  return { toast, dismiss }
}

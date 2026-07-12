'use client'

import { useState, useCallback } from 'react'

interface UseDisclosureReturn {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  onOpenChange: (open: boolean) => void
}

/**
 * Generic hook for managing open/closed state.
 * Used by Modal, Drawer, Dropdown, and any other disclosure component.
 */
export function useDisclosure(defaultOpen = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])
  const onOpenChange = useCallback((value: boolean) => setIsOpen(value), [])

  return { isOpen, open, close, toggle, onOpenChange }
}

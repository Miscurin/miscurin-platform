'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'

export type DrawerSide = 'left' | 'right' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  side?: DrawerSide
  size?: DrawerSize
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
}

const sideWidthMap: Record<DrawerSide, Record<DrawerSize, string>> = {
  right: { sm: 'w-80', md: 'w-96', lg: 'w-[480px]', full: 'w-full' },
  left: { sm: 'w-80', md: 'w-96', lg: 'w-[480px]', full: 'w-full' },
  bottom: {
    sm: 'h-1/3 w-full',
    md: 'h-1/2 w-full',
    lg: 'h-2/3 w-full',
    full: 'h-[90vh] w-full',
  },
}

const animationMap: Record<DrawerSide, string> = {
  right: 'animate-slide-in-right',
  left: 'animate-slide-in-left',
  bottom: 'animate-slide-in-bottom',
}

const positionMap: Record<DrawerSide, string> = {
  right: 'right-0 top-0 h-full',
  left: 'left-0 top-0 h-full',
  bottom: 'bottom-0 left-0 right-0 rounded-t-2xl',
}

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  side = 'right',
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const isBottom = side === 'bottom'

  return createPortal(
    <div
      className="fixed inset-0 z-[400]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'drawer-title' : undefined}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-fade-in"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={cn(
          'absolute flex flex-col bg-white shadow-2xl',
          !isBottom && 'top-0',
          positionMap[side],
          sideWidthMap[side][size],
          animationMap[side]
        )}
      >
        {/* Header */}
        {(title ?? showCloseButton) && (
          <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-100 flex-shrink-0">
            <div className="flex flex-col gap-1">
              {title && (
                <h2
                  id="drawer-title"
                  className="text-base font-semibold text-slate-900 leading-tight"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-slate-500">{description}</p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className={cn(
                  'flex-shrink-0 rounded-xl p-2 text-slate-400',
                  'hover:bg-slate-100 hover:text-slate-600',
                  'transition-colors duration-150',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300'
                )}
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex-shrink-0 px-6 py-4 border-t border-slate-100">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

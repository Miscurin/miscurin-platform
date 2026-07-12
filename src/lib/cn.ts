/**
 * Utility for merging Tailwind class names conditionally.
 * Handles strings, undefined, null, false, and object maps.
 *
 * Usage:
 *   cn('base-class', isActive && 'active-class', { 'error-class': hasError })
 */
export function cn(
  ...inputs: (string | undefined | null | false | Record<string, boolean>)[]
): string {
  const classes: string[] = []

  for (const input of inputs) {
    if (!input) continue
    if (typeof input === 'string') {
      classes.push(input)
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key)
      }
    }
  }

  return classes.join(' ')
}

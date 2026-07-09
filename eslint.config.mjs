import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Enterprise rule overrides
  {
    rules: {
      // Prevent accidental console.log in production code
      'no-console': 'error',

      // Enforce explicit types — no `any` escape hatch
      '@typescript-eslint/no-explicit-any': 'error',

      // Enforce `import type` for type-only imports (improves tree-shaking)
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      // Catch unused variables (parameters prefixed with _ are exempt)
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
]

export default eslintConfig

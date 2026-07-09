export type UserRole = 'customer' | 'staff' | 'founder'

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  email_verified: boolean
  created_at: string
  updated_at: string
}

export interface AuthFormState {
  loading: boolean
  error: string | null
  success: string | null
}

export const ROLE_LABELS: Record<UserRole, string> = {
  customer: 'Customer',
  staff: 'Staff',
  founder: 'Founder',
}

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  customer: 'Shop and manage your orders',
  staff: 'Manage products and operations',
  founder: 'Full platform access',
}

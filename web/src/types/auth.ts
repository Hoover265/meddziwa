export type UserRole = 'clinician' | 'manager' | 'admin'

export interface User {
  id: string
  fullName: string
  email: string
  role: UserRole
  facilityId: string
  facilityName: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

export interface LoginCredentials {
  email: string
  password: string
  facilityCode?: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

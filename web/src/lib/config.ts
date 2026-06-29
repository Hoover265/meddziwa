const API_BASE = import.meta.env.VITE_API_URL ?? '/api/v1'

export const apiConfig = {
  baseURL: API_BASE,
  timeout: 15000,
} as const

export const storageKeys = {
  accessToken: 'meddziwa_access_token',
  refreshToken: 'meddziwa_refresh_token',
  user: 'meddziwa_user',
} as const

import { apiClient } from '@/api/client'
import type { AuthResponse, LoginCredentials } from '@/types'

export async function loginRequest(credentials: LoginCredentials): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login/', credentials)
  return data
}

export async function logoutRequest(): Promise<void> {
  await apiClient.post('/auth/logout/')
}

export async function fetchCurrentUser() {
  const { data } = await apiClient.get('/auth/me/')
  return data
}

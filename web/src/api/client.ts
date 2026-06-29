import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { apiConfig, storageKeys } from '@/lib/config'
import type { AuthTokens } from '@/types'

export const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(storageKeys.accessToken)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let refreshPromise: Promise<string | null> | null = null

async function refreshAccessToken(): Promise<string | null> {
  const refresh = localStorage.getItem(storageKeys.refreshToken)
  if (!refresh) return null

  try {
    const { data } = await axios.post<AuthTokens>(`${apiConfig.baseURL}/auth/refresh/`, {
      refresh,
    })
    localStorage.setItem(storageKeys.accessToken, data.access)
    if (data.refresh) {
      localStorage.setItem(storageKeys.refreshToken, data.refresh)
    }
    return data.access
  } catch {
    localStorage.removeItem(storageKeys.accessToken)
    localStorage.removeItem(storageKeys.refreshToken)
    localStorage.removeItem(storageKeys.user)
    return null
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config
    if (!original || error.response?.status !== 401) {
      return Promise.reject(error)
    }

    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null
      })
    }

    const newToken = await refreshPromise
    if (!newToken) {
      window.location.href = '/login'
      return Promise.reject(error)
    }

    original.headers.Authorization = `Bearer ${newToken}`
    return apiClient(original)
  },
)

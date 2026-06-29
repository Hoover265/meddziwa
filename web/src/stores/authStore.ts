import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { demoLogin } from '@/lib/demo-auth'
import { storageKeys } from '@/lib/config'
import type { LoginCredentials, User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          // Phase 0: demo auth until Django backend is ready
          const user = demoLogin(credentials.email, credentials.password)
          if (!user) {
            set({ isLoading: false, error: 'Invalid email or password.' })
            return false
          }

          localStorage.setItem(storageKeys.accessToken, 'demo-access-token')
          localStorage.setItem(storageKeys.refreshToken, 'demo-refresh-token')
          set({ user, isAuthenticated: true, isLoading: false })
          return true
        } catch {
          set({ isLoading: false, error: 'Unable to sign in. Please try again.' })
          return false
        }
      },

      logout: () => {
        localStorage.removeItem(storageKeys.accessToken)
        localStorage.removeItem(storageKeys.refreshToken)
        set({ user: null, isAuthenticated: false, error: null })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'meddziwa-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
)

import type { User } from '@/types'

/** Demo accounts for Phase 0 — remove when Django backend is connected */
export const DEMO_USERS: Record<string, User & { password: string }> = {
  'clinician@mponela.mw': {
    id: 'usr-001',
    fullName: 'Verydear Laisi',
    email: 'clinician@mponela.mw',
    password: 'demo1234',
    role: 'clinician',
    facilityId: 'fac-mponela',
    facilityName: 'Mponela Community Hospital',
  },
  'manager@dho.lilongwe.mw': {
    id: 'usr-002',
    fullName: 'Yauleb Chapola',
    email: 'manager@dho.lilongwe.mw',
    password: 'demo1234',
    role: 'manager',
    facilityId: 'fac-dho-lilongwe',
    facilityName: 'Lilongwe District Health Office',
  },
  'admin@meddziwa.mw': {
    id: 'usr-003',
    fullName: 'Patel Magomero',
    email: 'admin@meddziwa.mw',
    password: 'demo1234',
    role: 'admin',
    facilityId: 'fac-hq',
    facilityName: 'MedDziwa HQ',
  },
}

export function demoLogin(email: string, password: string): User | null {
  const account = DEMO_USERS[email.toLowerCase()]
  if (!account || account.password !== password) return null
  const { password: _, ...user } = account
  return user
}

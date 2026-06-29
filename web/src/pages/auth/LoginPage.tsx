import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  facilityCode: z.string().optional(),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'clinician@mponela.mw', password: 'demo1234' },
  })

  const onSubmit = async (data: LoginForm) => {
    clearError()
    const ok = await login(data)
    if (!ok) return

    const user = useAuthStore.getState().user
    if (user?.role === 'manager' || user?.role === 'admin') {
      navigate('/manager')
    } else {
      navigate('/clinician')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-brand-700 via-brand-500 to-brand-400 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center text-white">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl font-bold">
            +
          </div>
          <h1 className="text-3xl font-bold">MedDziwa</h1>
          <p className="mt-2 text-lg opacity-95">Know precisely. Treat correctly. Save early.</p>
          <p className="mt-1 text-sm opacity-80">Diagnostic Assistant — Phase 0 Foundation</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border-2 border-white/20 bg-white p-6 shadow-xl"
        >
          <h2 className="mb-5 text-xl font-bold text-slate-900">Sign in</h2>

          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />
            <Input
              label="Facility code (optional)"
              hint="Required for new clinician registration"
              error={errors.facilityCode?.message}
              {...register('facilityCode')}
            />
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-danger-500">
              {error}
            </p>
          )}

          <Button type="submit" fullWidth className="mt-6" disabled={isLoading}>
            {isLoading ? 'Signing in…' : 'Sign in'}
          </Button>

          <details className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            <summary className="cursor-pointer font-semibold text-brand-700">
              Demo accounts (Phase 0)
            </summary>
            <ul className="mt-2 space-y-1">
              <li>Clinician: clinician@mponela.mw</li>
              <li>Manager: manager@dho.lilongwe.mw</li>
              <li>Admin: admin@meddziwa.mw</li>
              <li>Password for all: demo1234</li>
            </ul>
          </details>
        </form>
      </div>
    </div>
  )
}

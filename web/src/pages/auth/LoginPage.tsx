import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/stores/authStore'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  facilityCode: z.string().optional(),
})

type LoginForm = z.infer<typeof loginSchema>

const demoAccounts = [
  {
    role: 'Clinician',
    email: 'clinician@mponela.mw',
    facility: 'Mponela Community Hospital',
  },
  {
    role: 'Manager',
    email: 'manager@dho.lilongwe.mw',
    facility: 'Lilongwe District Health Office',
  },
  {
    role: 'Admin',
    email: 'admin@meddziwa.mw',
    facility: 'MedDziwa HQ',
  },
]

export function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()

  const {
    register,
    handleSubmit,
    setValue,
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

  const useDemoAccount = (email: string) => {
    clearError()
    setValue('email', email, { shouldValidate: true })
    setValue('password', 'demo1234', { shouldValidate: true })
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(13,110,110,0.16),_transparent_35%),linear-gradient(135deg,_#f4fbfb_0%,_#eef7f8_55%,_#e9f4f5_100%)] px-3 py-4 text-slate-900 sm:px-4 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl flex-col overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/90 shadow-[0_30px_80px_-20px_rgba(3,50,56,0.3)] backdrop-blur md:rounded-[2rem] xl:flex-row">
        <section className="flex flex-col justify-between bg-gradient-to-br from-brand-800 via-brand-600 to-brand-500 p-6 text-white sm:p-8 lg:w-[46%] lg:p-10 xl:p-12">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl font-bold shadow-lg sm:h-16 sm:w-16">
                +
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-50 sm:text-base">
                  MedDziwa
                </p>
                <p className="text-sm text-brand-50/90 sm:text-base">
                  Know precisely. Treat correctly. Save early.
                </p>
              </div>
            </div>

            <div className="mt-6 max-w-3xl">
              <h2 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                Clinical support for every stage of care.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-50/95 sm:text-base lg:text-lg">
                A calm and trusted workflow for anonymised intake, guided symptom review, and
                supportive treatment decisions.
              </p>
            </div>
          </div>

          <div className="mt-8 hidden gap-3 md:grid lg:grid-cols-1 xl:grid-cols-3">
            {[
              ['Privacy first', 'No names, IDs, phone numbers, or addresses.'],
              ['Role-based access', 'Clinicians and managers land in separate workspaces.'],
              ['Flexible growth', 'Backend, mobile, and analytics features can extend later.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-white/20 bg-white/10 p-4">
                <p className="font-bold text-white">{title}</p>
                <p className="mt-2 text-sm leading-6 text-brand-50/90">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-1 items-center bg-slate-50/80 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">
                Secure access
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Sign in</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use a demo account while the production authentication service is pending.
              </p>
            </div>

            <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_-20px_rgba(15,23,42,0.35)]">
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                placeholder="name@facility.org"
                {...register('email')}
              />
              <Input
                label="Password"
                type="password"
                autoComplete="current-password"
                error={errors.password?.message}
                placeholder="Enter your password"
                {...register('password')}
              />
              <Input
                label="Facility code"
                hint="Reserved for registration and facility assignment."
                error={errors.facilityCode?.message}
                placeholder="e.g. MPN-01"
                {...register('facilityCode')}
              />

              {error && (
                <p className="rounded-xl border border-danger-200 bg-danger-50 px-4 py-3 text-sm font-semibold text-danger-600">
                  {error}
                </p>
              )}

              <Button type="submit" fullWidth disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>

            <div className="rounded-[1.25rem] border border-brand-100 bg-brand-50 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-bold text-brand-950">Reviewer demo access</h3>
                <Badge tone="brand">Password: demo1234</Badge>
              </div>
              <div className="mt-3 space-y-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.email}
                    type="button"
                    onClick={() => useDemoAccount(account.email)}
                    className="w-full rounded-xl border border-white bg-white px-3 py-3 text-left transition-all hover:border-brand-300 hover:shadow-sm"
                  >
                    <span className="block font-bold text-slate-950">{account.role}</span>
                    <span className="block text-sm text-slate-600">{account.email}</span>
                    <span className="block text-xs font-semibold text-brand-700">
                      {account.facility}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/stores/authStore'

const clinicianLinks = [
  { to: '/clinician', label: 'Home', end: true },
  { to: '/clinician/intake', label: 'New case' },
]

export function ClinicianLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-xl font-black text-white">
              +
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand-700">MedDziwa</p>
              <h1 className="text-xl font-bold text-slate-950">Clinician Workspace</h1>
            </div>
          </div>
          <div className="rounded-lg bg-slate-100 px-4 py-3 text-sm sm:text-right">
            <p className="font-bold text-slate-950">{user?.fullName}</p>
            <p className="text-slate-600">{user?.facilityName}</p>
          </div>
        </div>

        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-4">
          {clinicianLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  'touch-target shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition-colors',
                  isActive
                    ? 'bg-brand-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-800',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-6">
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-slate-600">
            Decision support only. The clinician retains final clinical authority.
          </p>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      </footer>
    </div>
  )
}

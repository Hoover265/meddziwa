import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'

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
      <header className="border-b-2 border-brand-500 bg-brand-500 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-sm font-medium opacity-90">MedDziwa</p>
            <h1 className="text-xl font-bold">Diagnostic Assistant</h1>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold">{user?.fullName}</p>
            <p className="opacity-90">{user?.facilityName}</p>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 px-4 pb-3">
          {clinicianLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  'touch-target rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                  isActive ? 'bg-white text-brand-700' : 'text-white/90 hover:bg-white/15',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-5xl px-4 pb-6">
        <p className="text-center text-xs text-slate-500">
          Decision support only — clinician retains final clinical authority.
        </p>
        <div className="mt-2 flex justify-center">
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      </footer>
    </div>
  )
}

import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/stores/authStore'

const managerLinks = [
  { to: '/manager', label: 'Overview', end: true },
  { to: '/manager/outbreaks', label: 'Outbreaks' },
  { to: '/manager/stock', label: 'Pharmacy stock' },
  { to: '/manager/analytics', label: 'Analytics' },
  { to: '/manager/users', label: 'Users' },
]

export function ManagerLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="border-b border-slate-200 px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-xl font-black text-white">
              +
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand-700">MedDziwa</p>
              <h1 className="text-lg font-bold text-slate-950">Manager Dashboard</h1>
            </div>
          </div>
          <div className="mt-5 rounded-lg bg-slate-100 px-4 py-3 text-sm">
            <p className="font-bold text-slate-950">{user?.fullName}</p>
            <p className="text-slate-600">{user?.facilityName}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {managerLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  'touch-target block rounded-lg px-4 py-3 text-sm font-bold transition-colors',
                  isActive
                    ? 'bg-brand-500 text-white'
                    : 'text-slate-700 hover:bg-brand-50 hover:text-brand-800',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-3">
          <Button variant="ghost" size="sm" fullWidth onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="border-b border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand-700">MedDziwa</p>
              <h1 className="font-bold text-slate-950">Manager Dashboard</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {managerLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  [
                    'touch-target shrink-0 rounded-lg px-3 py-2 text-sm font-bold',
                    isActive ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-700',
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
      </div>
    </div>
  )
}

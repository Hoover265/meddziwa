import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'

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
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r-2 border-slate-200 bg-white lg:flex">
        <div className="border-b-2 border-brand-500 bg-brand-500 px-5 py-6 text-white">
          <p className="text-sm opacity-90">MedDziwa</p>
          <h1 className="text-lg font-bold">Manager Dashboard</h1>
          <p className="mt-2 text-sm opacity-90">{user?.fullName}</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {managerLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  'touch-target block rounded-lg px-4 py-3 text-sm font-semibold',
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-700 hover:bg-slate-50',
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
          <p className="font-bold text-brand-700">MedDziwa Manager</p>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {managerLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  [
                    'touch-target shrink-0 rounded-lg px-3 py-2 text-sm font-semibold',
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

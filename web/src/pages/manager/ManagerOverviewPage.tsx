import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MOCK_ALERTS, MOCK_ANALYTICS, MOCK_STOCK } from '@/data/manager-mock'

export function ManagerOverviewPage() {
  const lowStock = MOCK_STOCK.filter((s) => s.quantity <= s.threshold)
  const activeAlerts = MOCK_ALERTS.filter((a) => a.status === 'active')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard overview</h2>
        <p className="mt-1 text-slate-600">District health surveillance and facility operations.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-sm font-semibold text-slate-500">Total cases (all time)</p>
          <p className="mt-1 text-3xl font-bold text-brand-600">{MOCK_ANALYTICS.totalCases.toLocaleString()}</p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-slate-500">Cases this week</p>
          <p className="mt-1 text-3xl font-bold text-brand-600">{MOCK_ANALYTICS.casesThisWeek}</p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-slate-500">Active outbreak alerts</p>
          <p className="mt-1 text-3xl font-bold text-danger-500">{activeAlerts.length}</p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-slate-500">Low stock items</p>
          <p className="mt-1 text-3xl font-bold text-warning-500">{lowStock.length}</p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Recent outbreak alerts">
          {activeAlerts.length === 0 ? (
            <p className="text-slate-600">No active alerts.</p>
          ) : (
            <ul className="space-y-3">
              {activeAlerts.map((alert) => (
                <li
                  key={alert.id}
                  className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3"
                >
                  <div>
                    <p className="font-bold text-red-900">{alert.disease}</p>
                    <p className="text-sm text-red-800">{alert.district} — {alert.caseCount} cases / {alert.windowDays}d</p>
                  </div>
                  <Badge tone="danger">Active</Badge>
                </li>
              ))}
            </ul>
          )}
          <Link to="/manager/outbreaks" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline">
            View outbreak map →
          </Link>
        </Card>

        <Card title="Pharmacy stock alerts">
          <ul className="space-y-3">
            {lowStock.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3"
              >
                <div>
                  <p className="font-bold text-amber-900">{item.drugName}</p>
                  <p className="text-sm text-amber-800">{item.quantity} {item.unit} remaining (threshold: {item.threshold})</p>
                </div>
                <Badge tone="warning">Low</Badge>
              </li>
            ))}
          </ul>
          <Link to="/manager/stock" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline">
            Manage stock →
          </Link>
        </Card>
      </div>
    </div>
  )
}

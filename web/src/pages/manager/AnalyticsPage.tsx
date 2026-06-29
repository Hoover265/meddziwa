import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { Card } from '@/components/ui/Card'
import { MOCK_ANALYTICS } from '@/data/manager-mock'

const COLORS = ['#0d6e6e', '#45b8b8', '#e8a838', '#6366f1', '#059669']

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Case analytics</h2>
        <p className="mt-1 text-slate-600">Diagnosis distribution and trends for reporting to MoH and donors.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Top diagnoses">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_ANALYTICS.topDiagnoses}
                  dataKey="count"
                  nameKey="disease"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ disease, percent }) => `${disease} ${(percent * 100).toFixed(0)}%`}
                >
                  {MOCK_ANALYTICS.topDiagnoses.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Cases by district">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ANALYTICS.casesByDistrict} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0d6e6e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="Export reports" subtitle="CSV and PDF export — wired in Phase 3 when backend is ready.">
        <p className="text-slate-600">
          Reports will include case totals, diagnosis breakdown, district trends, and stock status for donor and Ministry submissions.
        </p>
      </Card>
    </div>
  )
}

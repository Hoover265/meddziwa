import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useAuthStore } from '@/stores/authStore'

export function ClinicianHomePage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Welcome, {user?.fullName?.split(' ')[0]}</h2>
        <p className="mt-1 text-slate-600">{user?.facilityName}</p>
      </div>

      <Card title="Start a new consultation" subtitle="Patient data is anonymised — no names or national IDs stored.">
        <p className="mb-4 text-slate-700">
          Walk through intake, symptom questions, ML diagnosis, and STG treatment recommendations.
          All core steps work offline once the mobile app is deployed.
        </p>
        <Link to="/clinician/intake">
          <Button size="lg">New patient case</Button>
        </Link>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card title="Today's workflow">
          <ol className="list-inside list-decimal space-y-2 text-slate-700">
            <li>Patient intake (age, gender, complaint)</li>
            <li>Dynamic symptom questionnaire</li>
            <li>ML diagnosis (on-device in production)</li>
            <li>STG treatment & referral check</li>
          </ol>
        </Card>

        <Card title="System status">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-700">ML engine</span>
              <Badge tone="warning">Mock (Phase 0)</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">STG lookup</span>
              <Badge tone="success">Embedded</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Backend sync</span>
              <Badge tone="neutral">Pending API</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

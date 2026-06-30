import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useAuthStore } from '@/stores/authStore'

const workflow = [
  'Anonymised patient intake',
  'Age-aware symptom questionnaire',
  'Ranked diagnosis support',
  'STG treatment and referral check',
]

export function ClinicianHomePage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="space-y-6">
      <section className="rounded-xl border-2 border-brand-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge tone="brand">Clinician workflow</Badge>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Welcome, {user?.fullName?.split(' ')[0]}
            </h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              Start an anonymised consultation and move through structured symptoms, diagnosis
              support, and treatment guidance aligned with the MedDziwa requirements.
            </p>
          </div>
          <Link to="/clinician/intake">
            <Button size="lg">New patient case</Button>
          </Link>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card title="Today&apos;s workflow" subtitle="Designed for fast clinical consultations.">
          <div className="grid gap-3 sm:grid-cols-2">
            {workflow.map((step, index) => (
              <div key={step} className="rounded-lg border-2 border-slate-100 bg-slate-50 p-4">
                <p className="text-sm font-bold text-brand-700">Step {index + 1}</p>
                <p className="mt-1 font-semibold text-slate-900">{step}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Clinical guardrails">
          <div className="space-y-3">
            <div className="rounded-lg bg-emerald-50 p-4">
              <p className="font-bold text-emerald-900">Anonymised by design</p>
              <p className="mt-1 text-sm text-emerald-800">
                No names, national IDs, phone numbers, or addresses should be entered.
              </p>
            </div>
            <div className="rounded-lg bg-amber-50 p-4">
              <p className="font-bold text-amber-900">Decision support only</p>
              <p className="mt-1 text-sm text-amber-800">
                Final diagnosis and treatment decisions remain with the clinician.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-sm font-semibold text-slate-500">ML engine</p>
          <div className="mt-3">
            <Badge tone="warning">Mock phase</Badge>
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-semibold text-slate-500">STG lookup</p>
          <div className="mt-3">
            <Badge tone="success">Embedded data</Badge>
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-semibold text-slate-500">Backend sync</p>
          <div className="mt-3">
            <Badge tone="neutral">Pending API</Badge>
          </div>
        </Card>
      </div>
    </div>
  )
}

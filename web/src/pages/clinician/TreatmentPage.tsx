import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { STG_TREATMENTS } from '@/data/clinical'
import { useConsultationStore } from '@/stores/consultationStore'

export function TreatmentPage() {
  const navigate = useNavigate()
  const draft = useConsultationStore((s) => s.draft)
  const reset = useConsultationStore((s) => s.reset)

  if (!draft.patient || !draft.selectedDiagnosis) {
    navigate('/clinician/intake', { replace: true })
    return null
  }

  const treatment =
    STG_TREATMENTS[draft.selectedDiagnosis] ?? {
      drug: 'Refer to Malawi STG',
      adultDose: 'Consult STG for condition-specific dosing',
      paediatricDose: 'Weight-based per STG',
      route: 'As per STG',
      duration: 'As per STG',
      referralCriteria: ['Complex or severe presentation'],
      dangerSigns: ['Any danger sign per IMCI'],
    }

  const handleComplete = () => {
    // Phase 0: case saved locally in store only; backend sync in Phase 3
    reset()
    navigate('/clinician')
  }

  const isPaediatric = draft.patient.age < 18

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Treatment recommendation</h2>
        <p className="mt-1 text-slate-600">
          From Malawi Standard Treatment Guidelines — embedded, works offline in production.
        </p>
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="brand">{draft.selectedDiagnosis}</Badge>
          <span className="text-slate-600">
            Patient: {draft.patient.age}y, {draft.patient.gender}
          </span>
        </div>
      </Card>

      <Card title="Recommended treatment">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold text-slate-500">Drug</dt>
            <dd className="text-lg font-bold text-slate-900">{treatment.drug}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-slate-500">Route</dt>
            <dd className="text-lg font-medium text-slate-900">{treatment.route}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-slate-500">Duration</dt>
            <dd className="text-lg font-medium text-slate-900">{treatment.duration}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-slate-500">Dose</dt>
            <dd className="text-lg font-medium text-slate-900">
              {isPaediatric ? treatment.paediatricDose : treatment.adultDose}
            </dd>
          </div>
        </dl>
      </Card>

      {treatment.dangerSigns && treatment.dangerSigns.length > 0 && (
        <Card accent="danger" title="Danger signs — refer immediately if present">
          <ul className="list-inside list-disc space-y-1 text-red-900">
            {treatment.dangerSigns.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>
        </Card>
      )}

      {treatment.referralCriteria && treatment.referralCriteria.length > 0 && (
        <Card accent="warning" title="Referral criteria">
          <ul className="list-inside list-disc space-y-1 text-amber-900">
            {treatment.referralCriteria.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Card>
      )}

      <Card subtitle="Case will sync to backend when API is connected (Phase 3).">
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleComplete}>Complete & save case</Button>
          <Button variant="secondary" onClick={() => navigate('/clinician/diagnosis')}>
            Change diagnosis
          </Button>
        </div>
      </Card>
    </div>
  )
}

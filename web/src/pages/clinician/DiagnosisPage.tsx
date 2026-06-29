import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { mockDiagnose } from '@/data/clinical'
import { useConsultationStore } from '@/stores/consultationStore'

const MOCK_AI_NOTE =
  'Consider co-infection with malaria and typhoid in this district during rainy season. ' +
  'If rapid test negative, still evaluate typhoid given overlapping presentation. ' +
  'This is a clinical note — not a confirmed diagnosis.'

export function DiagnosisPage() {
  const navigate = useNavigate()
  const draft = useConsultationStore((s) => s.draft)
  const setDiagnoses = useConsultationStore((s) => s.setDiagnoses)
  const selectDiagnosis = useConsultationStore((s) => s.selectDiagnosis)
  const setAiAssistNote = useConsultationStore((s) => s.setAiAssistNote)

  const [loading, setLoading] = useState(true)
  const [lowConfidence, setLowConfidence] = useState(false)
  const [showAiAssist, setShowAiAssist] = useState(false)

  useEffect(() => {
    if (!draft.patient) {
      navigate('/clinician/intake', { replace: true })
      return
    }

    const timer = setTimeout(() => {
      const result = mockDiagnose(draft.patient!.chiefComplaint)
      setDiagnoses(result.diagnoses)
      setLowConfidence(result.lowConfidence)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [draft.patient, navigate, setDiagnoses])

  if (!draft.patient) return null

  const handleSelect = (disease: string) => {
    selectDiagnosis(disease)
    navigate('/clinician/treatment')
  }

  const handleAiAssist = () => {
    setAiAssistNote(MOCK_AI_NOTE)
    setShowAiAssist(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Diagnosis results</h2>
        <p className="mt-1 text-slate-600">
          Ranked differential diagnoses from the ML engine. Clinician selects final diagnosis.
        </p>
      </div>

      {loading ? (
        <Card>
          <div className="flex items-center gap-4 py-8">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
            <p className="text-lg font-medium text-slate-700">Running inference…</p>
          </div>
        </Card>
      ) : (
        <>
          {lowConfidence && (
            <Card accent="warning" title="Low confidence" subtitle="Top diagnosis below 50%.">
              <p className="mb-4 text-amber-900">
                Consider using AI Assist for supplementary clinical notes, or gather additional history.
              </p>
              <Button variant="secondary" onClick={handleAiAssist}>
                Request AI Assist
              </Button>
            </Card>
          )}

          {showAiAssist && (
            <Card accent="warning" title="AI Assist — clinical note">
              <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
                Not a diagnosis — supplementary guidance only
              </p>
              <p className="mt-2 text-slate-800">{MOCK_AI_NOTE}</p>
            </Card>
          )}

          <div className="space-y-3">
            {draft.diagnoses.map((dx, index) => (
              <Card key={dx.disease} className="cursor-pointer transition-shadow hover:shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-900">
                        {index + 1}. {dx.disease}
                      </span>
                      {index === 0 && <Badge tone="brand">Most likely</Badge>}
                    </div>
                    <p className="mt-1 text-2xl font-bold text-brand-600">
                      {(dx.probability * 100).toFixed(0)}%
                    </p>
                  </div>
                  <Button onClick={() => handleSelect(dx.disease)}>Select & treat</Button>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${dx.probability * 100}%` }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      <Button variant="secondary" onClick={() => navigate('/clinician/questionnaire')}>
        Back to symptoms
      </Button>
    </div>
  )
}

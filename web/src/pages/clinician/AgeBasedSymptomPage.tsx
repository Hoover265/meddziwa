import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { NeonatalAssessment } from '@/components/symptoms/NeonatalAssessment'
import { SymptomChecklist } from '@/components/symptoms/SymptomChecklist'
import {
  AGE_GROUP_DEFINITIONS,
  calculateAgeGroup,
  getSymptomsByAgeGroup,
} from '@/data/ageBasedSymptoms'
import { useConsultationStore } from '@/stores/consultationStore'
import type { AgeGroup } from '@/types/case'

interface AnswerState {
  [symptomId: string]: {
    selected: boolean
    followUpValue?: string
  }
}

export function AgeBasedSymptomPage() {
  const navigate = useNavigate()
  const draft = useConsultationStore((state) => state.draft)
  const addSymptomAnswer = useConsultationStore((state) => state.addSymptomAnswer)

  const patientAge = draft.patient?.age ?? 0
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>(
    calculateAgeGroup(patientAge) as AgeGroup,
  )
  const [customAge, setCustomAge] = useState(patientAge.toString())
  const [answers, setAnswers] = useState<AnswerState>({})

  const symptoms = useMemo(() => getSymptomsByAgeGroup(selectedAgeGroup), [selectedAgeGroup])

  if (!draft.patient) {
    navigate('/clinician/intake', { replace: true })
    return null
  }

  const handleAgeChange = (newAge: string) => {
    const ageNum = Number.parseInt(newAge, 10)
    setCustomAge(newAge)

    if (!Number.isNaN(ageNum)) {
      setSelectedAgeGroup(calculateAgeGroup(ageNum) as AgeGroup)
    }
  }

  const handleAnswerChange = (
    symptomId: string,
    selected: boolean,
    followUpValue?: string,
  ) => {
    setAnswers((current) => ({
      ...current,
      [symptomId]: {
        selected,
        followUpValue,
      },
    }))
  }

  const handleContinue = () => {
    symptoms?.categories.forEach((category) => {
      category.items.forEach((item) => {
        const answer = answers[item.id]
        if (answer?.selected) {
          addSymptomAnswer({
            questionId: item.id,
            value: answer.followUpValue || true,
          })
        }
      })
    })
    navigate('/clinician/diagnosis')
  }

  const handleNeonatalContinue = (neonatalAnswers: Record<string, string>) => {
    Object.entries(neonatalAnswers).forEach(([questionId, value]) => {
      if (value) {
        addSymptomAnswer({
          questionId: `neonatal_${questionId}`,
          value,
        })
      }
    })
    navigate('/clinician/diagnosis')
  }

  if (selectedAgeGroup === 'neonate') {
    return (
      <NeonatalAssessment
        onBack={() => navigate('/clinician/intake', { replace: true })}
        onContinue={handleNeonatalContinue}
      />
    )
  }

  if (!symptoms) {
    return (
      <div className="space-y-6">
        <Card className="border-red-200 bg-red-50 p-6">
          <p className="text-red-700">Unable to load symptoms for the selected age group.</p>
        </Card>
      </div>
    )
  }

  const selectedSymptomCount = Object.values(answers).filter((answer) => answer.selected).length

  const dangerSignCount = symptoms.categories.reduce(
    (count, category) =>
      count +
      category.items.filter((item) => item.isDangerSign && answers[item.id]?.selected).length,
    0,
  )

  const ageGroupInfo = AGE_GROUP_DEFINITIONS.find((ageGroup) => ageGroup.value === selectedAgeGroup)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Symptom Assessment</h1>
        <p className="text-lg text-slate-600">
          Based on {draft.patient.age} years old ({ageGroupInfo?.label})
        </p>
      </div>

      <Card className="space-y-4 border-brand-200 bg-brand-50 p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Patient Age</label>
            <div className="mt-2 flex items-center gap-2">
              <Input
                type="number"
                min="0"
                max="150"
                value={customAge}
                onChange={(event) => handleAgeChange(event.target.value)}
                className="flex-1"
                placeholder="Enter age in years"
              />
              <span className="text-sm text-slate-600">years</span>
            </div>
          </div>

          <Select
            label="Age Group"
            value={selectedAgeGroup}
            onChange={(event) => setSelectedAgeGroup(event.target.value as AgeGroup)}
            options={AGE_GROUP_DEFINITIONS.map((ageGroup) => ({
              value: ageGroup.value,
              label: `${ageGroup.label} (${ageGroup.ageRange})`,
            }))}
          />
        </div>

        {dangerSignCount > 0 && (
          <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-sm font-bold text-white">
                !
              </span>
              <div>
                <h3 className="font-bold text-red-900">
                  {dangerSignCount} Danger Sign{dangerSignCount !== 1 ? 's' : ''} Detected
                </h3>
                <p className="text-sm text-red-700">
                  This patient requires urgent evaluation and possible referral.
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      <SymptomChecklist symptoms={symptoms} onAnswerChange={handleAnswerChange} answers={answers} />

      <Card className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
        <div className="space-y-1">
          <p className="text-sm text-slate-600">Symptoms selected</p>
          <p className="text-3xl font-bold text-brand-600">{selectedSymptomCount}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/clinician/intake', { replace: true })}
          >
            Back to Intake
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleContinue}
            disabled={selectedSymptomCount === 0}
          >
            Continue to Diagnosis
          </Button>
        </div>
      </Card>
    </div>
  )
}

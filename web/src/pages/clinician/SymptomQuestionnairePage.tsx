import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getQuestionsForComplaint } from '@/data/clinical'
import { useConsultationStore } from '@/stores/consultationStore'
import type { SymptomQuestion } from '@/data/clinical'

function QuestionField({
  question,
  value,
  onChange,
}: {
  question: SymptomQuestion
  value: string | boolean | undefined
  onChange: (val: string | boolean) => void
}) {
  if (question.type === 'boolean') {
    return (
      <div className="flex gap-3">
        <Button
          type="button"
          variant={value === true ? 'primary' : 'secondary'}
          onClick={() => onChange(true)}
        >
          Yes
        </Button>
        <Button
          type="button"
          variant={value === false ? 'primary' : 'secondary'}
          onClick={() => onChange(false)}
        >
          No
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {question.options?.map((opt) => (
        <label
          key={opt.value}
          className={[
            'touch-target flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3',
            value === opt.value ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-white',
          ].join(' ')}
        >
          <input
            type="radio"
            name={question.id}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="h-5 w-5 accent-brand-500"
          />
          <span className="text-base font-medium text-slate-800">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}

export function SymptomQuestionnairePage() {
  const navigate = useNavigate()
  const draft = useConsultationStore((s) => s.draft)
  const addSymptomAnswer = useConsultationStore((s) => s.addSymptomAnswer)

  const questions = useMemo(
    () => getQuestionsForComplaint(draft.patient?.chiefComplaint ?? 'default'),
    [draft.patient?.chiefComplaint],
  )

  const [answers, setAnswers] = useState<Record<string, string | boolean>>(() => {
    const initial: Record<string, string | boolean> = {}
    draft.symptoms.forEach((s) => {
      initial[s.questionId] = s.value as string | boolean
    })
    return initial
  })

  if (!draft.patient) {
    navigate('/clinician/intake', { replace: true })
    return null
  }

  const allAnswered = questions.every((q) => answers[q.id] !== undefined)

  const handleContinue = () => {
    questions.forEach((q) => {
      const val = answers[q.id]
      if (val !== undefined) {
        addSymptomAnswer({ questionId: q.id, value: val })
      }
    })
    navigate('/clinician/diagnosis')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Symptom questionnaire</h2>
        <p className="mt-1 text-slate-600">
          Based on chief complaint:{' '}
          <strong>{draft.patient.chiefComplaint.replace(/_/g, ' ')}</strong> — IMCI/STG aligned
          questions.
        </p>
      </div>

      {questions.map((question, index) => (
        <Card key={question.id} title={`${index + 1}. ${question.text}`}>
          <QuestionField
            question={question}
            value={answers[question.id]}
            onChange={(val) => setAnswers((prev) => ({ ...prev, [question.id]: val }))}
          />
        </Card>
      ))}

      <div className="flex gap-3">
        <Button type="button" variant="secondary" onClick={() => navigate('/clinician/intake')}>
          Back
        </Button>
        <Button type="button" disabled={!allAnswered} onClick={handleContinue}>
          Run diagnosis
        </Button>
      </div>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  NEONATAL_QUESTION_COUNT,
  NEONATAL_SECTIONS,
  type NeonatalQuestion,
  type NeonatalSection,
} from '@/data/neonatalInterface'

interface NeonatalAssessmentProps {
  onBack: () => void
  onContinue: (answers: Record<string, string>) => void
}

function isClinicalDanger(question: NeonatalQuestion, value?: string) {
  if (!value) return false

  const option = question.options?.find((item) => item.value === value)
  if (option?.danger) return true

  const numericValue = Number(value)
  if (Number.isNaN(numericValue)) return false

  if (question.id === 'highest_temp') return numericValue >= 38 || numericValue < 36
  if (question.id === 'respiratory_rate') return numericValue > 60 || numericValue < 30
  return false
}

function getAnswerLabel(question: NeonatalQuestion, value: string) {
  return question.options?.find((option) => option.value === value)?.label ?? value
}

function SectionTabs({
  activeSectionId,
  answers,
  onSelect,
}: {
  activeSectionId: string
  answers: Record<string, string>
  onSelect: (sectionId: string) => void
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {NEONATAL_SECTIONS.map((section) => {
        const answered = section.questions.filter((question) => answers[question.id]).length
        const hasDanger = section.questions.some((question) =>
          isClinicalDanger(question, answers[question.id]),
        )
        const isActive = section.id === activeSectionId

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSelect(section.id)}
            className={[
              'min-h-24 rounded-lg border-2 p-3 text-left transition-colors',
              isActive
                ? 'border-brand-500 bg-brand-50 shadow-sm'
                : 'border-slate-200 bg-white hover:border-brand-200 hover:bg-slate-50',
            ].join(' ')}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-xs font-bold text-white">
                {section.icon}
              </span>
              {hasDanger && <Badge tone="danger">Urgent</Badge>}
            </div>
            <p className="mt-3 text-sm font-bold leading-snug text-slate-900">{section.title}</p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              {answered}/{section.questions.length}
            </p>
          </button>
        )
      })}
    </div>
  )
}

function ChoiceQuestion({
  question,
  value,
  onChange,
}: {
  question: NeonatalQuestion
  value?: string
  onChange: (value: string) => void
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {question.options?.map((option) => {
        const selected = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={[
              'min-h-12 rounded-lg border-2 px-3 py-2 text-left text-sm font-semibold transition-colors',
              selected && option.danger
                ? 'border-red-500 bg-red-50 text-red-900'
                : selected
                  ? 'border-brand-500 bg-brand-50 text-brand-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-brand-200',
            ].join(' ')}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function NumberQuestion({
  question,
  value,
  onChange,
}: {
  question: NeonatalQuestion
  value?: string
  onChange: (value: string) => void
}) {
  const danger = isClinicalDanger(question, value)

  return (
    <div className="flex flex-col gap-2 sm:max-w-xs">
      <div className="flex items-center rounded-lg border-2 border-slate-200 bg-white focus-within:border-brand-500">
        <input
          type="number"
          step="any"
          value={value ?? ''}
          placeholder={question.placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-12 flex-1 rounded-l-lg bg-transparent px-3 text-base font-semibold text-slate-900 outline-none"
        />
        {question.unit && (
          <span className="px-3 text-sm font-semibold text-slate-500">{question.unit}</span>
        )}
      </div>
      {danger && <p className="text-sm font-semibold text-red-700">Urgent range selected</p>}
    </div>
  )
}

function QuestionRow({
  question,
  value,
  onChange,
}: {
  question: NeonatalQuestion
  value?: string
  onChange: (value: string) => void
}) {
  const danger = isClinicalDanger(question, value)

  return (
    <div
      className={[
        'rounded-lg border-2 p-4',
        danger ? 'border-red-200 bg-red-50/70' : 'border-slate-200 bg-white',
      ].join(' ')}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="font-semibold leading-snug text-slate-900">{question.prompt}</p>
        {danger && <Badge tone="danger">Danger sign</Badge>}
      </div>
      {question.type === 'number' ? (
        <NumberQuestion question={question} value={value} onChange={onChange} />
      ) : (
        <ChoiceQuestion question={question} value={value} onChange={onChange} />
      )}
    </div>
  )
}

function DangerSummary({
  sections,
  answers,
}: {
  sections: NeonatalSection[]
  answers: Record<string, string>
}) {
  const dangerAnswers = sections.flatMap((section) =>
    section.questions
      .filter((question) => isClinicalDanger(question, answers[question.id]))
      .map((question) => ({
        section: section.title,
        prompt: question.prompt,
        answer: getAnswerLabel(question, answers[question.id]),
      })),
  )

  if (dangerAnswers.length === 0) {
    return (
      <Card className="border-emerald-200 bg-emerald-50 p-4">
        <p className="text-sm font-semibold text-emerald-900">No danger signs selected yet.</p>
      </Card>
    )
  }

  return (
    <Card className="border-red-300 bg-red-50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
            Urgent neonatal review
          </p>
          <h3 className="mt-1 text-xl font-bold text-red-950">
            {dangerAnswers.length} danger sign{dangerAnswers.length === 1 ? '' : 's'} selected
          </h3>
        </div>
        <Badge tone="danger">Do not delay</Badge>
      </div>
      <div className="mt-4 grid gap-2">
        {dangerAnswers.slice(0, 4).map((item) => (
          <div key={`${item.section}-${item.prompt}`} className="rounded-lg bg-white/80 p-3">
            <p className="text-xs font-bold uppercase text-red-700">{item.section}</p>
            <p className="mt-1 text-sm font-semibold text-red-950">{item.prompt}</p>
            <p className="text-sm text-red-800">{item.answer}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export function NeonatalAssessment({ onBack, onContinue }: NeonatalAssessmentProps) {
  const [activeSectionId, setActiveSectionId] = useState(NEONATAL_SECTIONS[0].id)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const activeSection = NEONATAL_SECTIONS.find((section) => section.id === activeSectionId)
    ?? NEONATAL_SECTIONS[0]

  const answeredCount = Object.values(answers).filter(Boolean).length
  const progress = Math.round((answeredCount / NEONATAL_QUESTION_COUNT) * 100)

  const activeIndex = NEONATAL_SECTIONS.findIndex((section) => section.id === activeSectionId)
  const canGoPrevious = activeIndex > 0
  const canGoNext = activeIndex < NEONATAL_SECTIONS.length - 1

  const dangerCount = useMemo(
    () =>
      NEONATAL_SECTIONS.reduce(
        (count, section) =>
          count +
          section.questions.filter((question) => isClinicalDanger(question, answers[question.id]))
            .length,
        0,
      ),
    [answers],
  )

  const setAnswer = (questionId: string, value: string) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }))
  }

  const moveSection = (direction: 1 | -1) => {
    const nextSection = NEONATAL_SECTIONS[activeIndex + direction]
    if (nextSection) setActiveSectionId(nextSection.id)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border-2 border-brand-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge tone="brand">Neonatal interface</Badge>
            <h1 className="mt-3 text-3xl font-bold tracking-normal text-slate-950">
              Neonatal Assessment
            </h1>
            <p className="mt-2 max-w-3xl text-base text-slate-600">
              0-28 days: activity, feeding, breathing, colour, jaundice, digestion, neurological
              signs, cord, birth history, maternal history, and growth measurements.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center sm:min-w-80">
            <div className="rounded-lg bg-slate-100 p-3">
              <p className="text-xs font-semibold uppercase text-slate-500">Answered</p>
              <p className="text-2xl font-bold text-slate-950">{answeredCount}</p>
            </div>
            <div className="rounded-lg bg-brand-50 p-3">
              <p className="text-xs font-semibold uppercase text-brand-700">Progress</p>
              <p className="text-2xl font-bold text-brand-800">{progress}%</p>
            </div>
            <div className="rounded-lg bg-red-50 p-3">
              <p className="text-xs font-semibold uppercase text-red-700">Urgent</p>
              <p className="text-2xl font-bold text-red-800">{dangerCount}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full bg-brand-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <SectionTabs
        activeSectionId={activeSectionId}
        answers={answers}
        onSelect={setActiveSectionId}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <Card className="p-0">
          <header className="border-b-2 border-slate-100 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">
                    {activeSection.icon}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-950">{activeSection.title}</h2>
                </div>
                <p className="mt-2 text-sm text-slate-600">{activeSection.description}</p>
              </div>
              <Badge tone="neutral">
                {activeIndex + 1}/{NEONATAL_SECTIONS.length}
              </Badge>
            </div>
          </header>

          <div className="space-y-3 p-5">
            {activeSection.questions.map((question) => (
              <QuestionRow
                key={question.id}
                question={question}
                value={answers[question.id]}
                onChange={(value) => setAnswer(question.id, value)}
              />
            ))}
          </div>

          <footer className="flex flex-col gap-3 border-t-2 border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <Button type="button" variant="secondary" onClick={onBack}>
              Back to Intake
            </Button>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="ghost"
                disabled={!canGoPrevious}
                onClick={() => moveSection(-1)}
              >
                Previous
              </Button>
              {canGoNext ? (
                <Button type="button" onClick={() => moveSection(1)}>
                  Next section
                </Button>
              ) : (
                <Button type="button" onClick={() => onContinue(answers)}>
                  Continue to Diagnosis
                </Button>
              )}
            </div>
          </footer>
        </Card>

        <aside className="space-y-4">
          <DangerSummary sections={NEONATAL_SECTIONS} answers={answers} />
          <Card title="Assessment Scope" className="p-4">
            <div className="space-y-3 text-sm text-slate-600">
              <p>
                The sections match the neonatal document and keep urgent clinical findings visible
                while the form is completed.
              </p>
              <p className="font-semibold text-slate-800">
                {NEONATAL_SECTIONS.length} domains, {NEONATAL_QUESTION_COUNT} fields.
              </p>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { AgeGroupSymptoms, SymptomChecklistItem } from '@/types/case'

interface SymptomChecklistProps {
  symptoms: AgeGroupSymptoms
  onAnswerChange: (symptomId: string, selected: boolean, followUpValue?: string) => void
  answers: Record<string, { selected: boolean; followUpValue?: string }>
}

function ChecklistItem({
  item,
  checked,
  followUpValue,
  showFollowUp,
  onToggle,
  onFollowUpChange,
}: {
  item: SymptomChecklistItem
  checked: boolean
  followUpValue?: string
  showFollowUp: boolean
  onToggle: () => void
  onFollowUpChange?: (value: string) => void
}) {
  return (
    <div
      className={[
        'space-y-3 rounded-lg border-2 p-4 transition-colors',
        checked ? 'border-brand-300 bg-brand-50' : 'border-slate-200 bg-white hover:border-slate-300',
      ].join(' ')}
    >
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="mt-1 h-5 w-5 accent-brand-500"
        />
        <div className="flex-1">
          <span
            className={[
              'block font-medium',
              item.isDangerSign ? 'text-red-700' : 'text-slate-800',
            ].join(' ')}
          >
            {item.text}
          </span>
          {item.isDangerSign && (
            <Badge tone="danger" className="mt-2">
              Danger Sign
            </Badge>
          )}
        </div>
      </label>

      {checked && showFollowUp && item.followUpOptions && onFollowUpChange && (
        <div className="ml-8 space-y-2 border-l-2 border-brand-200 pl-4 pt-2">
          <p className="text-sm font-medium text-slate-600">{item.followUpQuestion}</p>
          <div className="space-y-2">
            {item.followUpOptions.map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name={`followup-${item.id}`}
                  value={option.value}
                  checked={followUpValue === option.value}
                  onChange={() => onFollowUpChange(option.value)}
                  className="h-4 w-4 accent-brand-500"
                />
                <span className="text-sm text-slate-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function SymptomChecklist({
  symptoms,
  onAnswerChange,
  answers,
}: SymptomChecklistProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(symptoms.categories.map((category) => category.category.id)),
  )

  const toggleCategory = (categoryId: string) => {
    const nextExpanded = new Set(expandedCategories)
    if (nextExpanded.has(categoryId)) {
      nextExpanded.delete(categoryId)
    } else {
      nextExpanded.add(categoryId)
    }
    setExpandedCategories(nextExpanded)
  }

  const dangerSignCount = symptoms.categories.reduce(
    (count, category) =>
      count +
      category.items.filter((item) => item.isDangerSign && answers[item.id]?.selected).length,
    0,
  )

  return (
    <div className="space-y-6">
      {dangerSignCount > 0 && (
        <Card className="border-red-200 bg-red-50 p-4">
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
        </Card>
      )}

      {symptoms.categories.map((category) => {
        const isExpanded = expandedCategories.has(category.category.id)
        const checkedCount = category.items.filter((item) => answers[item.id]?.selected).length

        return (
          <Card key={category.category.id} className="overflow-hidden p-0">
            <button
              type="button"
              onClick={() => toggleCategory(category.category.id)}
              className="w-full bg-brand-50 px-6 py-4 text-left hover:bg-brand-100"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-brand-900">{category.category.label}</h3>
                  <p className="text-sm text-brand-600">{category.category.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  {checkedCount > 0 && <Badge tone="brand">{checkedCount} selected</Badge>}
                  <span
                    className={[
                      'text-xl font-bold text-brand-700 transition-transform',
                      isExpanded ? 'rotate-180' : '',
                    ].join(' ')}
                  >
                    v
                  </span>
                </div>
              </div>
            </button>

            {isExpanded && (
              <div className="space-y-3 border-t-2 border-slate-100 p-6">
                {category.items.map((item) => (
                  <ChecklistItem
                    key={item.id}
                    item={item}
                    checked={answers[item.id]?.selected ?? false}
                    followUpValue={answers[item.id]?.followUpValue}
                    showFollowUp={answers[item.id]?.selected ?? false}
                    onToggle={() => {
                      onAnswerChange(item.id, !(answers[item.id]?.selected ?? false))
                    }}
                    onFollowUpChange={(value) => {
                      onAnswerChange(item.id, answers[item.id]?.selected ?? false, value)
                    }}
                  />
                ))}
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}

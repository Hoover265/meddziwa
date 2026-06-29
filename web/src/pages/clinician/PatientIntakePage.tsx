import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { CHIEF_COMPLAINTS } from '@/data/clinical'
import { useConsultationStore } from '@/stores/consultationStore'

const intakeSchema = z.object({
  age: z.coerce.number().min(0, 'Enter a valid age').max(120, 'Enter a valid age'),
  gender: z.enum(['male', 'female', 'other']),
  chiefComplaint: z.string().min(1, 'Select a chief complaint'),
  chiefComplaintFreeText: z.string().optional(),
})

type IntakeForm = z.infer<typeof intakeSchema>

export function PatientIntakePage() {
  const navigate = useNavigate()
  const setPatient = useConsultationStore((s) => s.setPatient)
  const reset = useConsultationStore((s) => s.reset)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IntakeForm>({
    resolver: zodResolver(intakeSchema),
    defaultValues: { gender: 'female' },
  })

  const complaint = watch('chiefComplaint')

  const onSubmit = (data: IntakeForm) => {
    reset()
    setPatient({
      age: data.age,
      gender: data.gender,
      chiefComplaint: data.chiefComplaint,
      chiefComplaintFreeText: data.chiefComplaintFreeText,
    })
    navigate('/clinician/symptoms')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Patient intake</h2>
        <p className="mt-1 text-slate-600">
          Anonymised case only — age, gender, and chief complaint. No personal identifiers.
        </p>
      </div>

      <Card>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Age (years)"
            type="number"
            min={0}
            max={120}
            error={errors.age?.message}
            {...register('age')}
          />
          <Select
            label="Gender"
            options={[
              { value: 'female', label: 'Female' },
              { value: 'male', label: 'Male' },
              { value: 'other', label: 'Other' },
            ]}
            error={errors.gender?.message}
            {...register('gender')}
          />
        </div>

        <div className="mt-5">
          <Select
            label="Chief complaint"
            placeholder="Select chief complaint"
            options={CHIEF_COMPLAINTS.map((c) => ({ value: c.value, label: c.label }))}
            error={errors.chiefComplaint?.message}
            {...register('chiefComplaint')}
          />
        </div>

        {complaint === 'other' && (
          <div className="mt-5">
            <Input
              label="Describe complaint"
              placeholder="Brief description"
              {...register('chiefComplaintFreeText')}
            />
          </div>
        )}
      </Card>

      <div className="flex gap-3">
        <Button type="button" variant="secondary" onClick={() => navigate('/clinician')}>
          Cancel
        </Button>
        <Button type="submit">Continue to symptoms</Button>
      </div>
    </form>
  )
}

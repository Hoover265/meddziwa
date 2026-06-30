import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { Select } from '@/components/ui/Select'
import { CHIEF_COMPLAINTS } from '@/data/clinical'
import { useConsultationStore } from '@/stores/consultationStore'

const intakeSchema = z.object({
  age: z.coerce.number().min(0, 'Enter a valid age').max(120, 'Enter a valid age'),
  gender: z.enum(['male', 'female']),
  chiefComplaint: z.string().min(1, 'Select a chief complaint'),
  chiefComplaintFreeText: z.string().optional(),
})

type IntakeForm = z.infer<typeof intakeSchema>

export function PatientIntakePage() {
  const navigate = useNavigate()
  const setPatient = useConsultationStore((state) => state.setPatient)
  const reset = useConsultationStore((state) => state.reset)

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
  const gender = watch('gender')

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
      <div className="rounded-xl border-2 border-brand-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-brand-700">
              New consultation
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Patient intake</h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              Capture only anonymised clinical details required for decision support. Do not enter
              patient names, national IDs, phone numbers, or addresses.
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            Privacy first: no direct identifiers
          </div>
        </div>
      </div>

      <Card className="p-0">
        <header className="border-b-2 border-slate-100 p-5">
          <h3 className="text-xl font-bold text-slate-950">Clinical profile</h3>
          <p className="mt-1 text-sm text-slate-600">
            These fields become the starting features for the symptom questionnaire and future ML
            model.
          </p>
        </header>

        <div className="space-y-6 p-5">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,18rem)_1fr]">
            <Input
              label="Age (years)"
              type="number"
              min={0}
              max={120}
              error={errors.age?.message}
              hint="Use 0 for neonates under one year in this web phase."
              {...register('age')}
            />

            <RadioGroup
              label="Gender"
              value={gender}
              options={[
                { value: 'female', label: 'Female' },
                { value: 'male', label: 'Male' },
              ]}
              error={errors.gender?.message}
              {...register('gender')}
            />
          </div>

          <Select
            label="Chief complaint"
            placeholder="Select chief complaint"
            options={CHIEF_COMPLAINTS.map((complaintOption) => ({
              value: complaintOption.value,
              label: complaintOption.label,
            }))}
            error={errors.chiefComplaint?.message}
            {...register('chiefComplaint')}
          />

          {complaint === 'other' && (
            <Input
              label="Describe complaint"
              placeholder="Brief clinical description"
              {...register('chiefComplaintFreeText')}
            />
          )}
        </div>
      </Card>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button type="button" variant="secondary" onClick={() => navigate('/clinician')}>
          Cancel
        </Button>
        <Button type="submit">Continue to symptoms</Button>
      </div>
    </form>
  )
}

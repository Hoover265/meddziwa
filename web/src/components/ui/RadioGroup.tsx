import { type InputHTMLAttributes } from 'react'

interface RadioOption {
  value: string
  label: string
  description?: string
}

interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  label: string
  name: string
  value?: string
  options: RadioOption[]
  error?: string
}

export function RadioGroup({
  label,
  name,
  value,
  options,
  error,
  className = '',
  ...props
}: RadioGroupProps) {
  return (
    <fieldset className={['space-y-2', className].join(' ')}>
      <legend className="text-base font-semibold text-slate-800">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const checked = value === option.value

          return (
            <label
              key={option.value}
              className={[
                'flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors',
                checked
                  ? 'border-brand-500 bg-brand-50 text-brand-950 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-brand-200',
              ].join(' ')}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                className="h-5 w-5 accent-brand-500"
                {...props}
              />
              <span>
                <span className="block font-semibold">{option.label}</span>
                {option.description && (
                  <span className="block text-sm text-slate-500">{option.description}</span>
                )}
              </span>
            </label>
          )
        })}
      </div>
      {error && <p className="text-sm font-medium text-danger-500">{error}</p>}
    </fieldset>
  )
}

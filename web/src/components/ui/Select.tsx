import { type SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, id, className = '', ...props }, ref) => {
    const selectId = id ?? props.name

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-base font-semibold text-slate-800">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={[
            'touch-target w-full rounded-lg border-2 bg-white px-4 py-3 text-base text-slate-900',
            'focus:border-brand-500 focus:outline-none',
            error ? 'border-danger-500' : 'border-slate-200',
            className,
          ].join(' ')}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm font-medium text-danger-500">{error}</p>}
      </div>
    )
  },
)

Select.displayName = 'Select'

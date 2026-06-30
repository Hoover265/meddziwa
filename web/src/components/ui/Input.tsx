import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = '', ...props }, ref) => {
    const inputId = id ?? props.name

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-base font-semibold text-slate-800">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'touch-target w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition-colors',
            'placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100',
            error ? 'border-danger-300' : 'border-slate-200',
            className,
          ].join(' ')}
          {...props}
        />
        {hint && !error && <p className="text-sm text-slate-500">{hint}</p>}
        {error && <p className="text-sm font-medium text-danger-500">{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'

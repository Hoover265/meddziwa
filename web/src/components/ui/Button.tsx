import { type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-[0_10px_25px_-10px_rgba(13,110,110,0.65)] hover:bg-brand-700 active:bg-brand-800',
  secondary: 'border border-brand-200 bg-white text-brand-700 hover:bg-brand-50',
  ghost: 'bg-transparent text-brand-700 hover:bg-brand-50 shadow-none',
  danger: 'bg-danger-500 text-white hover:bg-red-700',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'touch-target inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

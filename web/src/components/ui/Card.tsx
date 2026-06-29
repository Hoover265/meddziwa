import { type ReactNode } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  accent?: 'default' | 'warning' | 'danger' | 'success'
}

const accentBorder = {
  default: 'border-slate-200',
  warning: 'border-warning-500 bg-amber-50',
  danger: 'border-danger-500 bg-red-50',
  success: 'border-success-500 bg-emerald-50',
}

export function Card({ title, subtitle, children, className = '', accent = 'default' }: CardProps) {
  return (
    <section
      className={[
        'rounded-xl border-2 bg-white p-5 shadow-sm',
        accentBorder[accent],
        className,
      ].join(' ')}
    >
      {(title || subtitle) && (
        <header className="mb-4">
          {title && <h2 className="text-xl font-bold text-slate-900">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  )
}

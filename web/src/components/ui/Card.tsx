import { type ReactNode } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  accent?: 'default' | 'warning' | 'danger' | 'success'
}

const accentBorder = {
  default: 'border-slate-200 bg-white/95',
  warning: 'border-warning-500 bg-amber-50',
  danger: 'border-danger-500 bg-red-50',
  success: 'border-success-500 bg-emerald-50',
}

export function Card({ title, subtitle, children, className = '', accent = 'default' }: CardProps) {
  return (
    <section
      className={[
        'rounded-2xl border bg-white/95 p-5 shadow-[0_10px_35px_-20px_rgba(15,23,42,0.35)]',
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

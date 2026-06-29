interface BadgeProps {
  children: React.ReactNode
  tone?: 'brand' | 'warning' | 'danger' | 'success' | 'neutral'
  className?: string
}

const tones = {
  brand: 'bg-brand-100 text-brand-800',
  warning: 'bg-amber-100 text-amber-900',
  danger: 'bg-red-100 text-red-800',
  success: 'bg-emerald-100 text-emerald-800',
  neutral: 'bg-slate-100 text-slate-700',
}

export function Badge({ children, tone = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

interface TagProps {
  label: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'accent'
  onClick?: () => void
  active?: boolean
}

export function Tag({ label, size = 'sm', variant = 'default', onClick, active = false }: TagProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1',
  }

  const baseClasses = `inline-flex items-center rounded-full font-medium transition-colors ${sizeClasses[size]}`

  const variantClasses =
    variant === 'accent'
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
      : active
        ? 'bg-blue-600 text-white dark:bg-blue-500'
        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses} cursor-pointer`}
        aria-pressed={active}
      >
        {label}
      </button>
    )
  }

  return (
    <span className={`${baseClasses} ${variantClasses}`}>
      {label}
    </span>
  )
}

import Link from 'next/link'
import type { ReactNode } from 'react'

interface ButtonProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  external?: boolean
  className?: string
  icon?: ReactNode
}

export function Button({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
  icon,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400',
    secondary:
      'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800',
    ghost:
      'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800',
  }

  const classes = `${base} ${variants[variant]} ${className}`
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  if (external) {
    return (
      <a href={href} className={classes} {...externalProps}>
        {icon}
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {icon}
      {children}
    </Link>
  )
}

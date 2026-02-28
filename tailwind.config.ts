import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#2563eb',
          light: '#3b82f6',
          dark: '#60a5fa',
        },
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.slate.700'),
            a: { color: theme('colors.blue.600'), '&:hover': { color: theme('colors.blue.700') } },
            'h1,h2,h3,h4': { color: theme('colors.slate.900'), fontWeight: '600' },
            code: { color: theme('colors.slate.800'), backgroundColor: theme('colors.slate.100'), padding: '2px 6px', borderRadius: '4px', fontWeight: '400' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
        invert: {
          css: {
            color: theme('colors.slate.300'),
            a: { color: theme('colors.blue.400'), '&:hover': { color: theme('colors.blue.300') } },
            'h1,h2,h3,h4': { color: theme('colors.slate.100') },
            code: { color: theme('colors.slate.200'), backgroundColor: theme('colors.slate.800') },
          },
        },
      }),
    },
  },
  plugins: [typography],
}

export default config

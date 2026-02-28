import type { NewsItem as NewsItemType } from '@/types'

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-')
  if (!month) return year
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]
  const monthName = months[parseInt(month, 10) - 1] ?? month
  return `${monthName} ${year}`
}

export function NewsItem({ item }: { item: NewsItemType }) {
  return (
    <div className="flex gap-4 items-start">
      <time
        dateTime={item.date}
        className="shrink-0 text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5 w-16"
      >
        {formatDate(item.date)}
      </time>
      <p
        className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: item.text }}
      />
    </div>
  )
}

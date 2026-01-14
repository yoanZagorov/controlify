import cn from 'classnames'

export default function Quote({ quote, className }) {
  return (
    <div
      className={cn(
        'text-balance text-center font-semibold text-gray-dark',
        className,
      )}
    >
      <blockquote>"{quote.body}"</blockquote>
      <p className="mt-2 text-sm text-navy">
        <em>— {quote.author}</em>
      </p>
    </div>
  )
}

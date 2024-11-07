export default function Quote({ quote }) {
  return (
    <div className="text-center text-gray-dark font-semibold">
      <blockquote>"{quote.body}"</blockquote>
      <p className="mt-2 text-sm text-navy"><em>— {quote.author}</em></p>
    </div>
  )
}

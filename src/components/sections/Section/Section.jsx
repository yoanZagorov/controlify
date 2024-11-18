export default function Section({ title, className, children }) {
  return (
    <section className={className}>
      <h2 className="text-3xl font-semibold text-navy-dark tracking-wide">{title}</h2>
      {children}
    </section>
  )
}

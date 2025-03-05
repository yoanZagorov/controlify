import cn from "classnames"

// A wrapper around every major section in the app
export default function Section({ title, subtitle = "", className, contentClassName, children }) {
  return (
    <section className={cn(className)}>
      <h2 className="text-3xl text-navy-dark font-semibold tracking-wide">{title}</h2>
      {subtitle && <h3 className="text-navy-dark opacity-50 font-semibold">{subtitle}</h3>}

      <div className={cn("mt-4", contentClassName)}>
        {children}
      </div>
    </section >
  )
}

import cn from "classnames"

export default function Section({ title, subtitle = "", className, contentClassName, children }) {
  const classes = {
    section: className ? className : "",
    content: cn(
      "mt-4",
      contentClassName
    )
  }

  return (
    <section className={classes.section}>
      <h2 className="text-3xl text-navy-dark font-semibold tracking-wide">{title}</h2>
      {subtitle && <h3 className="text-navy-dark opacity-50 font-semibold">{subtitle}</h3>}

      <div className={classes.content}>
        {children}
      </div>
    </section>
  )
}

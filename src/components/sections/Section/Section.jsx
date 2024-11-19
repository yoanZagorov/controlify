import cn from "classnames"

export default function Section({ title, className, contentClassName, children }) {
  const classes = {
    section: className ? className : "",
    content: cn(
      "mt-3",
      contentClassName
    )
  }

  return (
    <section className={classes.section}>
      <h2 className="text-3xl font-semibold text-navy-dark tracking-wide">{title}</h2>

      <div className={classes.content}>
        {children}
      </div>
    </section>
  )
}

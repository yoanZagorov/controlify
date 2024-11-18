import cn from "classnames";

export default function Widget({ size = "m", className, children }) {
  const classes = {
    widget: cn(
      "rounded-lg shadow bg-gray-medium",
      size === "s" ? "p-3"
        : "p-4",
      className
    )
  }

  return (
    <div className={classes.widget}>
      {children}
    </div>
  )
}
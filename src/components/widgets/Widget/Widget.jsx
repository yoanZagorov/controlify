import cn from "classnames";

export default function Widget({ size = "m", colorPalette = "primary", className, children }) {
  const widget = "rounded-lg shadow";

  const widgetS = "p-3";
  const widgetM = "p-4";

  const widgetPrimary = "bg-gray-medium";
  const widgetSecondary = "bg-gray-light";

  const classes = cn(
    widget,
    size === "s" ? widgetS
      : widgetM,
    colorPalette === "primary" ? widgetPrimary
      : widgetSecondary,
    className
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}
import cn from "classnames";

export default function Widget({ type = "base", size = "m", icon, widgetTitle, className, children }) {
  const widget = cn(
    "flex flex-col rounded-lg shadow bg-gray-medium",
    size === "s" ? "p-3"
      : "p-4"
  )

  return (
    <div className={widget}>
      {type === "wrapper" ?
        children
        :
        <>
          {icon}
          <p className="mt-2 uppercase text-sm text-gray-dark opacity-50 font-semibold">{widgetTitle}</p>
          {children}
        </>
      }
    </div>
  )
}
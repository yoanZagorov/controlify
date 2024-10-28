import cn from "classnames"

export default function Widget({ type = "base", icon, widgetTitle, className, children }) {
  const widgetCn = cn("mt-2 flex flex-col p-4 bg-gray-medium rounded-lg shadow", className);

  return (
    <div className={widgetCn}>
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
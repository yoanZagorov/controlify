import cn from "classnames";

export default function WidgetWrapper({ children, classes }) {
  const widgetClasses = cn("mt-2 flex flex-col p-4 bg-gray-medium rounded-lg shadow", classes);

  return (
    <div className="w-full max-w-[600px]">
      <div className={widgetClasses}>
        {children}
      </div>
    </div>
  )
}
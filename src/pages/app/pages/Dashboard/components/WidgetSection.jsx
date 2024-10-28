import Widget from "./Widget"

export default function WidgetSection({ title, containsWidget, icon=null, widgetTitle=null, className="", widgetClasses="", children }) {
  return (
    <div className={className}>
      <h2 className="text-3xl text-navy-dark font-semibold tracking-wide">{title}</h2>
      {containsWidget ?
        <Widget icon={icon} widgetTitle={widgetTitle} className={widgetClasses}>
          {children}
        </Widget>
        :
        children
      }
    </div>
  )
}
import WidgetWrapper from "./WidgetWrapper";

export default function Widget({ icon, title, classes="", children }) {
  return (
    <WidgetWrapper classes={classes}>
      {icon}
      <p className="mt-2 uppercase text-sm text-gray-dark opacity-50 font-semibold">{title}</p>
      {children}
    </WidgetWrapper>
  )
}
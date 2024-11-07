import cn from "classnames";

export default function Notification({ type = "success", className, children }) {
  const notificationClasses = cn(
    "text-center font-semibold text-lg",
    (type === "error" || type === "alert") ? "text-red-dark"
      : type === "success" ? "text-green-dark"
        : "text-navy",
    className
  )

  return <p className={notificationClasses}>{children}</p>
}

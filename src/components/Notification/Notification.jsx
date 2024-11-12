import cn from "classnames";
import { useEffect } from "react";

export default function Notification({ type = "success", clearMsg = null, className, children }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      clearMsg && clearMsg();
    }, 3000)

    return () => clearTimeout(timeoutId);
  }, [])

  const notificationClasses = cn(
    "text-center font-semibold text-lg",
    (type === "error" || type === "alert") ? "text-red-dark"
      : type === "success" ? "text-green-dark"
        : "text-navy",
    className
  )

  return <p className={notificationClasses}>{children}</p>
}

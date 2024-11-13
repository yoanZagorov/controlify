import cn from "classnames";
import { useEffect } from "react";

export default function Notification({ msgType = "success", clearMsg, className, children }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      clearMsg();
    }, 5000)

    return () => clearTimeout(timeoutId);
  }, [])

  const notificationClasses = cn(
    "text-center text-lg text-balanced font-semibold",
    (msgType === "error" || msgType === "alert") ? "text-red-dark"
      : msgType === "success" ? "text-green-dark"
        : "text-navy",
    className
  )

  return <p className={notificationClasses}>{children}</p>
}

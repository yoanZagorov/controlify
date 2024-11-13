import cn from "classnames";
import { useEffect } from "react";

export default function Notification({ msgType = "success", clearMsg, className, children }) {
  const unmountDelay = msgType === "success" ? 5000 : 7000;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      clearMsg();
    }, unmountDelay)

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

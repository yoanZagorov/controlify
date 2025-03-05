import cn from "classnames";
import { useEffect } from "react";

// Used to display a notification message
export default function Notification({ msgType = "notification", size = "m", clearMsg = null, className, children }) {
  const UNMOUNT_DELAYS = {
    SUCCESS: 5000,
    ERROR: 7000,
    NOTIFICATION: 10000
  }

  const unmountDelay =
    msgType === "success" ? UNMOUNT_DELAYS.SUCCESS
      : (msgType === "error" || msgType === "alert") ? UNMOUNT_DELAYS.ERROR
        : UNMOUNT_DELAYS.NOTIFICATION;

  useEffect(() => {
    if (clearMsg) {
      const timeoutId = setTimeout(() => {
        clearMsg();
      }, unmountDelay);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  const notificationBase = "text-center text-balanced font-semibold";

  const sizes = {
    s: "text-sm",
    m: "text-base",
    l: "text-lg",
    xl: "text-xl"
  }

  const types = {
    error: "text-red-dark",
    alert: "text-red-dark",
    success: "text-green-dark",
    notification: "navy",
  }

  const notificationClasses = cn(
    notificationBase,
    sizes[size] || sizes.m,
    types[msgType] || types.notification,
    className
  )

  return <p className={notificationClasses}>{children}</p>
}

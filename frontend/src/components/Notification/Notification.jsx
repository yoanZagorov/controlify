import cn from "classnames";
import { useEffect } from "react";

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

  if (clearMsg) {
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        clearMsg();
      }, unmountDelay)

      return () => clearTimeout(timeoutId);
    }, [])
  }

  const classes = {
    type:
      (msgType === "error" || msgType === "alert") ? "text-red-dark"
        : msgType === "success" ? "text-green-dark"
          : "text-navy",
    size:
      size === "s" ? "text-sm"
        : size === "m" ? "text-base"
          : size === "l" ? "text-lg"
            : "text-xl",
    notification: function () { // Turned to a function to access properties with the this keyword
      return cn(
        "text-center text-balanced font-semibold",
        this.type,
        this.size,
        className
      )
    }
  }

  return <p className={classes.notification()}>{children}</p>
}

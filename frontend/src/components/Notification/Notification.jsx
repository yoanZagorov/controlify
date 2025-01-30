import cn from "classnames";
import { useEffect } from "react";

export default function Notification({ msgType = "notification", size = "m", clearMsg = null, className, children }) {
  const unmountDelay =
    msgType === "success" ? 5000
      : msgType === "error" || msgType === "alert" ? 7000
        : 10000;

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
    notification: function () {
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

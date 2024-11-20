import cn from "classnames";
import { useEffect } from "react";

export default function Notification({ msgType = "notification", size = "m", clearMsg = null, className, children }) {
  const unmountDelay = msgType === "success" ? 5000 : 7000;

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
      size === "s" ? "font-sm"
        : size === "m" ? "font-base"
          : "font-lg",
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

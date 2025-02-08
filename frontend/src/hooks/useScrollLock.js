import { useEffect } from "react";

export default function useScrollLock(isLocked) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "visible";
    }
  }, [isLocked]);
}

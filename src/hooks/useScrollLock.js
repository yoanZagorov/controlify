import { useEffect } from "react";

export default function useScrollLock(isLocked) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => document.body.style.overflow = "auto";
  }, [isLocked]);
}
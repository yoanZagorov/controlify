import { useEffect } from "react";

export default function useScrollLock(isLocked) {
  useEffect(() => {
    const initial = document.body.style.overflow;

    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = initial;
    }

    return () => document.body.style.overflow = initial;
  }, [isLocked]);
}
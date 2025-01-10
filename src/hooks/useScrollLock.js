import { useEffect } from "react";

export default function useScrollLock(isLocked) {
  const initialOverflow = window.getComputedStyle(document.body).overflow;

  useEffect(() => {
    if (isLocked) document.body.style.overflow = "hidden";

    return () => document.body.style.overflow = initialOverflow;
  }, [isLocked]);
}

import { useEffect } from "react";

export default function useScrollLock(isLocked) {
  useEffect(() => {
    // console.log("useScrollLock");
    const initialOverflow = window.getComputedStyle(document.body).overflow;

    if (isLocked) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = initialOverflow;
    }
  }, [isLocked]);
}

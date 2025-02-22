import { useEffect } from "react";

export default function useBodyScrollLock(isLocked) {
  useEffect(() => {
    const initialBodyOverflow = document.body.style.overflow;
    if (isLocked) document.body.style.overflow = "hidden";

    return () => document.body.style.overflow = initialBodyOverflow;
  }, [isLocked]);
}

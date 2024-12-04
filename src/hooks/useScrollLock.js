import { useEffect } from "react";

export default function useScrollLock(isLocked) {
  useEffect(() => {
    const initial = document.body.style.overflow;

    if (isLocked) document.body.style.overflow = "hidden";
    
    return () => document.body.style.overflow = initial;
  }, [isLocked]);
}
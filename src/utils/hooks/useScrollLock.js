import { useEffect, useState } from "react";

export default function useScrollLock(initialState) {
  const [isLocked, setLocked] = useState(initialState);

  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => document.body.style.overflow = "auto";
  }, [isLocked]);

  return [isLocked, setLocked];
}
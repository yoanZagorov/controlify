import { useEffect, useState } from "react";

export default function useMountTransition(isMounted, unmountDelay) {
  const [hasTransitioned, setHasTransitioned] = useState(isMounted);

  useEffect(() => {
    let timeoutId;

    if (isMounted && !hasTransitioned) {
      setHasTransitioned(true);
    } else if (!isMounted && hasTransitioned) {
      timeoutId = setTimeout(() => setHasTransitioned(false), unmountDelay)
    }

    return () => clearTimeout(timeoutId);
  }, [isMounted]);

  return hasTransitioned;
}
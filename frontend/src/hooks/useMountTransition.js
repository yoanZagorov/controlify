import { useEffect, useState } from 'react'

// Used to perform smooth transitions
export default function useMountTransition(isMounted, unmountDelay = 300) {
  const [hasTransitioned, setHasTransitioned] = useState(isMounted)

  useEffect(() => {
    let timeoutId

    if (isMounted && !hasTransitioned) {
      setHasTransitioned(true)
    } else if (!isMounted && hasTransitioned) {
      timeoutId = setTimeout(() => setHasTransitioned(false), unmountDelay)
    }

    return () => clearTimeout(timeoutId)
  }, [isMounted])

  return hasTransitioned
}

import { useEffect, useState } from "react";

export default function useCurrentBreakpointValue() {
  const breakpoints = [
    { name: "mobile", query: "(max-width: 767px)" },
    { name: "tablet", query: "(min-width: 768px) and (max-width: 1023px)" },
    { name: "desktop", query: "(min-width: 1024px)" }
  ]

  const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoint());

  function getCurrentBreakpoint() {
    return breakpoints.find(breakpoint => window.matchMedia(breakpoint.query).matches).name;
  }

  useEffect(() => {
    const mediaQueryLists = breakpoints.map(breakpoint =>
      window.matchMedia(breakpoint.query)
    )

    function handleChange(e) {
      const matchedBreakpoint = mediaQueryLists.find(mql => mql.matches);

      if (matchedBreakpoint) {
        const breakpointName = breakpoints.find(breakpoint =>
          breakpoint.query === matchedBreakpoint.media
        ).name

        setBreakpoint(breakpointName);
      }
    }

    mediaQueryLists.forEach(mql =>
      mql.addEventListener("change", handleChange)
    )

    return () => (
      mediaQueryLists.forEach(mql =>
        mql.removeEventListener("change", handleChange)
      )
    )
  }, [])

  return breakpoint;
}
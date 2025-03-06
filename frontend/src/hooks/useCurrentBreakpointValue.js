import { useEffect, useState } from "react";

// Get the current breakpoint value in a readable format
export default function useCurrentBreakpointValue() {
  const breakpoints = [
    { name: "mobileS", query: "(max-width: 374px)" },
    { name: "mobileM", query: "(min-width: 375px) and (max-width: 424px)" },
    { name: "mobileL", query: "(min-width: 425px) and (max-width: 767px)" },
    { name: "tablet", query: "(min-width: 768px) and (max-width: 1023px)" },
    { name: "laptopS", query: "(min-width: 1024px) and (max-width: 1279px)" },
    { name: "laptopM", query: "(min-width: 1280px) and (max-width: 1439px)" },
    { name: "laptopL", query: "(min-width: 1440px) and (max-width: 1919px)" },
    { name: "fullHD", query: "(min-width: 1920px) and (max-width: 2559px)" },
    { name: "4K", query: "(min-width: 2560px)" },
  ]

  const [breakpoint, setBreakpoint] = useState(breakpoints.find(breakpoint => window.matchMedia(breakpoint.query).matches)?.name);

  useEffect(() => {
    const mediaQueryLists = breakpoints.map(breakpoint => window.matchMedia(breakpoint.query));

    function handleChange() {
      const matchedBreakpoint = mediaQueryLists.find(mql => mql.matches);

      if (matchedBreakpoint) {
        setBreakpoint(breakpoints.find(breakpoint => breakpoint.query === matchedBreakpoint.media).name);
      }
    }

    mediaQueryLists.forEach(mql => mql.addEventListener("change", handleChange));

    return () => { mediaQueryLists.forEach(mql => mql.removeEventListener("change", handleChange)); }
  }, [])

  return breakpoint;
}
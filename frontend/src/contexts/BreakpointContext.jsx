import { createContext } from "react";
import { useCurrentBreakpointValue } from "@/hooks";

// Used to always have access to the current breakpoint
export const BreakpointContext = createContext(null);

export default function BreakpointProvider({ children }) {
  const currentBreakpoint = useCurrentBreakpointValue();

  const isMobileS = currentBreakpoint === "mobileS";
  const isMobileM = currentBreakpoint === "mobileM";
  const isMobileL = currentBreakpoint === "mobileL";
  const isMobile = isMobileS || isMobileM || isMobileL;

  const isTablet = currentBreakpoint === "tablet"

  const isLaptopS = currentBreakpoint === "laptopS";
  const isLaptopM = currentBreakpoint === "laptopM";
  const isLaptopL = currentBreakpoint === "laptopL";
  const isFullHD = currentBreakpoint === "fullHD";
  const is4K = currentBreakpoint === "4K";
  const isDesktop = isLaptopM || isLaptopL || isFullHD || is4K;

  const breakpointsData = {
    isMobileS,
    isMobileM,
    isMobileL,
    isMobile,
    isTablet,
    isLaptopS,
    isLaptopM,
    isLaptopL,
    isFullHD,
    is4K,
    isDesktop
  }

  return (
    <BreakpointContext.Provider value={breakpointsData}>
      {children}
    </BreakpointContext.Provider>
  )
}
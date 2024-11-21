import { useCurrentBreakpointValue } from "@/hooks";
import { createContext } from "react";

export const BreakpointContext = createContext(null);

export default function BreakpointProvider({ children }) {
  const currentBreakpoint = useCurrentBreakpointValue();

  const isMobileS = currentBreakpoint === "mobileS";
  const isMobileM = currentBreakpoint === "mobileM";
  const isMobileL = currentBreakpoint === "mobileL";
  const isMobile =
    currentBreakpoint === "mobileS" ||
    currentBreakpoint === "mobileM" ||
    currentBreakpoint === "mobileL";

  const isTablet = currentBreakpoint === "tablet"

  const isLaptopS = currentBreakpoint === "laptopS";
  const isLaptopM = currentBreakpoint === "laptopM";
  const isLaptopL = currentBreakpoint === "laptopL";
  const isFullHD = currentBreakpoint === "fullHD";
  const is4K = currentBreakpoint === "4K";

  const isDesktop =
    currentBreakpoint === "laptopM" ||
    currentBreakpoint === "laptopL" ||
    currentBreakpoint === "fullHD" ||
    currentBreakpoint === "4K";

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
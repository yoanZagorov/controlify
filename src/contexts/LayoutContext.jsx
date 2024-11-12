import { useCurrentBreakpointValue, useOutsideClick } from "@/hooks";
import { createContext, useState } from "react";

export const LayoutContext = createContext(null);

export default function LayoutProvider({ children }) {
  const currentBreakpoint = useCurrentBreakpointValue();

  const isMobile =
    currentBreakpoint === "mobileS" ||
    currentBreakpoint === "mobileM" ||
    currentBreakpoint === "mobileL";

  const isTablet = currentBreakpoint === "tablet";

  const isDesktop =
    currentBreakpoint === "laptopS" ||
    currentBreakpoint === "laptopM" ||
    currentBreakpoint === "laptopL" ||
    currentBreakpoint === "fullHD" ||
    currentBreakpoint === "4K";

  const [isSidebarExpanded, setSidebarExpanded] = useState(isDesktop ? true : false);


  const sidebarRef = useOutsideClick(isSidebarExpanded, setSidebarExpanded, !isDesktop);

  function toggleSidebar() {
    setSidebarExpanded(wasExpanded => !wasExpanded)
  }

  return (
    <LayoutContext.Provider value={{
      sidebar: {
        isExpanded: isSidebarExpanded,
        toggle: toggleSidebar,
        ref: sidebarRef
      },
      breakpoints: {
        isMobile,
        isTablet,
        isDesktop
      }
    }}>
      {children}
    </LayoutContext.Provider>
  )
}

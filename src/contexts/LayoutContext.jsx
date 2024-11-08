import { useCurrentBreakpointValue, useOutsideClick } from "@/hooks";
import { createContext, useState } from "react";

export const LayoutContext = createContext(null);

export default function LayoutProvider({ children }) {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const currentBreakpoint = useCurrentBreakpointValue();

  const isMobile = currentBreakpoint === "mobile";
  const isTablet = currentBreakpoint === "tablet";
  const isDesktop = currentBreakpoint === "desktop";

  const sidebarRef = useOutsideClick(isSidebarExpanded, setSidebarExpanded);

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

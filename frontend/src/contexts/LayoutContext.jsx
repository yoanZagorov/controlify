import { useBreakpoint, useOutsideClick } from "@/hooks";
import { createContext, useRef, useState } from "react";

export const LayoutContext = createContext(null);

export default function LayoutProvider({ children }) {
  const { isMobile, isTablet, isLaptopS, isDesktop } = useBreakpoint();

  const [isSidebarExpanded, setSidebarExpanded] = useState(isDesktop ? true : false);

  const sidebarRef = useRef(null);
  useOutsideClick(sidebarRef, isSidebarExpanded, () => setSidebarExpanded(false), { eventListenerCondition: !isDesktop });

  function toggleSidebar() {
    setSidebarExpanded(wasExpanded => !wasExpanded);
  }

  const isSingleColLayout = isMobile || isTablet || (isLaptopS && isSidebarExpanded);

  return (
    <LayoutContext.Provider value={{ isSidebarExpanded, isSingleColLayout, toggleSidebar, sidebarRef }}>
      {children}
    </LayoutContext.Provider >
  )
}

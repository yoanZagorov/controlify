import { createContext, useRef, useState } from "react";
import { useBreakpoint, useOutsideClick } from "#hooks";

export const LayoutContext = createContext(null);

// Used to have access to the current layout throughout the app
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

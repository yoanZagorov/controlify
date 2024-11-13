import { useBreakpoint, useOutsideClick } from "@/hooks";
import { createContext, useState } from "react";

export const LayoutContext = createContext(null);

export default function LayoutProvider({ children }) {
  const { isDesktop } = useBreakpoint();

  const [isSidebarExpanded, setSidebarExpanded] = useState(isDesktop ? true : false);

  const sidebarRef = useOutsideClick(isSidebarExpanded, setSidebarExpanded, !isDesktop);

  function toggleSidebar() {
    setSidebarExpanded(wasExpanded => !wasExpanded)
  }

  return (
    <LayoutContext.Provider value={{ isSidebarExpanded, toggleSidebar, sidebarRef }}>
      {children}
    </LayoutContext.Provider >
  )
}

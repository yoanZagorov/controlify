import { useOutsideClick } from "@/hooks";
import { createContext, useState } from "react";

export const LayoutContext = createContext(null);

export default function LayoutProvider({ children }) {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  function toggleSidebar() {
    setSidebarExpanded(wasExpanded => !wasExpanded)
  }

  const sidebarRef = useOutsideClick(isSidebarExpanded, setSidebarExpanded);

  return (
    <LayoutContext.Provider value={{ isSidebarExpanded, toggleSidebar, sidebarRef }}>
      {children}
    </LayoutContext.Provider>
  )
}

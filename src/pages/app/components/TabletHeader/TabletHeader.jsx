import { useState } from "react";
import { useOutsideClick } from "@/hooks";
import { Sidebar as ExpandedSidebar } from "../components/Sidebar";
import { CollapsedSidebar } from "./components/CollapsedSidebar";

export default function TabletHeader() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const expandedSidebarRef = useOutsideClick(isSidebarExpanded, setSidebarExpanded);

  function expandSidebar() {
    setSidebarExpanded(wasExpanded => !wasExpanded);
  }

  return (
    <header>
      {isSidebarExpanded ?
        <ExpandedSidebar ref={expandedSidebarRef} toggleSidebar={expandSidebar} />
        :
        <CollapsedSidebar />
      }
    </header>
  )
}

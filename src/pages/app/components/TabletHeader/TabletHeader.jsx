import { useOutsideClick, useLayout } from "@/hooks";
import { Sidebar } from "../components/Sidebar";
import { CollapsedSidebar } from "./components/CollapsedSidebar";

export default function TabletHeader() {
  const { isSidebarExpanded } = useLayout();
  // const expandedSidebarRef = useOutsideClick(isSidebarExpanded, setSidebarExpanded);

  return (
    <header>
      {isSidebarExpanded ?
        <Sidebar />
        :
        <CollapsedSidebar />
      }
    </header>
  )
}

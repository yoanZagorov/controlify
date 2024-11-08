import { useLayout } from "@/hooks";
import { Sidebar } from "../components/Sidebar";
import { CollapsedSidebar } from "./components/CollapsedSidebar";

export default function TabletHeader() {
  const { sidebar: { isSidebarExpanded } } = useLayout();

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

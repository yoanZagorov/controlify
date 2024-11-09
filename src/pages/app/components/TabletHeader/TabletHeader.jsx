import { useLayout } from "@/hooks";
import { Sidebar } from "../components/Sidebar";
import { CollapsedSidebar } from "./components/CollapsedSidebar";

export default function TabletHeader() {
  return (
    <header>
      <Sidebar />
      <CollapsedSidebar />
    </header>
  )
}

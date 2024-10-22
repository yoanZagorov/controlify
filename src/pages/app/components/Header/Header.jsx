import { useState } from "react";

import MobileBar from "./components/MobileBar";
import Sidebar from "./components/Sidebar";
import DesktopBar from "./components/DesktopBar";

export default function Header() {
  // To do: Implement a real hook to get the current view
  const isMobile = true;

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(wasOpen => !wasOpen);
  }

  return (
    <header>
      {isMobile ?
        (
          isSidebarOpen ?
            <Sidebar toggleSidebar={() => toggleSidebar()}/>
            :
            <MobileBar toggleSidebar={() => toggleSidebar()} />
        )
        :
        <DesktopBar />
      }
    </header>
  )
}
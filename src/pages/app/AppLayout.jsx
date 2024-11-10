import { Outlet } from "react-router-dom";

import { useLayout } from "@/hooks";
import cn from "classnames";
import { CollapsedSidebar } from "./layout-components/CollapsedSidebar";
import { Sidebar } from "./layout-components/Sidebar";
import { TopBar } from "./layout-components/TopBar";

export default function AppLayout() {
  const {
    sidebar: { isExpanded: isSidebarExpanded },
    breakpoints: { isMobile, isTablet, isDesktop }
  } = useLayout();

  const classes = {
    page: cn(
      "mt-24 tab:mt-8 px-4 tab:px-6",
      isSidebarExpanded ? "tab:ml-80 ll:ml-96" : "tab:ml-20"
    )
  }

  return (
    <>
      <header>
        {isMobile ? (
          <>
            <TopBar />
            <Sidebar />
          </>
        ) : isTablet ? (
          <>
            <CollapsedSidebar />
            <Sidebar />
          </>
        ) : (
          <Sidebar />
        )}
      </header>

      <main className={classes.page}>
        <Outlet />
      </main>
    </>
  )
}
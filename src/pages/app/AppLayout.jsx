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
      "h-screen pt-24 px-4 pb-8 tab:pt-10 ll:pt-12 ll:px-10", // calc: fhd breakpoint - sidebar width
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
        <div className="w-full max-w-[calc(1920px-384px)] mx-auto">
          <Outlet />
        </div>
      </main>
    </>
  )
}
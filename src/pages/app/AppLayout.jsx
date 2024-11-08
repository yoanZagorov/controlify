import { Outlet } from "react-router-dom";

import { DesktopHeader } from "./components/DesktopHeader";
import { MobileHeader } from "./components/MobileHeader";

import { useLayout } from "@/hooks";
import { TabletHeader } from "./components/TabletHeader";
import cn from "classnames";

export default function AppLayout() {
  const {
    sidebar: { isSidebarExpanded },
    breakpoints: { isTablet, isDesktop }
  } = useLayout();


  const page = cn(
    "mt-24 tab:mt-8 px-4 tab:px-6",
    isTablet && (isSidebarExpanded ? "ml-80" : "ml-20")
  )

  return (
    <>
      {isTablet ? <TabletHeader />
        : isDesktop ? <DesktopHeader />
          : <MobileHeader />
      }
      <div className={page}>
        <Outlet />
      </div>
    </>
  )
}
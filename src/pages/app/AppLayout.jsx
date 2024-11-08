import { Outlet } from "react-router-dom";

import { DesktopHeader } from "./components/DesktopHeader";
import { MobileHeader } from "./components/MobileHeader";

import { useLayout, useScreenWidth } from "@/hooks";
import { TabletHeader } from "./components/TabletHeader";
import cn from "classnames";
import { LayoutProvider } from "@/contexts";

export default function AppLayout() {
  const screenWidth = useScreenWidth();
  const isTablet = screenWidth >= 768;
  const isDesktop = screenWidth >= 1024;
  console.log(isDesktop)

  const { isSidebarExpanded } = useLayout();

  // const layout = cn(
  //   isDesktop && "flex"
  // )

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
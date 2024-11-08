import { Outlet } from "react-router-dom";

import { DesktopHeader } from "./components/DesktopHeader";
import { MobileHeader } from "./components/MobileHeader";

import { useScreenWidth } from "@/hooks";
import { TabletHeader } from "./components/TabletHeader";
import cn from "classnames";

export default function AppLayout() {
  const screenWidth = useScreenWidth();
  const isTablet = screenWidth >= 768;
  const isDesktop = screenWidth >= 1024;

  // const layout = cn(
  //   isDesktop && "flex"
  // )

  return (
    <>
      <div className={(isTablet || isDesktop) ? "flex" : undefined}>
        {isTablet ? <TabletHeader />
          : isDesktop ? <DesktopHeader />
            : <MobileHeader />
        }
        <Outlet />
      </div>

    </>
  )
}
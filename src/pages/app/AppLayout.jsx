import { Outlet } from "react-router-dom";

import { DesktopHeader } from "./components/DesktopHeader";
import { MobileHeader } from "./components/MobileHeader";

import { useScreenWidth } from "@/hooks";

export default function AppLayout() {
  const screenWidth = useScreenWidth();
  const isDesktop = screenWidth >= 1024;

  return (
    <>
      {isDesktop ? <DesktopHeader /> : <MobileHeader />}

      <Outlet />
    </>
  )
}
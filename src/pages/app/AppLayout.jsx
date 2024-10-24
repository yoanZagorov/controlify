import { Outlet, useLoaderData } from "react-router-dom";

import { DesktopHeader } from "@/components/DesktopHeader";
import { MobileHeader } from "@/components/MobileHeader";

import { UserProvider } from "@/contexts";
import { useScreenWidth } from "@/utils/hooks";

export default function AppLayout() {
  const user = useLoaderData().user;

  const screenWidth = useScreenWidth();
  const isDesktop = screenWidth >= 1024;

  return (
    <>
      <UserProvider value={user}>
        {isDesktop ? 
          <DesktopHeader /> : <MobileHeader />
        }
        
        <Outlet />
      </UserProvider>
    </>
  )
}
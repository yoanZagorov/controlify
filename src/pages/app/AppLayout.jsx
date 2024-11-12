import { Outlet, useActionData, useLoaderData } from "react-router-dom";

import { useLayout } from "@/hooks";
import cn from "classnames";
import { CollapsedSidebar } from "./layout-components/CollapsedSidebar";
import { Sidebar } from "./layout-components/Sidebar";
import { TopBar } from "./layout-components/TopBar";
import { Widget } from "@/components/Widget";
import { Quote } from "@/components/Quote";
import { Notification } from "@/components/Notification";

export default function AppLayout() {
  const {
    sidebar: { isExpanded: isSidebarExpanded },
    breakpoints: { isMobile, isTablet, isDesktop }
  } = useLayout();

  const {
    notificationData: {
      redirectData,
      quote
    }
  } = useLoaderData();

  const {
    msg: redirectflashMsg,
    msgType: redirectMsgType
  } = redirectData ?? {};

  const {
    msg: actionMsg,
    msgType: actionMsgType,
    success,
    resetKey
  } = useActionData() ?? {};

  const msg = redirectflashMsg || actionMsg || null;
  const msgType = redirectMsgType || actionMsgType || null;

  const classes = {
    page: cn(
      "h-screen pt-24 px-4 pb-8 tab:pt-10 ll:pt-12 ll:px-10",
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
        <div className="w-full max-w-6xl mx-auto"> {/* calc: fhd breakpoint - sidebar width */}
          <Widget>
            {msg ? (
              <Notification type={msgType}>
                {msg}
              </Notification>
            ) : (
              <Quote quote={quote} />
            )}
          </Widget >

          <Outlet />
        </div>
      </main>
    </>
  )
}
import { Outlet, useActionData, useFetcher, useLoaderData } from "react-router-dom";

import { useBreakpoint, useLayout } from "@/hooks";
import cn from "classnames";
import { CollapsedSidebar } from "./layout-components/CollapsedSidebar";
import { Sidebar } from "./layout-components/Sidebar";
import { TopBar } from "./layout-components/TopBar";
import { Widget } from "@/components/Widget";
import { Quote } from "@/components/Quote";
import { Notification } from "@/components/Notification";
import { useEffect, useState } from "react";

export default function AppLayout() {
  const { isSidebarExpanded } = useLayout();
  const { isMobile, isTablet } = useBreakpoint();

  const fetcher = useFetcher({ key: "add-transaction" });

  const { notificationData: { quote, redirectData } } = useLoaderData();

  const { msg: redirectMsg, msgType: redirectMsgType } = redirectData;

  const [flashMsg, setFlashMsg] = useState({
    msg: fetcher.data?.msg || redirectMsg || null,
    msgType: fetcher.data?.msgType || redirectMsgType || null
  });

  useEffect(() => {
    if (!flashMsg) {
      if (fetcher.data?.msg) {
        setFlashMsg({ msg: fetcher.data?.msg, msgType: fetcher.data?.msgType });
      } else if (redirectMsg) {
        setFlashMsg({ msg: redirectMsg, msgType: redirectMsgType });
      }
    }
  }, [fetcher.data, redirectData])

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
            {flashMsg ? (
              <Notification type={flashMsg.msgType} clearMsg={() => setFlashMsg(null)}>
                {flashMsg.msg}
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
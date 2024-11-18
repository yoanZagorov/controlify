import { Outlet, useFetcher, useLoaderData } from "react-router-dom";

import { useBreakpoint, useLayout, useFlashMsg } from "@/hooks";
import cn from "classnames";
import { CollapsedSidebar } from "./layout-components/CollapsedSidebar";
import { Sidebar } from "./layout-components/Sidebar";
import { TopBar } from "./layout-components/TopBar";
import { useState } from "react";
import { InfoWidget } from "@/components/widgets/InfoWidget";

export default function AppLayout() {
  const { isSidebarExpanded } = useLayout();
  const { isMobile, isTablet } = useBreakpoint();

  const fetcher = useFetcher({ key: "add-transaction" });
  const addTransactionMsg = fetcher.data?.msg;
  const addTransactionMsgType = fetcher.data?.msgType;

  const { notificationData: { quote, redirectData } } = useLoaderData();

  const [redirectMsg, setRedirectMsg] = useState({ msg: redirectData.msg, msgType: redirectData.msgType }); // need to use local state to ensure no stale data

  const { flashMsg, clearFlashMsg } = useFlashMsg([
    {
      msg: addTransactionMsg,
      msgType: addTransactionMsgType,
      clearMsg: null
    },
    {
      msg: redirectMsg.msg,
      msgType: redirectMsg.msgType,
      clearMsg: () => setRedirectMsg({ msg: null, msgType: null })
    },
  ], [addTransactionMsg, redirectMsg]);

  const classes = {
    page: cn(
      "min-h-screen pt-24 px-4 pb-8 tab:pt-10 ll:pt-12 ll:px-10",
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
        <div className="w-full max-w-6xl mx-auto">
          <InfoWidget
            flashMsg={flashMsg}
            clearFlashMsg={clearFlashMsg}
            quote={quote}
          />
          <div className="mt-16">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  )
}
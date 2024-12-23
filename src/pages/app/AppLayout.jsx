import { Outlet, useFetcher, useLoaderData } from "react-router";

import { useBreakpoint, useLayout, useFlashMsg } from "@/hooks";
import cn from "classnames";
import { CollapsedSidebar } from "./layout-components/CollapsedSidebar";
import { Sidebar } from "./layout-components/Sidebar";
import { TopBar } from "./layout-components/TopBar";
import { useEffect, useState } from "react";
import { InfoWidget } from "@/components/widgets/InfoWidget";

export default function AppLayout() {
  const { isSidebarExpanded } = useLayout();
  const { isMobile, isTablet, isLaptopS, isDesktop } = useBreakpoint();

  const addTransactionFetcher = useFetcher({ key: "addTransaction" });
  const addTransactionMsg = addTransactionFetcher.data?.msg;
  const addTransactionMsgType = addTransactionFetcher.data?.msgType;

  const updateWalletFetcher = useFetcher({ key: "updateWallet" });
  const updateWalletMsg = updateWalletFetcher.data?.msg;
  const updateWalletMsgType = updateWalletFetcher.data?.msgType;

  const addWalletFetcher = useFetcher({ key: "addWallet" });
  const addWalletMsg = addWalletFetcher.data?.msg;
  const addWalletMsgType = addWalletFetcher.data?.msgType;

  const { notificationData: { quote, redirectData } } = useLoaderData();

  const [redirectMsg, setRedirectMsg] = useState({ msg: redirectData.msg, msgType: redirectData.msgType }); // need to use local state to ensure no stale data

  // useEffect(() => {
  //   setRedirectMsg({ msg: redirectData?.msg, msgType: redirectData?.msgType })
  // }, [redirectData]);

  const { flashMsg, clearFlashMsg } = useFlashMsg([
    {
      msg: addTransactionMsg,
      msgType: addTransactionMsgType,
      clearMsg: null
    },
    {
      msg: updateWalletMsg,
      msgType: updateWalletMsgType,
      clearMsg: null
    },
    {
      msg: addWalletMsg,
      msgType: addWalletMsgType,
      clearMsg: null
    },
    {
      msg: redirectMsg.msg,
      msgType: redirectMsg.msgType,
      clearMsg: () => setRedirectMsg({ msg: null, msgType: null })
    },
  ], [addTransactionMsg, addWalletMsg, updateWalletMsg, redirectMsg]);

  const classes = {
    page: cn(
      "min-h-screen pt-24 px-4 pb-8 tab:pt-10 ll:pt-12 ls:px-8 ll:px-10 overflow-x-hidden rounded-b-lg",
      isSidebarExpanded ? "tab:ml-80 ll:ml-96" : "tab:ml-20"
    ),
    content: cn(
      "w-full mx-auto rounded-b-lg",
      isDesktop || (isLaptopS && !isSidebarExpanded)
        ? "max-w-6xl"
        : "max-w-lg"
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
        ) : (isTablet || isLaptopS) ? (
          <>
            <CollapsedSidebar />
            <Sidebar />
          </>
        ) : (
          <Sidebar />
        )}
      </header>

      <main className={classes.page}>
        <div className={classes.content}>
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
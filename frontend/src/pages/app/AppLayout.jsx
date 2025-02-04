import { Outlet, useFetcher, useLoaderData } from "react-router";

import { useBreakpoint, useLayout, useFlashMsg } from "@/hooks";
import cn from "classnames";
import { CollapsedSidebar } from "./layout-components/CollapsedSidebar";
import { Sidebar } from "./layout-components/Sidebar";
import { TopBar } from "./layout-components/TopBar";
import { useEffect, useState } from "react";
import { InfoWidget } from "@/components/widgets/InfoWidget";
import { createFetcherMsg } from "@/utils/general";

export default function AppLayout() {
  const { isSidebarExpanded } = useLayout();
  const { isMobile, isTablet, isLaptopS, isDesktop } = useBreakpoint();

  const addTransactionFetcher = useFetcher({ key: "addTransaction" });
  const updateTransactionFetcher = useFetcher({ key: "updateTransaction" });
  const deleteTransactionFetcher = useFetcher({ key: "deleteTransaction" });
  const addWalletFetcher = useFetcher({ key: "addWallet" });
  const updateWalletFetcher = useFetcher({ key: "updateWallet" });
  const addCategoryFetcher = useFetcher({ key: "addCategory" });
  const updateCategoryFetcher = useFetcher({ key: "updateCategory" });
  const deleteCategoryFetcher = useFetcher({ key: "deleteCategory" });
  const updateSettingsFetcher = useFetcher({ key: "updateSettings" });
  const deleteAccountFetcher = useFetcher({ key: "deleteAccount" });

  const [addTransactionMsg, addTransactionMsgType] = createFetcherMsg(addTransactionFetcher);
  const [updateTransactionMsg, updateTransactionMsgType] = createFetcherMsg(updateTransactionFetcher);
  const [deleteTransactionMsg, deleteTransactionMsgType] = createFetcherMsg(deleteTransactionFetcher);
  const [addWalletMsg, addWalletMsgType] = createFetcherMsg(addWalletFetcher);
  const [updateWalletMsg, updateWalletMsgType] = createFetcherMsg(updateWalletFetcher);
  const [addCategoryMsg, addCategoryMsgType] = createFetcherMsg(addCategoryFetcher);
  const [updateCategoryMsg, updateCategoryMsgType] = createFetcherMsg(updateCategoryFetcher);
  const [deleteCategoryMsg, deleteCategoryMsgType] = createFetcherMsg(deleteCategoryFetcher);
  const [updateSettingsMsg, updateSettingsMsgType] = createFetcherMsg(updateSettingsFetcher);
  const [deleteAccountMsg, deleteAccountMsgType] = createFetcherMsg(deleteAccountFetcher);

  const { notificationData: { quote, redirectData } } = useLoaderData();

  const [redirectMsg, setRedirectMsg] = useState({ msg: redirectData.msg, msgType: redirectData.msgType }); // need to use local state to ensure no stale data

  const { flashMsg, clearFlashMsg } = useFlashMsg([
    {
      msg: addTransactionMsg,
      msgType: addTransactionMsgType,
      clearMsg: null
    },
    {
      msg: updateTransactionMsg,
      msgType: updateTransactionMsgType,
      clearMsg: null
    },
    {
      msg: deleteTransactionMsg,
      msgType: deleteTransactionMsgType,
      clearMsg: null
    },
    {
      msg: addWalletMsg,
      msgType: addWalletMsgType,
      clearMsg: null
    },
    {
      msg: updateWalletMsg,
      msgType: updateWalletMsgType,
      clearMsg: null
    },
    {
      msg: addCategoryMsg,
      msgType: addCategoryMsgType,
      clearMsg: null
    },
    {
      msg: updateCategoryMsg,
      msgType: updateCategoryMsgType,
      clearMsg: null
    },
    {
      msg: deleteCategoryMsg,
      msgType: deleteCategoryMsgType,
      clearMsg: null
    },
    {
      msg: updateSettingsMsg,
      msgType: updateSettingsMsgType,
      clearMsg: null
    },
    {
      msg: deleteAccountMsg,
      msgType: deleteAccountMsgType,
      clearMsg: null
    },
    {
      msg: redirectMsg.msg,
      msgType: redirectMsg.msgType,
      clearMsg: () => setRedirectMsg({ msg: null, msgType: null })
    },
  ], [
    addTransactionMsg,
    updateTransactionMsg,
    deleteTransactionMsg,
    addWalletMsg,
    updateWalletMsg,
    addCategoryMsg,
    updateCategoryMsg,
    deleteCategoryMsg,
    updateSettingsMsg,
    deleteAccountMsg,
    redirectMsg
  ]);

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
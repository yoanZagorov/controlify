import cn from "classnames";
import { useEffect, useState } from "react";
import { useFetcher, useRouteLoaderData } from "react-router";

import { TransactionProvider } from "@/contexts";

import { useBreakpoint, useLayout, useModal, useMountTransition, useScrollLock, useScrollToTop } from "@/hooks";
import { resetFetcher } from "@/services/router/utils";

import { Amount } from "@/components/Amount";
import { Section } from "@/components/sections/Section";
import { TransactionModal } from "@/components/modals/TransactionModal";

import { ContentWidget } from "@/components/widgets/ContentWidget";
import { BalanceLineChart } from "@/components/charts/BalanceLineChart";
import { TransactionsSection } from "@/components/sections/TransactionsSection";
import { WalletsSection } from "@/components/sections/WalletsSection";
import { BalanceSection } from "./sections/BalanceSection";

export default function Dashboard() {
  useScrollToTop();

  const {
    userData: {
      user,
      wallets,
      balance,
      todayTransactions,
      balanceChartData
    }
  } = useRouteLoaderData("app");

  const fetcher = useFetcher({ key: "add-transaction" });

  const {
    modalState: [isTransactionModalOpen, setTransactionModalOpen],
    hasTransitioned,
    modalRef
  } = useModal({ fetcher });

  const { isSidebarExpanded } = useLayout();
  const { isMobile, isTablet, isLaptopS } = useBreakpoint();
  const isSingleColLayout = isMobile || isTablet || (isLaptopS && isSidebarExpanded);

  const classes = {
    grid: cn(
      "grid gap-16 ll:gap-x-20 fhd:gap-x-24",
      isSingleColLayout
        ? "grid-cols-1"
        : "grid-cols-12 grid-flow-col gap-x-12",
    ),
    gridItem: isSingleColLayout ? "" : "col-span-6",
    transactionSection: cn(
      isSingleColLayout ? "" : "col-span-6 row-span-2",
      "h-full flex flex-col"
    )
  }

  return (
    <>
      <div className={classes.grid}>
        <BalanceSection
          section={{
            className: classes.gridItem
          }}
          balance={{
            amount: {
              current: balance
            },
            chartData: balanceChartData
          }}
          currency={user.defaultCurrency}
        />

        <WalletsSection
          section={{
            title: "Wallets",
            className: classes.gridItem
          }}
          wallets={wallets}
        />

        <TransactionsSection
          hasFilter={false}
          openModal={() => setTransactionModalOpen(true)}
          transactions={todayTransactions}
          period="today"
          section={{
            title: "Transactions",
            className: classes.transactionSection,
            contentClassName: "flex-1"
          }}
          widget={{
            iconName: "calendar",
            title: "today"
          }}
          display={{
            date: false
          }}
        />
      </div >

      {(isTransactionModalOpen || hasTransitioned) &&
        <TransactionProvider>
          <TransactionModal
            closeModal={() => setTransactionModalOpen(false)}
            isTransactionModalOpen={isTransactionModalOpen}
            hasTransitioned={hasTransitioned}
            modalRef={modalRef}
          />
        </TransactionProvider>
      }
    </>
  )
}
import cn from "classnames";
import { useEffect, useState } from "react";
import { useFetcher, useRouteLoaderData } from "react-router-dom";

import { TransactionProvider } from "@/contexts";

import { useBreakpoint, useLayout, useModal, useMountTransition, useScrollLock, useScrollToTop } from "@/hooks";
import { resetFetcher } from "services/router/utils";

import { Amount } from "@/components/Amount";
import { Section } from "@/components/sections/Section";
import { TransactionModal } from "@/components/modals/TransactionModal";

import { ContentWidget } from "@/components/widgets/ContentWidget";
import { BalanceLineChart } from "@/components/charts/BalanceLineChart";
import { TransactionsSection } from "@/components/sections/TransactionsSection";
import { WalletsSection } from "@/components/sections/WalletsSection";

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

  const [isTransactionModalOpen, setTransactionModalOpen, hasTransitioned] = useModal(fetcher, 300);

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
        <Section
          title="Balance"
          className={classes.gridItem}
          contentClassName="flex flex-col gap-6"
        >
          <ContentWidget
            iconName="scale"
            title="current"
            content={{ hasBackground: false, className: "mt-2" }}
          >
            <Amount
              amount={balance}
              currency={user.defaultCurrency}
              colorContext="light"
              className="text-2xl font-bold"
            />
          </ContentWidget>

          <ContentWidget iconName="calendar-months" title="last 30 days" content={{ className: "h-48 ml:h-56" }} >
            <BalanceLineChart data={balanceChartData} currency={user.defaultCurrency} />
          </ContentWidget>
        </Section>

        <WalletsSection
          section={{
            title: "Wallets",
            className: classes.gridItem
          }}
          wallets={wallets}
        />

        <TransactionsSection
          hasFilter={false}
          section={{
            title: "Transactions",
            className: classes.transactionSection,
            contentClassName: "flex-1"
          }}
          widget={{
            iconName: "calendar",
            title: "today"
          }}
          transactions={todayTransactions}
          openModal={() => setTransactionModalOpen(true)}
          period="today"
          showDate={false}
        />
      </div >

      {(isTransactionModalOpen || hasTransitioned) &&
        <TransactionProvider>
          <TransactionModal
            closeModal={() => setTransactionModalOpen(false)}
            isTransactionModalOpen={isTransactionModalOpen}
            hasTransitioned={hasTransitioned}
          />
        </TransactionProvider>
      }
    </>
  )
}
import cn from "classnames";
import { useRouteLoaderData } from "react-router";

import { TransactionProvider } from "@/contexts";

import { useLayout, useScrollToTop } from "@/hooks";

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

  const { isSingleColLayout } = useLayout();

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
          currency={user.currency}
        />

        <WalletsSection
          section={{
            title: "Wallets",
            className: classes.gridItem
          }}
          wallets={wallets}
        />

        <TransactionProvider>
          <TransactionsSection
            action="/app/dashboard"
            contentProps={{
              hasFilter: false,
              transactions: todayTransactions,
              period: "today",
              section: {
                title: "Transactions",
                className: classes.transactionSection,
                contentClassName: "flex-1"
              },
              widget: {
                iconName: "calendar",
                title: "today"
              },
              display: {
                date: false
              }
            }}
          />
        </TransactionProvider>
      </div >
    </>
  )
}
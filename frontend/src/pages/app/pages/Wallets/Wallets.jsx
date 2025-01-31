import cn from "classnames";
import { useLoaderData } from "react-router";

import { useLayout, useScrollToTop } from "@/hooks";

import { TransactionProvider, WalletSubmissionProvider } from "@/contexts";

import { WalletsSection } from "@/components/sections/WalletsSection";
import { TransactionsSection } from "@/components/sections/TransactionsSection";
import { SpendingSection } from "./sections/SpendingSection";

export default function Wallets() {
  useScrollToTop();

  const { transactions, wallets, expensesByWalletChartData } = useLoaderData();

  const { isSingleColLayout } = useLayout();

  const classes = {
    grid: cn(
      "grid gap-16 ll:gap-x-20 fhd:gap-x-24",
      isSingleColLayout
        ? "grid-cols-1"
        : "grid-cols-12 gap-x-12",
    ),
    gridItem: !isSingleColLayout && "col-span-6",
    transactionSection: !isSingleColLayout && "col-span-12"
  }

  return (
    <>
      <div className={classes.grid}>
        <WalletSubmissionProvider>
          <WalletsSection
            action="/app/wallets"
            contentProps={{
              wallets,
              section: {
                title: "All Wallets",
                subtitle: "Overview",
                className: cn(classes.gridItem)
              }
            }}
          />
        </WalletSubmissionProvider>

        <SpendingSection
          section={{
            className: classes.gridItem
          }}
          chart={{
            type: "expensesByWallet",
            data: expensesByWalletChartData
          }}
        />

        <TransactionProvider>
          <TransactionsSection
            action="/app/wallets"
            contentProps={{
              type: isSingleColLayout ? "compact" : "expanded",
              transactions,
              section: {
                title: "All Transactions",
                className: cn(classes.transactionSection),
                contentClassName: "flex-1"
              },
              widget: {
                iconName: "history",
                title: "all"
              },
            }}
          />
        </TransactionProvider>
      </div>
    </>
  )
}

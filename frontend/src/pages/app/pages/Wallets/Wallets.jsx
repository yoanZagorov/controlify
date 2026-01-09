import cn from "classnames";
import { useLoaderData } from "react-router";

import { ROUTES } from "#constants";

import { useLayout, useScrollToTop } from "#hooks";

import { TransactionProvider, WalletSubmissionProvider } from "#contexts";
import { WalletsSection } from "#components/sections/WalletsSection";
import { TransactionsSection } from "#components/sections/TransactionsSection";
import { SpendingSection } from "./sections/SpendingSection";

// Rendered on /wallets
export default function Wallets() {
  useScrollToTop();

  const { transactions, wallets, expensesByWalletChartData } = useLoaderData();
  const { isSingleColLayout } = useLayout();

  return (
    <>
      <div className={cn("grid gap-16 ll:gap-x-20 fhd:gap-x-24", isSingleColLayout ? "grid-cols-1" : "grid-cols-12 gap-x-12")}>
        <WalletSubmissionProvider>
          <WalletsSection
            action={ROUTES.WALLETS}
            contentProps={{
              wallets,
              section: {
                title: "All Wallets",
                subtitle: "Overview",
                className: cn(!isSingleColLayout && "col-span-6")
              }
            }}
          />
        </WalletSubmissionProvider>

        <SpendingSection
          sectionProps={{
            className: !isSingleColLayout && "col-span-6"
          }}
          chart={{
            type: "expensesByWallet",
            data: expensesByWalletChartData
          }}
        />

        <TransactionProvider>
          <TransactionsSection
            action={ROUTES.WALLETS}
            contentProps={{
              type: isSingleColLayout ? "compact" : "expanded",
              transactions,
              sectionProps: {
                title: "All Transactions",
                className: cn(!isSingleColLayout && "col-span-12"),
                contentClassName: "flex-1"
              },
              widget: {
                iconName: "history",
                title: "all"
              }
            }}
          />
        </TransactionProvider>
      </div>
    </>
  )
}

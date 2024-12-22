import { useFetcher, useRouteLoaderData } from "react-router"

import { TransactionProvider } from "@/contexts";

import { useLayout, useModal } from "@/hooks";

import { TransactionModal } from "@/components/modals/TransactionModal";
import { TransactionsSection } from "@/components/sections/TransactionsSection";

export default function WalletTransactions() {
  const { isSingleColLayout } = useLayout();

  const { transactions } = useRouteLoaderData("wallet");

  return (
    <>
      <TransactionProvider>
        <TransactionsSection
          action="/app/wallets"
          contentProps={{
            type: isSingleColLayout ? "compact" : "expanded",
            transactions,
            section: {
              title: "Wallet Transactions",
            },
            widget: {
              iconName: "arrows-rotate",
              title: "activity overview"
            },
            display: {
              wallet: false
            }
          }}
        />
      </TransactionProvider>
    </>
  )
}

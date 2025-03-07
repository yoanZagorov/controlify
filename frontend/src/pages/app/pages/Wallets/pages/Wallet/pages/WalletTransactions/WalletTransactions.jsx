import { useRouteLoaderData } from "react-router";

import { ROUTES } from "@/constants";

import { TransactionProvider } from "@/contexts";

import { useLayout, useScrollToTop } from "@/hooks";

import { TransactionsSection } from "@/components/sections/TransactionsSection";

// The Transactions page for a single wallet
export default function WalletTransactions() {
  useScrollToTop();

  const { wallet, transactions } = useRouteLoaderData("wallet");
  const { isSingleColLayout } = useLayout();

  return (
    <>
      <TransactionProvider providedWallet={wallet}>
        <TransactionsSection
          action={ROUTES.WALLET.DYNAMIC(wallet.id)}
          contentProps={{
            type: isSingleColLayout ? "compact" : "expanded",
            transactions,
            sectionProps: {
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

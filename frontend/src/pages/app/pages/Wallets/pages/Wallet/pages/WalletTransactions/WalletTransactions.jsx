import { useRouteLoaderData } from "react-router"

import { TransactionProvider } from "@/contexts";

import { useLayout, useScrollToTop } from "@/hooks";

import { TransactionsSection } from "@/components/sections/TransactionsSection";
import { ROUTES } from "@/constants";

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

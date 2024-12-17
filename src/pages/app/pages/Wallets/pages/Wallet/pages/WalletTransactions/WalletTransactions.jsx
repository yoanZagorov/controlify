import { useFetcher, useRouteLoaderData } from "react-router"

import { TransactionProvider } from "@/contexts";

import { useLayout, useModal } from "@/hooks";

import { TransactionModal } from "@/components/modals/TransactionModal";
import { TransactionsSection } from "@/components/sections/TransactionsSection";

export default function WalletTransactions() {
  const { isSingleColLayout } = useLayout();

  const { wallet, transactions } = useRouteLoaderData("wallet");

  const fetcher = useFetcher({ key: "addTransaction" });

  const {
    modalState: [isTransactionModalOpen, setTransactionModalOpen],
    hasTransitioned,
    modalRef
  } = useModal({ fetcher });

  return (
    <>
      <TransactionsSection
        type={isSingleColLayout ? "compact" : "expanded"}
        openModal={() => setTransactionModalOpen(true)}
        transactions={transactions}
        period="all-time"
        section={{
          title: "Wallet Transactions"
        }}
        widget={{
          iconName: "arrows-rotate",
          title: "activity overview"
        }}
        display={{
          wallet: false
        }}
      />

      {(isTransactionModalOpen || hasTransitioned) &&
        <TransactionProvider wallet={wallet}>
          <TransactionModal
            isTransactionModalOpen={isTransactionModalOpen}
            hasTransitioned={hasTransitioned}
            modalRef={modalRef}
          />
        </TransactionProvider>
      }
    </>
  )
}

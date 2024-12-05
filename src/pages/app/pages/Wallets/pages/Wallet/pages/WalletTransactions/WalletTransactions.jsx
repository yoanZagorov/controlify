import { TransactionModal } from "@/components/modals/TransactionModal";
import { TransactionsSection } from "@/components/sections/TransactionsSection";
import { TransactionProvider } from "@/contexts";
import { useBreakpoint, useLayout, useModal } from "@/hooks";
import { useFetcher, useRouteLoaderData } from "react-router"

export default function WalletTransactions() {
  const { isDesktop, isLaptopS } = useBreakpoint();
  const { isSidebarExpanded } = useLayout();

  const { wallet, transactions } = useRouteLoaderData("wallet");

  const fetcher = useFetcher({ key: "add-transaction" });

  const {
    modalState: [isTransactionModalOpen, setTransactionModalOpen],
    hasTransitioned,
    modalRef
  } = useModal({ fetcher });

  return (
    <>
      <TransactionsSection
        transactionType={isDesktop || (isLaptopS && !isSidebarExpanded) ? "expanded" : "compact"}
        section={{
          title: "Wallet Transactions"
        }}
        widget={{
          iconName: "arrows-rotate",
          title: "activity overview"
        }}
        openModal={() => setTransactionModalOpen(true)}
        transactions={transactions}
        period="all-time"
      />

      {(isTransactionModalOpen || hasTransitioned) &&
        <TransactionProvider wallet={wallet}>
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

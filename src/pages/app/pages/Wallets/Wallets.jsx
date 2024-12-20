import cn from "classnames";
import { useFetcher, useLoaderData } from "react-router";

import { useLayout, useModal, useScrollToTop } from "@/hooks";

import { WalletsSection } from "@/components/sections/WalletsSection";
import { TransactionsSection } from "@/components/sections/TransactionsSection";
import { TransactionProvider } from "@/contexts";
import { TransactionModal } from "@/components/modals/TransactionModal";
import { SpendingSection } from "./sections/SpendingSection";

export default function Wallets() {
  useScrollToTop();

  const addTransactionFetcher = useFetcher({ key: "addTransaction" });
  // const addWalletFetcher = useFetcher({ key: "addWallet" });

  const {
    modalState: [isTransactionModalOpen, setTransactionModalOpen],
    hasTransitioned: hasTransactionModalTransitioned,
    modalRef: transactionModalRef
  } = useModal({ fetcher: addTransactionFetcher });

  // const {
  //   modalState: [isWalletModalOpen, setWalletModalOpen],
  //   hasTransitioned: hasWalletModalTransitioned,
  //   modalRef: walletModalRef
  // } = useModal({ addWalletFetcher });


  const { transactions, wallets, expensesByWalletChartData } = useLoaderData();

  const { isSingleColLayout } = useLayout();

  const classes = {
    grid: cn(
      "grid gap-16 ll:gap-x-20 fhd:gap-x-24",
      isSingleColLayout
        ? "grid-cols-1"
        : "grid-cols-12 gap-x-12",
    ),
    gridItem: isSingleColLayout ? "" : "col-span-6",
    transactionSection: cn(
      isSingleColLayout ? "" : "col-span-12",
    )
  }

  return (
    <>
      <div className={classes.grid}>
        <WalletsSection
          action="/app/wallets"
          wallets={wallets}
          section={{
            title: "All Wallets",
            subtitle: "Overview",
            className: cn(classes.gridItem)
          }}
        />

        <SpendingSection
          section={{
            className: classes.gridItem
          }}
          chart={{
            type: "expensesByWallet",
            data: expensesByWalletChartData
          }}
        />

        <TransactionsSection
          type={isSingleColLayout ? "compact" : "expanded"}
          openModal={() => setTransactionModalOpen(true)}
          transactions={transactions}
          section={{
            title: "All Transactions",
            className: classes.transactionSection,
            contentClassName: "flex-1"
          }}
          widget={{
            iconName: "arrows-rotate",
            title: "activity overview"
          }}
          period="all-time"
        />
      </div>

      {(isTransactionModalOpen || hasTransactionModalTransitioned) &&
        <TransactionProvider>
          <TransactionModal
            isTransactionModalOpen={isTransactionModalOpen}
            hasTransitioned={hasTransactionModalTransitioned}
            modalRef={transactionModalRef}
          />
        </TransactionProvider>
      }
    </>
  )
}

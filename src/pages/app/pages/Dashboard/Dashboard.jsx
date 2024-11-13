import cn from "classnames";
import { useEffect, useState } from "react";
import { useActionData, useFetcher, useLoaderData, useRouteLoaderData } from "react-router-dom";

import { TransactionProvider } from "@/contexts";

import { useBreakpoint, useFetcherReset, useLayout, useMountTransition, useScreenWidth, useScrollLock } from "@/hooks";

import { Amount } from "@/components/Amount";
import { Widget } from "@/components/Widget";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { TransactionModal } from "@/components/modals/TransactionModal";

import { DashboardWidget } from "./components/DashboardWidget";
import { Transaction } from "./components/Transaction";
import { PlusCircleIcon } from "./components/PlusCircleIcon";

export default function Dashboard() {
  const { isSidebarExpanded } = useLayout();
  const { isMobile, isTablet } = useBreakpoint();
  const isSingleColLayout = isMobile || (isTablet && isSidebarExpanded);

  const {
    userData: {
      user,
      wallets,
      balance,
      todayTransactionsByWallet
    }
  } = useRouteLoaderData("app");

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const hasTransitioned = useMountTransition(isTransactionModalOpen, 300);
  useScrollLock(isTransactionModalOpen);

  const fetcher = useFetcher({ key: "add-transaction" });

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setTransactionModalOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [fetcher.data, fetcher.state, fetcher.data?.resetKey])

  useFetcherReset(fetcher);

  const walletWidgets = wallets.map(wallet => (
    <DashboardWidget
      key={wallet.id}
      iconName={wallet.iconName}
      title={wallet.name}
      className="h-full"
    >
      <Amount
        amount={wallet.balance}
        currency={wallet.currency}
        colorContext="light"
        className="text-lg font-bold"
      />
    </DashboardWidget>
  ))

  const hasTransactions = todayTransactionsByWallet.find(wallet => wallet.transactions.length > 0);
  const transactionEls = hasTransactions &&
    todayTransactionsByWallet.map(wallet => (
      wallet.transactions.map(transaction => (
        <li key={transaction.id}>
          <Transaction
            category={transaction.category}
            wallet={transaction.wallet}
            amount={transaction.amount}
            currency={transaction.wallet.currency}
          >
          </Transaction>
        </li>
      ))
    ));

  const classes = {
    grid: cn(
      "mt-16 grid gap-10 ll:gap-x-16 fhd:gap-x-24",
      isSingleColLayout
        ? "grid-cols-1"
        : "grid-cols-12 grid-flow-col",
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
        <Section title="Balance" className={classes.gridItem}>
          <DashboardWidget iconName="scale" title="current" className="mt-3">
            <Amount
              amount={balance}
              currency={user.defaultCurrency}
              colorContext="light"
              className="mt-3 text-2xl font-bold"
            />
          </DashboardWidget>
        </Section>

        <Section title="Wallets" className={classes.gridItem}>
          <div className="mt-3 grid grid-cols-2 w-full gap-5">
            {walletWidgets}

            <Widget className="h-full flex flex-col justify-center items-center gap-3">
              <h4 className="text-lg font-bold text-navy">Add Wallet</h4>

              <button className="size-12 rounded-full focus:outline-none focus-visible:ring focus-visible:ring-goldenrod">
                <PlusCircleIcon
                  className="size-full"
                  circleColor="fill-navy"
                  plusColor="fill-goldenrod"
                />
              </button>
            </Widget>
          </div>
        </Section>

        <Section title="Transactions" className={classes.transactionSection}>
          <DashboardWidget iconName="calendar" title="today" className="mt-3 flex-1">
            <div className="mt-2 flex-1 p-3 rounded-lg bg-gray-light">
              <div className="mx-auto flex flex-col gap-10">
                {hasTransactions ? (
                  <ul className="flex flex-col gap-5">
                    {transactionEls}
                  </ul>
                ) : (
                  <p className="self-center w-full max-w-80 text-navy-dark text-center text-balance font-semibold">
                    Oops... It looks like you haven't made any transactions yet today. Add one now!
                  </p>
                )}

                <Button onClick={() => setTransactionModalOpen(true)} className="self-center w-full max-w-64 lm:py-3 lm:text-lg focus:ring-2">
                  Add Transaction
                </Button>
              </div>
            </div>
          </DashboardWidget>
        </Section>
      </div>

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
import cn from "classnames";
import { useEffect, useState } from "react";
import { useFetcher, useRouteLoaderData } from "react-router-dom";

import { TransactionProvider } from "@/contexts";

import { useBreakpoint, useLayout, useMountTransition, useScrollLock } from "@/hooks";
import { resetFetcher } from "services/router/utils";

import { Amount } from "@/components/Amount";
import { Section } from "@/components/sections/Section";
import { TransactionModal } from "@/components/modals/TransactionModal";

import { ContentWidget } from "@/components/widgets/ContentWidget";
import { BalanceLineChart } from "@/components/charts/BalanceLineChart";
import { CompactTransactionsSection } from "@/components/sections/CompactTransactionsSection";
import { WalletsSection } from "@/components/sections/WalletsSection";

export default function Dashboard() {
  const { isSidebarExpanded } = useLayout();
  const { isMobile, isTablet } = useBreakpoint();
  const isSingleColLayout = isMobile || (isTablet && isSidebarExpanded);

  const {
    userData: {
      user,
      wallets,
      balance,
      todayTransactionsByWallet,
      balanceChartData
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
      resetFetcher(fetcher);
    }
  }, [fetcher.data, fetcher.state])

  const classes = {
    grid: cn(
      "grid gap-10 ll:gap-x-16 fhd:gap-x-24",
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
          <ContentWidget iconName="scale" title="current" className="mt-3">
            <Amount
              amount={balance}
              currency={user.defaultCurrency}
              colorContext="light"
              className="mt-3 text-2xl font-bold"
            />
            <BalanceLineChart data={balanceChartData} />
          </ContentWidget>
        </Section>

        <WalletsSection
          section={{
            title: "Wallets",
            className: classes.gridItem
          }}
          wallets={wallets}
        />

        <CompactTransactionsSection
          sectionClassName={classes.transactionSection}
          widget={{
            iconName: "calendar",
            title: "today"
          }}
          transactions={todayTransactionsByWallet}
          openModal={() => setTransactionModalOpen(true)}
        />
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
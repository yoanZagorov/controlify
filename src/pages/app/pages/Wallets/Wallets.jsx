import cn from "classnames";
import { useFetcher, useLoaderData, useRouteLoaderData } from "react-router-dom";

import { useBreakpoint, useLayout, useModal, useScrollToTop } from "@/hooks";

import { WalletsSection } from "@/components/sections/WalletsSection";
import { Section } from "@/components/sections/Section";
import { TransactionsSection } from "@/components/sections/TransactionsSection";
import { ExpensesByWalletPieChart } from "@/components/charts/ExpensesByWalletPieChart";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { Notification } from "@/components/Notification";
import { TransactionProvider } from "@/contexts";
import { TransactionModal } from "@/components/modals/TransactionModal";

export default function Wallets() {
  useScrollToTop();

  const fetcher = useFetcher({ key: "add-transaction" });
  const [isTransactionModalOpen, setTransactionModalOpen, hasTransitioned] = useModal(fetcher, 300);

  const { transactions, wallets, expensesByWalletChartData } = useLoaderData();
  const hasExpenses = expensesByWalletChartData.find(entry => entry.expenses !== 0);

  const { isSidebarExpanded } = useLayout();
  const { isMobileS, isMobileM, isMobile, isTablet, isLaptopS, isDesktop } = useBreakpoint(); // To do: use this value to render and ExpandedTransactionsSection on ml/tab
  const isSingleColLayout = isMobile || isTablet || (isLaptopS && isSidebarExpanded);

  const classes = {
    grid: cn(
      "grid gap-16 ll:gap-x-20 fhd:gap-x-24",
      isSingleColLayout
        ? "grid-cols-1"
        : "grid-cols-12 gap-x-12",
    ),
    gridItem: isSingleColLayout ? "" : "col-span-6",
    transactionSection: cn(
      "overflow-auto",
      isSingleColLayout ? "" : "col-span-12",
    )
  }

  return (
    <>
      <div className={classes.grid}>
        <WalletsSection
          section={{
            title: "All Wallets",
            className: classes.gridItem
          }}
          wallets={wallets}
        />

        <Section title="Spending" className={classes.gridItem}>
          <ContentWidget iconName="calendar-months" title="last 30 days">
            {hasExpenses ? (
              <div className="mx-auto max-w-80 h-80">
                <ExpensesByWalletPieChart
                  data={expensesByWalletChartData}
                  showChartLabel={!(isMobileS || isMobileM)}
                />
              </div>
            ) : (
              <Notification className="max-w-64 mx-auto">
                Not enough data available to create the chart yet. Add a few transactions to get started!
              </Notification>
            )}
          </ContentWidget>
        </Section>

        <TransactionsSection
          transactionType={isDesktop || (isLaptopS && !isSidebarExpanded) ? "expanded" : "compact"}
          section={{
            title: "All Transactions",
            className: classes.transactionSection,
            contentClassName: "flex-1"
          }}
          widget={{
            iconName: "arrows-rotate",
            title: "activity overview"
          }}
          openModal={() => setTransactionModalOpen(true)}
          transactions={transactions}
          period="all-time"
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

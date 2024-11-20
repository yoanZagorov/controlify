import cn from "classnames";
import { useFetcher, useLoaderData, useRouteLoaderData } from "react-router-dom";

import { useBreakpoint, useLayout, useModal, useScrollToTop } from "@/hooks";

import { WalletsSection } from "@/components/sections/WalletsSection";
import { Section } from "@/components/sections/Section";
import { CompactTransactionsSection } from "@/components/sections/CompactTransactionsSection";
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
  const { isMobileS, isMobileM, isMobile, isTablet } = useBreakpoint(); // To do: use this value to render and ExpandedTransactionsSection on ml/tab
  const isSingleColLayout = isMobile || (isTablet && isSidebarExpanded);

  const classes = {
    grid: cn(
      "grid gap-16",
    )
  }

  return (
    <>
      <div className={classes.grid}>
        <WalletsSection
          section={{
            title: "All"
          }}
          wallets={wallets}
        />

        <Section title="Spending">
          <ContentWidget iconName="calendar-months" title="last 30 days">
            {hasExpenses ? (
              <div className="mx-auto max-w-80 h-80">
                <ExpensesByWalletPieChart
                  data={expensesByWalletChartData}
                  showChartLabel={!(isMobileS || isMobileM)}
                />
              </div>
            ) : (
              <Notification className="max-w-80 mx-auto">
                Not enough data available to create the chart yet. Add a few transactions to get started!
              </Notification>
            )}
          </ContentWidget>
        </Section>

        <CompactTransactionsSection
          widget={{
            iconName: "history",
            title: "All"
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

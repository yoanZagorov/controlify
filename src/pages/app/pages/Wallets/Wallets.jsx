import cn from "classnames";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";

import { useBreakpoint } from "@/hooks";

import { WalletsSection } from "@/components/sections/WalletsSection";
import { Section } from "@/components/sections/Section";
import { CompactTransactionsSection } from "@/components/sections/CompactTransactionsSection";
import { ExpensesByWalletPieChart } from "@/components/charts/ExpensesByWalletPieChart";
import { ContentWidget } from "@/components/widgets/ContentWidget";

export default function Wallets() {
  const { transactions, wallets, expensesByWalletChartData } = useLoaderData();

  const { isMobileS, isMobile } = useBreakpoint(); // To do: use this value to render and ExpandedTransactionsSection on ml/tab

  return (
    <div className="grid gap-16">
      <WalletsSection
        section={{
          title: "All"
        }}
        wallets={wallets}
      />

      <Section title="Spending">
        <ContentWidget iconName="calendar-months" title="last 30 days">
          <div className="mx-auto max-w-80 h-72">
            <ExpensesByWalletPieChart data={expensesByWalletChartData} showChartLabel={!isMobileS} />
          </div>
        </ContentWidget>
      </Section>

      <CompactTransactionsSection
        widget={{
          iconName: "history",
          title: "All"
        }}
        // openModal={}
        transactions={transactions}
      />
    </div>
  )
}

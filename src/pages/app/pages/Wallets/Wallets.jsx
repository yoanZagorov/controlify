import cn from "classnames";

import { useBreakpoint, useMountTransition } from "@/hooks";
import { WalletsSection } from "@/components/sections/WalletsSection";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { Section } from "@/components/sections/Section";
import { CompactTransactionsSection } from "@/components/sections/CompactTransactionsSection";
import { ExpensesByWalletPieChart } from "@/components/charts/ExpensesByWalletPieChart";
import { Widget } from "@/components/widgets/Widget";
import { ContentWidget } from "@/components/widgets/ContentWidget";

export default function Wallets() {
  // const { userData: { wallets } } = useRouteLoaderData("app");
  const { transactions, wallets, expensesByWalletChartData } = useLoaderData();

  const { isMobile } = useBreakpoint(); // To do: use this value to render and ExpandedTransactionsSection on ml/tab

  return (
    <div className="grid gap-16">
      <WalletsSection
        section={{
          title: "All"
        }}
        wallets={wallets}
      />

      <Section title="Spending" className="">
        <ContentWidget iconName="calendar-months" title="Last 30 Days" className="mt-4">
          <div className="mt-4 rounded-lg bg-gray-light p-4">
            <div className="mx-auto w-80 h-72">
              <ExpensesByWalletPieChart data={expensesByWalletChartData} />
            </div>
          </div>
        </ContentWidget>
      </Section>

      <CompactTransactionsSection
        sectionClassName=""
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

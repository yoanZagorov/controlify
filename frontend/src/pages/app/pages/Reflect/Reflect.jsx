import { FinancialScoreGaugeChart } from "@/components/charts/FinancialScoreGaugeChart";
import { SectionWrapper } from "./sections/SectionWrapper";
import { WaterfallChart } from "@/components/charts/WaterfallChart";
import { useLoaderData, useRouteLoaderData } from "react-router";
import { useBreakpoint, useLayout, useScrollToTop } from "@/hooks";
import { Amount } from "@/components/Amount";
import { CustomPieChart } from "@/components/charts/CustomPieChart";
import { BalanceLineChart } from "@/components/charts/BalanceLineChart";
import { OverviewSection } from "./sections/OverviewSection";
import { CashFlowSection } from "./sections/CashFlowSection";

export default function Reflect() {
  useScrollToTop();
  /**
   Components:
   Section Wrapper - an individual section
    Section Item  - an individual item
   **/
  const { chartData } = useLoaderData();
  const { userData: { currency: userCurrency } } = useRouteLoaderData("app");

  return (
    <div>
      <OverviewSection />

      <CashFlowSection className="mt-12" />

      {/* <SectionWrapper
        sectionProps={{
          title: "Expenses"
        }}
        chartHeight="h-[450px]"
        items={[
          {
            iconName: "category",
            title: "by category",
            ChartComponent: (
              <CustomPieChart type="byCategory" data={chartData.expensesByCategory} />
            ),
            className: "col-span-1"
          },
          {
            iconName: "scale",
            title: "balance",
            ChartComponent: (
              <WaterfallChart data={chartData.balanceOverTime} currency={userCurrency} />
            ),
            className: "col-span-2"
          }
        ]}
      /> */}
    </div>
  )
}
import { Carousel } from "@/components/Carousel";
import { Section } from "@/components/sections/Section";
import { useBreakpoint, useLayout } from "@/hooks";
import { CashFlowByCategoryChart } from "./components/CashFlowByCategoryChart.jsx";
import { useRouteLoaderData } from "react-router";
import cn from "classnames";
import ContentWidget from "@/components/widgets/ContentWidget/ContentWidget.jsx";
import isArrayTruthy from "@/utils/array/isArrayTruthy.js";
import CashFlowOverTimeLineChart from "@/components/charts/line-charts/CashFlowOverTimeLineChart/CashFlowOverTimeLineChart.jsx";

export default function CashFlowSection() {
  const DEFAULT_PERIOD = "Last 30 Days";

  const { chartData } = useRouteLoaderData("reflect");
  const { userData: { currency: userCurrency } } = useRouteLoaderData("app")

  const { isMobileS, isMobileM } = useBreakpoint();
  const { isSingleColLayout } = useLayout();

  const pieChartItems = [
    {
      transactionType: "expenses",
      iconName: "arrow-trend-down",
      chartData: chartData.expensesByCategory,
      hasSufficientData: isArrayTruthy(chartData.expensesByCategory)
    },
    {
      transactionType: "income",
      iconName: "arrow-trend-up",
      chartData: chartData.incomeByCategory,
      hasSufficientData: isArrayTruthy(chartData.incomeByCategory)
    }
  ]

  const pieChartElements = pieChartItems.map((item, index) => (
    <CashFlowByCategoryChart
      key={`chart-${index}`}
      {...item}
      chartSize={isMobileS ? "s" : isMobileM ? "m" : "l"}
      className={cn(!isSingleColLayout && "col-span-1")}
    />
  ))

  return (
    <Section
      title="Cash Flow"
      subtitle={DEFAULT_PERIOD}
      contentClassName={cn(
        "grid gap-x-16 gap-y-12",
        !isSingleColLayout && "grid-cols-2",
      )}
      className="mt-12"
    >
      {isSingleColLayout ? (
        <Carousel items={pieChartElements} />
      ) : pieChartElements}

      <ContentWidget
        iconName="line-chart"
        title="over time"
        content={{
          className: isSingleColLayout ? "h-56" : "h-72"
        }}
        className={cn(!isSingleColLayout && "col-span-2")}
      >
        <CashFlowOverTimeLineChart data={chartData.cashFlowOverTime} currency={userCurrency} />
      </ContentWidget>
    </Section >
  )
}
import { Carousel } from "@/components/Carousel";
import { Section } from "@/components/sections/Section";
import { useLayout } from "@/hooks";
import { CashFlowByCategoryChart } from "./components/CashFlowByCategoryChart.jsx";
import { useRouteLoaderData } from "react-router";
import cn from "classnames";
import CashFlowLineChart from "@/components/charts/line-charts/CashFlowLineChart/CashFlowLineChart.jsx";
import ContentWidget from "@/components/widgets/ContentWidget/ContentWidget.jsx";

export default function CashFlowSection() {
  const DEFAULT_PERIOD = "Last 30 Days";

  const { chartData } = useRouteLoaderData("reflect");
  const { userData: { currency: userCurrency } } = useRouteLoaderData("app")

  const { isSingleColLayout } = useLayout();

  const pieChartItems = [
    {
      transactionType: "expenses",
      iconName: "arrow-trend-down",
      chartData: chartData.expensesByCategory
    },
    {
      transactionType: "income",
      iconName: "arrow-trend-up",
      chartData: chartData.incomeByCategory
    }
  ]

  const pieChartElements = pieChartItems.map((item, index) => (
    <CashFlowByCategoryChart key={`chart-${index}`} {...item} className={cn(!isSingleColLayout && "col-span-1")} />
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
        <CashFlowLineChart data={chartData.cashFlowOverTime} currency={userCurrency} />
      </ContentWidget>
    </Section >
  )
}
import { Section } from "@/components/sections/Section";
import { Carousel } from "@/components/Carousel";
import { ExpensesVsIncomeVerticalBarChart } from "@/components/charts/ExpensesVsIncomeVerticalBarChart";
import { CustomPieChartWithIconLabels } from "@/components/charts/pie-charts/CustomPieChartWithIconLabels";
import { useRouteLoaderData } from "react-router";
import { useBreakpoint, useLayout } from "@/hooks";
import { ChartWrapper } from "@/components/charts/ChartWrapper";

export default function SpendingSection() {
  const DEFAULT_PERIOD = "Last 30 Days"; // To do (Non-MVP): Change this to a state variable so filtering can be implemented

  const { isSingleColLayout } = useLayout();

  const { isMobileS, isMobileM } = useBreakpoint();
  const { chartData, wallet: { currency } } = useRouteLoaderData("wallet");

  const hasSufficientData = {
    expensesByCategory: chartData.expensesByCategory.find(entry => entry.amount > 0) ? true : false,
    expensesVsIncome: chartData.expensesVsIncome.find(entry => entry.amount > 0) ? true : false,
  }

  const elements = [
    <ChartWrapper key="chartWrapper-1" iconName="categories" title="by category" hasSufficientData={hasSufficientData.expensesByCategory}>
      <CustomPieChartWithIconLabels size={isMobileS ? "s" : isMobileM ? "m" : "l"} entity="category" currency={currency} data={chartData.expensesByCategory} />
    </ChartWrapper>,
    <ChartWrapper key="chartWrapper-2" iconName="stats" title="expenses vs income" hasSufficientData={hasSufficientData.expensesVsIncome}>
      <ExpensesVsIncomeVerticalBarChart currency={currency} data={chartData.expensesVsIncome} />
    </ChartWrapper>
  ]

  return (
    <Section
      title="Wallet Spending"
      subtitle={DEFAULT_PERIOD}
    >
      {isSingleColLayout ? (
        <Carousel items={elements} />
      ) : (
        <div className="flex gap-16">
          {elements}
        </div>
      )}
    </Section>
  )
}

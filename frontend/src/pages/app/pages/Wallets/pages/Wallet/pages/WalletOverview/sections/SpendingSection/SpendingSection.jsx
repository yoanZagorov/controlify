import { useRouteLoaderData } from "react-router";

import { PERIODS } from "#constants";

import { useBreakpoint, useLayout } from "#hooks";
import { formatPeriodNameForUI } from "#utils/formatting";

import { Section } from "#components/sections/Section";
import { Carousel } from "#components/Carousel";
import { ExpensesVsIncomeVerticalBarChart } from "#components/charts/ExpensesVsIncomeVerticalBarChart";
import { CustomPieChartWithIconLabels } from "#components/charts/pie-charts/CustomPieChartWithIconLabels";
import { ChartWrapper } from "#components/charts/ChartWrapper";

// The Spending Section for the Wallet Overview page
// Displays an expenses by category pie chart + income vs expenses ratio
export default function SpendingSection() {
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
      subtitle={formatPeriodNameForUI(PERIODS.DEFAULT_PERIOD)}
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

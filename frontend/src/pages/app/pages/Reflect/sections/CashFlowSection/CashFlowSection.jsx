import { useRouteLoaderData } from 'react-router'
import cn from 'classnames'

import { PERIODS } from '#/constants'
import { useBreakpoint, useLayout } from '#/hooks'
import { isArrayTruthy } from '#/utils/array'
import { Carousel } from '#/components/Carousel'
import { Section } from '#/components/sections/Section'
import { ContentWidget } from '#/components/widgets/ContentWidget'
import { CashFlowOverTimeLineChart } from '#/components/charts/line-charts/CashFlowOverTimeLineChart'
import { CustomPieChartWithIconLabels } from '#/components/charts/pie-charts/CustomPieChartWithIconLabels'
import { ChartWrapper } from '#/components/charts/ChartWrapper'
import { formatPeriodNameForUI } from '#/utils/formatting'

// The Reflect page Cash Flow section
// Displays two pie charts - one breakin expenses by category and one breaking income by category
export default function CashFlowSection() {
  const { chartData } = useRouteLoaderData('reflect')
  const {
    userData: { currency: userCurrency },
  } = useRouteLoaderData('app')

  const { isMobileS, isMobileM } = useBreakpoint()
  const { isSingleColLayout } = useLayout()

  const pieChartItems = [
    {
      transactionType: 'expenses',
      iconName: 'arrow-trend-down',
      chartData: chartData.expensesByCategory,
      hasSufficientData: isArrayTruthy(chartData.expensesByCategory),
    },
    {
      transactionType: 'income',
      iconName: 'arrow-trend-up',
      chartData: chartData.incomeByCategory,
      hasSufficientData: isArrayTruthy(chartData.incomeByCategory),
    },
  ]

  const pieChartElements = pieChartItems.map(
    ({ transactionType, chartData, ...item }, index) => (
      <ChartWrapper
        key={`chartWrapper-${index}`}
        title={`${transactionType} by category`}
        {...item}
      >
        <CustomPieChartWithIconLabels
          size={isMobileS ? 's' : isMobileM ? 'm' : 'l'}
          entity="category"
          data={chartData}
        />
      </ChartWrapper>
    ),
  )

  return (
    <Section
      title="Cash Flow"
      subtitle={formatPeriodNameForUI(PERIODS.DEFAULT_PERIOD)}
      contentClassName={cn(
        'grid gap-x-16 gap-y-12',
        !isSingleColLayout && 'grid-cols-2',
      )}
      className="mt-12"
    >
      {isSingleColLayout ? (
        <Carousel items={pieChartElements} />
      ) : (
        pieChartElements
      )}

      <ContentWidget
        iconName="line-chart"
        title="over time"
        content={{
          className: isSingleColLayout ? 'h-56' : 'h-72',
          props: { 'data-actionable': true },
        }}
        className={cn(!isSingleColLayout && 'col-span-2')}
      >
        <CashFlowOverTimeLineChart
          data={chartData.cashFlowOverTime}
          currency={userCurrency}
        />
      </ContentWidget>
    </Section>
  )
}

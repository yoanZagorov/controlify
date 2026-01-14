import { useRouteLoaderData } from 'react-router'
import cn from 'classnames'

import { PERIODS } from '#/constants'
import { useLayout } from '#/hooks'
import { formatPeriodNameForUI } from '#/utils/formatting'
import { performDecimalCalculation } from '#/utils/number'
import { Carousel } from '#/components/Carousel'
import { Section } from '#/components/sections/Section'
import { ContentWidget } from '#/components/widgets/ContentWidget'
import { BalanceOverTimeLineChart } from '#/components/charts/line-charts/BalanceOverTimeLineChart'
import { BalanceWidget } from '#/components/widgets/BalanceWidget'

// The Balance Section for the Wallet Overview page
// Displays the current balance, the balance before the start of the specified period and a line chart for the period
export default function BalanceSection() {
  const { isSingleColLayout } = useLayout()
  const {
    wallet: { balance, currency },
    openingBalance,
    chartData,
  } = useRouteLoaderData('wallet')

  const balanceChange = performDecimalCalculation(balance, openingBalance, '-')

  const elements = [
    <BalanceWidget
      key="balancWidget-1"
      iconName="scale"
      title="current"
      amount={balance}
      currency={currency}
      balanceChange={balanceChange}
      className="h-full"
    />,
    <BalanceWidget
      key="balanceWidget-2"
      iconName="history"
      title="30 days ago" // To do: avoid hard coding this value and get it from the period
      amount={openingBalance}
      currency={currency}
      className="h-full"
    />,
  ]

  return (
    <Section
      title="Wallet Balance"
      subtitle="Trends"
      contentClassName={cn(
        'grid gap-y-6 gap-x-16',
        isSingleColLayout ? 'grid-cols-1' : 'grid-cols-3',
      )}
    >
      {isSingleColLayout ? (
        <Carousel items={elements} />
      ) : (
        <div className="flex flex-col justify-between gap-10">{elements}</div>
      )}

      <ContentWidget
        iconName="calendar-months"
        title={formatPeriodNameForUI(PERIODS.DEFAULT_PERIOD)}
        content={{ className: 'h-52', props: { 'data-actionable': true } }}
        className={cn(!isSingleColLayout && 'col-span-2')}
      >
        <BalanceOverTimeLineChart
          data={chartData.balanceOverTime}
          lineDataKey="accumulatedBalance"
          currency={currency}
        />
      </ContentWidget>
    </Section>
  )
}

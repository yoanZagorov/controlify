import { performDecimalCalculation } from "@/utils/number";

import { Carousel } from "@/components/Carousel";

import { Section } from "@/components/sections/Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { BalanceLineChart } from "@/components/charts/BalanceLineChart";
import { BalanceAmountWidget } from "@/components/sections/BalanceSection/components/BalanceAmountWidget";

export default function BalanceSection({ section, isSpaceLimited, balance, currency }) {
  const balanceChange = performDecimalCalculation(balance.amount.current, balance.amount.prev, "-");

  const elements = [
    <BalanceAmountWidget
      iconName="scale"
      title="current"
      amount={balance.amount.current}
      currency={currency}
      balanceChange={balanceChange}
    />,
    <BalanceAmountWidget
      iconName="history"
      title="30 days ago"
      amount={balance.amount.prev}
      currency={currency}
    />
  ]

  return (
    <Section
      title="Wallet Balance"
      subtitle="Trends"
      contentClassName="flex flex-col gap-6"
    >
      {isSpaceLimited ? (
        <Carousel items={elements} />
      ) : elements}

      <ContentWidget iconName="calendar-months" title="last 30 days" content={{ className: "h-56" }} >
        <BalanceLineChart data={balance.chartData} lineDataKey="accumulatedBalance" currency={currency} />
      </ContentWidget>
    </Section>
  )
}

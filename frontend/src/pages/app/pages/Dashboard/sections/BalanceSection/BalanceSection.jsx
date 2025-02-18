import { Section } from "@/components/sections/Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { BalanceOverTimeLineChart } from "@/components/charts/line-charts/BalanceOverTimeLineChart";
import { BalanceAmountWidget } from "@/components/widgets/BalanceAmountWidget";

export default function BalanceSection({ sectionClassName, balance, currency }) {
  return (
    <Section
      title="Balance"
      className={sectionClassName}
      contentClassName="flex flex-col gap-6"
    >
      <BalanceAmountWidget
        iconName="scale"
        title="current"
        amount={balance.amount}
        currency={currency}
      />

      <ContentWidget iconName="calendar-months" title="last 30 days" content={{ className: "h-56", props: { "data-actionable": true } }} >
        <BalanceOverTimeLineChart data={balance.chartData} lineDataKey="accumulatedBalance" currency={currency} />
      </ContentWidget>
    </Section >
  )
}

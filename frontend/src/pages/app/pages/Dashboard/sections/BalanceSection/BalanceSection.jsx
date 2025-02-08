import { Section } from "@/components/sections/Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { BalanceLineChart } from "@/components/charts/BalanceLineChart";
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

      <ContentWidget iconName="calendar-months" title="last 30 days" content={{ className: "h-56" }} >
        <BalanceLineChart data={balance.chartData} lineDataKey="accumulatedBalance" currency={currency} />
      </ContentWidget>
    </Section>
  )
}

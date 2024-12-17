import cn from "classnames";

import { Section } from "@/components/sections/Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { BalanceLineChart } from "@/components/charts/BalanceLineChart";
import { BalanceAmountWidget } from "@/components/sections/BalanceSection/components/BalanceAmountWidget";

export default function BalanceSection({ section, balance, currency }) {
  const classes = {
    sectionContent: cn(
      "flex flex-col gap-6",
      section.contentClassName
    )
  }

  return (
    <Section
      title="Balance"
      className={cn(section.className)}
      contentClassName={classes.sectionContent}
    >
      <BalanceAmountWidget
        iconName="scale"
        title="current"
        amount={balance.amount.current}
        currency={currency}
      />

      <ContentWidget iconName="calendar-months" title="last 30 days" content={{ className: "h-56" }} >
        <BalanceLineChart data={balance.chartData} currency={currency} />
      </ContentWidget>
    </Section>
  )
}

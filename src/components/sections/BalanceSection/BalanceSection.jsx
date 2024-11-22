import cn from "classnames";
import { Section } from "../Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { Amount } from "@/components/Amount";
import { BalanceLineChart } from "@/components/charts/BalanceLineChart";

export default function BalanceSection({ section, balance, currency }) {
  const sectionProps = { title: "Balance", ...section };

  const classes = {
    sectionContent: cn(
      "flex flex-col gap-6",
      sectionProps.contentClassName
    )
  }

  return (
    <Section
      title={sectionProps.title}
      className={sectionProps.className ? sectionProps.className : ""}
      contentClassName={classes.sectionContent}
    >
      <ContentWidget
        iconName="scale"
        title="current"
        content={{ hasBackground: false, className: "mt-2" }}
      >
        <Amount
          amount={balance.amount}
          currency={currency}
          colorContext="light"
          className="text-2xl font-bold"
        />
      </ContentWidget>

      <ContentWidget iconName="calendar-months" title="last 30 days" content={{ className: "h-56" }} >
        <BalanceLineChart data={balance.chartData} currency={currency} />
      </ContentWidget>
    </Section>
  )
}

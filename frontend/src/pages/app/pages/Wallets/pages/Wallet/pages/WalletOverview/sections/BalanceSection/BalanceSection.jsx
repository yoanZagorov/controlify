import { performDecimalCalculation } from "@/utils/number";

import { Carousel } from "@/components/Carousel";

import { Section } from "@/components/sections/Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { BalanceOverTimeLineChart } from "@/components/charts/line-charts/BalanceOverTimeLineChart";
import { BalanceAmountWidget } from "@/components/widgets/BalanceAmountWidget";
import cn from "classnames";
import { useLayout } from "@/hooks";
import { useRouteLoaderData } from "react-router";

// Passing isSingleColLayout to reduce hook calls
export default function BalanceSection() {
  const DEFAULT_PERIOD = "Last 30 Days"; // To do (Non-MVP): Change this to a state variable so filtering can be implemented

  const { isSingleColLayout } = useLayout();
  const { wallet: { balance, currency }, openingBalance, chartData } = useRouteLoaderData("wallet");

  const balanceChange = performDecimalCalculation(balance, openingBalance, "-");

  const elements = [
    <BalanceAmountWidget
      iconName="scale"
      title="current"
      amount={balance}
      currency={currency}
      balanceChange={balanceChange}
      className="h-full"
    />,
    <BalanceAmountWidget
      iconName="history"
      title="30 days ago"
      amount={openingBalance}
      currency={currency}
      className="h-full"
    />
  ]

  return (
    <Section
      title="Wallet Balance"
      subtitle="Trends"
      contentClassName={cn("grid gap-y-6 gap-x-16", isSingleColLayout ? "grid-cols-1" : "grid-cols-3")}
    >
      {isSingleColLayout ? (
        <Carousel items={elements} />
      ) : (
        <div className="flex flex-col justify-between gap-10">
          {elements}
        </div>
      )}

      <ContentWidget iconName="calendar-months" title={DEFAULT_PERIOD} content={{ className: "h-52" }} className={cn(!isSingleColLayout && "col-span-2")} >
        <BalanceOverTimeLineChart data={chartData.balanceOverTime} lineDataKey="accumulatedBalance" currency={currency} />
      </ContentWidget>
    </Section>
  )
}

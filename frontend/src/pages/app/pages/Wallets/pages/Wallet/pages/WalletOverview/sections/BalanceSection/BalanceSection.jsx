import { performDecimalCalculation } from "@/utils/number";

import { Carousel } from "@/components/Carousel";

import { Section } from "@/components/sections/Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { BalanceLineChart } from "@/components/charts/BalanceLineChart";
import { BalanceAmountWidget } from "@/components/sections/BalanceSection/components/BalanceAmountWidget";

export default function BalanceSection({ section, isSpaceLimited, balance, currency }) {
  const balanceChange = performDecimalCalculation(balance.amount.current, balance.amount.prev, "-");

  return (
    <Section
      title="Wallet Balance"
      subtitle="Trends"
      contentClassName="flex flex-col gap-6"
    >
      {isSpaceLimited ? (
        <Carousel
          items={[
            {
              component:
                <BalanceAmountWidget
                  iconName="scale"
                  title="current"
                  amount={balance.amount.current}
                  currency={currency}
                  balanceChange={balanceChange}
                />
            },
            {
              component:
                <BalanceAmountWidget
                  iconName="history"
                  title="30 days ago"
                  amount={balance.amount.prev}
                  currency={currency}
                />
            }
          ]}
        />
      ) : (
        <div className="flex gap-6">
          <BalanceAmountWidget
            iconName="scale"
            title="current"
            amount={balance.amount.current}
            currency={currency}
            balanceChange={balanceChange}
            className="w-full"
          />

          <BalanceAmountWidget
            iconName="history"
            title="30 days ago"
            amount={balance.amount.prev}
            currency={currency}
            className="w-full"
          />
        </div>
      )}

      <ContentWidget iconName="calendar-months" title="last 30 days" content={{ className: "h-56" }} >
        <BalanceLineChart data={balance.chartData} currency={currency} />
      </ContentWidget>
    </Section>
  )
}

import cn from "classnames";
import { Section } from "../Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { Amount } from "@/components/Amount";
import { BalanceLineChart } from "@/components/charts/BalanceLineChart";
import { BalanceAmountWidget } from "./components/BalanceAmountWidget";
import { performDecimalCalculation } from "@/utils/number";
import { Carousel } from "@/components/Carousel";

export default function BalanceSection({ section, showsPreviousBalance = false, isSpaceLimited, balance, currency }) {
  const sectionProps = { title: "Balance", ...section };
  const balanceProps = { amountWidgetType: "single", ...balance };

  const balanceChange = showsPreviousBalance
    ? performDecimalCalculation(balance.amount.current, balance.amount.prev, "-")
    : null;

  const classes = {
    sectionContent: cn(
      "flex flex-col gap-6",
      sectionProps.contentClassName
    )
  }

  return (
    <Section
      title={sectionProps.title}
      className={cn(sectionProps.className)}
      contentClassName={classes.sectionContent}
    >
      {showsPreviousBalance ?
        isSpaceLimited ? (
          <Carousel
            items={
              [
                {
                  name: "widgetOne",
                  component:
                    <BalanceAmountWidget
                      iconName="scale"
                      title="current"
                      amount={balanceProps.amount.current}
                      currency={currency}
                      balanceChange={balanceChange}
                    />
                },
                {
                  name: "widgetTwo",
                  component:
                    <BalanceAmountWidget
                      iconName="history"
                      title="30 days ago"
                      amount={balanceProps.amount.prev}
                      currency={currency}
                    />
                }
              ]
            }
          />
        ) : (
          <div className="flex gap-6">
            <BalanceAmountWidget
              iconName="scale"
              title="current"
              amount={balanceProps.amount.current}
              currency={currency}
              balanceChange={balanceChange}
              className="w-full"
            />

            <BalanceAmountWidget
              iconName="history"
              title="30 days ago"
              amount={balanceProps.amount.prev}
              currency={currency}
              className="w-full"
            />
          </div>
        ) : (
          <BalanceAmountWidget
            iconName="scale"
            title="current"
            amount={balanceProps.amount.current}
            currency={currency}
          />
        )
      }

      <ContentWidget iconName="calendar-months" title="last 30 days" content={{ className: "h-56" }} >
        <BalanceLineChart data={balanceProps.chartData} currency={currency} />
      </ContentWidget>
    </Section >
  )
}

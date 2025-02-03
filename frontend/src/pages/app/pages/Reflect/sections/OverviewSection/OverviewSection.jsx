import { Amount } from "@/components/Amount";
import { Carousel } from "@/components/Carousel";
import { FinancialScoreGaugeChart } from "@/components/charts/FinancialScoreGaugeChart";
import { WaterfallChart } from "@/components/charts/WaterfallChart";
import { Section } from "@/components/sections/Section";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { HeaderContentWidget } from "@/components/widgets/HeaderContentWidget";
import { useLayout } from "@/hooks";
import cn from "classnames";
import { useRouteLoaderData } from "react-router";


export default function OverviewSection({ className }) {
  const RED = "#CC0000";
  const YELLOW = "#DAA520";
  const GREEN = "#008000";

  const { userData: { balance, currency: userCurrency } } = useRouteLoaderData("app");
  const { financialScore, chartData } = useRouteLoaderData("reflect");
  const isFinancialScorePoor = financialScore <= 33;
  const isFinancialScoreStable = financialScore > 33 && financialScore <= 66;

  const { isSingleColLayout } = useLayout();
  const period = "Last 30 Days";

  // Using an array to avoid repetition when passing the components to the Carousel 
  const elements = [
    <HeaderContentWidget
      contentWidget={{
        props: {
          iconName: "gauge",
          title: "financial score"
        },
        content: (
          <span
            className="text-xl font-bold"
            style={{
              color:
                isFinancialScorePoor ? RED
                  : isFinancialScoreStable ? YELLOW
                    : GREEN
            }}
          >
            {financialScore}
          </span>
        )
      }}
      widgetContent={
        <div className={`p-4 bg-gray-light rounded-md ${isSingleColLayout ? "h-48" : "h-64"}`}>
          <FinancialScoreGaugeChart financialScore={financialScore} />
        </div>
      }
      className="col-span-1"
    />,
    <HeaderContentWidget
      contentWidget={{
        props: {
          iconName: "scale",
          title: "balance"
        },
        content: (
          <Amount
            amount={balance}
            currency={userCurrency}
            colorContext="light"
            className="text-xl font-bold"
          />
        )
      }}
      widgetContent={
        <div className={`p-4 bg-gray-light rounded-md ${isSingleColLayout ? "h-48" : "h-64"}`}>
          <WaterfallChart data={chartData.balanceOverTime} currency={userCurrency} />
        </div>
      }
      className="col-span-2"
    />
  ]

  return (
    <Section
      title="Overview"
      subtitle={period}
      className={className}
    >
      {isSingleColLayout ? (
        <Carousel items={elements} />
      ) : (
        <div className="grid gap-12 grid-cols-3">
          {elements}
        </div>
      )}
    </Section>
  )
}
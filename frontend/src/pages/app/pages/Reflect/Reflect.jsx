import { FinancialScoreGaugeChart } from "@/components/charts/FinancialScoreGaugeChart";
import { SectionWrapper } from "./sections/SectionWrapper";
import { WaterfallChart } from "@/components/charts/WaterfallChart";
import { useLoaderData, useRouteLoaderData } from "react-router";
import { useBreakpoint, useLayout } from "@/hooks";
import { Amount } from "@/components/Amount";

export default function Reflect() {
  const RED = "#CC0000";
  const YELLOW = "#DAA520";
  const GREEN = "#008000";
  /**
   Components:
   Section Wrapper - an individual section
    Section Item  - an individual item
   **/
  const { isMobileS, isMobileM } = useBreakpoint();
  const { isSingleColLayout } = useLayout();

  const period = "Last 30 Days";

  const { financialScore, balanceChartData } = useLoaderData();
  const { userData: { currency: userCurrency, balance } } = useRouteLoaderData("app");

  const isFinancialScorePoor = financialScore <= 33;
  const isFinancialScoreStable = financialScore > 33 && financialScore <= 66;

  return (
    <div>
      <SectionWrapper
        variant="headered"
        sectionProps={{
          title: "Overview"
        }}
        items={[
          {
            iconName: "gauge",
            title: "financial score",
            headerContent: (
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
            ),
            ChartComponent: (
              <FinancialScoreGaugeChart financialScore={financialScore} />
            ),
            className: "col-span-1"
          },
          {
            iconName: "scale",
            title: "balance",
            headerContent: (
              <Amount
                amount={balance}
                currency={userCurrency}
                colorContext="light"
                className="text-xl font-bold"
              />
            ),
            ChartComponent: (
              <WaterfallChart data={balanceChartData} currency={userCurrency} />
            ),
            className: "col-span-2"
          }
        ]}
      />
    </div>
  )
}
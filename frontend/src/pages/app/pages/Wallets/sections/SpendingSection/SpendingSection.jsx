import cn from "classnames";

import { PERIODS } from "@/constants";

import { useBreakpoint } from "@/hooks";
import { formatPeriodNameForUI } from "@/utils/formatting";

import { ContentWidget } from "@/components/widgets/ContentWidget";
import { Section } from "@/components/sections/Section";
import { Notification } from "@/components/Notification";
import { CustomPieChartWithIconLabels } from "@/components/charts/pie-charts/CustomPieChartWithIconLabels";

// The Spending Section for the Wallets page
export default function SpendingSection({ sectionProps, chart }) {
  const { isMobileS, isMobileM } = useBreakpoint();
  // Ensure there is at least one wallet with some expenses
  const hasSufficientData = chart.data.find(entry => entry.amount > 0) ? true : false;

  return (
    <Section
      title="Wallets Spending"
      subtitle={formatPeriodNameForUI(PERIODS.DEFAULT_PERIOD)}
      className={cn(sectionProps.className)}
    >
      <ContentWidget iconName="wallet" title="by wallet">
        {hasSufficientData ? (
          <div className="mx-auto h-[400px]">
            <CustomPieChartWithIconLabels entity="wallet" size={isMobileS ? "s" : isMobileM ? "m" : "l"} data={chart.data} />
          </div>
        ) : (
          <Notification className="max-w-64 mx-auto">
            Not enough data available to create the chart yet. Add a few transactions to get started!
          </Notification>
        )}
      </ContentWidget>
    </Section>
  )
}

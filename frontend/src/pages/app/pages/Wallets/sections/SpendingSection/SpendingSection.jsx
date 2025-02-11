import { ContentWidget } from "@/components/widgets/ContentWidget";
import { Section } from "@/components/sections/Section";
import { Notification } from "@/components/Notification";
import cn from "classnames";
import { CustomPieChartWithIconLabels } from "@/components/charts/pie-charts/CustomPieChartWithIconLabels";
import { useBreakpoint } from "@/hooks";

export default function SpendingSection({ sectionProps, chart }) {
  const DEFAULT_PERIOD = "Last 30 Days"; // To do (Non-MVP): Change this to a state variable so filtering can be implemented

  // Ensure there is at least one wallet with some expenses
  const { isMobileS, isMobileM } = useBreakpoint();
  const hasSufficientData = chart.data.find(entry => entry.amount > 0) ? true : false;

  return (
    <Section
      title="Wallets Spending"
      subtitle={DEFAULT_PERIOD}
      className={cn(sectionProps.className)}
    >
      <ContentWidget iconName="wallet" title="by wallet">
        {hasSufficientData ? (
          <div className="mx-auto h-96">
            <CustomPieChartWithIconLabels entity="wallet" size={isMobileS ? "s" : isMobileM ? "m" : "l"} data={chart.data} />
          </div>
        ) : (
          <Notification className="max-w-64 mx-auto">
            Not enough data available to create the chart yet. Add a few transactions to get started!
          </Notification>
        )
        }
      </ContentWidget>
    </Section>
  )
}

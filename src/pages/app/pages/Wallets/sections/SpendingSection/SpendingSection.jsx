import { ContentWidget } from "@/components/widgets/ContentWidget";
import { Section } from "@/components/sections/Section";
import { CustomPieChart } from "@/components/charts/CustomPieChart";
import { Notification } from "@/components/Notification";

export default function SpendingSection({ section, chart }) {
  const hasSufficientData = chart.data.find(entry => entry.amount > 0) ? true : false;

  return (
    <Section
      title="Wallets Spending"
      subtitle="Last 30 Days"
      className={section.className}
    >
      <ContentWidget iconName="wallet" title="by wallet" className="w-full">
        {hasSufficientData ? (
          <div className="mx-auto h-72 mm:h-96">
            <CustomPieChart type={chart.type} data={chart.data} />
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

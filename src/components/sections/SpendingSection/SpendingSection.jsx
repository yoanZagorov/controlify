import { ContentWidget } from "@/components/widgets/ContentWidget";
import { Section } from "../Section";
import { CustomPieChart } from "@/components/charts/CustomPieChart";
import { Widget } from "@/components/widgets/Widget";
import { Notification } from "@/components/Notification";

export default function SpendingSection({ section, widget, chart }) {
  const hasExpenses = chart.type === "expensesByWallet"
    ? chart.data.find(entry => entry !== null)
    : chart.data.length ? true : false;

  return (
    <Section
      title={section.title}
      subtitle={section.subtitle}
      className={section.className}
      contentClassName="mt-3"
    >
      {hasExpenses ? (
        <ContentWidget iconName={widget.iconName} title={widget.title}>
          <div className="mx-auto h-80 mm:h-[420px]">
            <CustomPieChart
              type={chart.type}
              data={chart.data}
            />
          </div>
        </ContentWidget>
      ) : (
        <Widget>
          <Notification className="max-w-64 mx-auto">
            Not enough data available to create the chart yet. Add a few transactions to get started!
          </Notification>
        </Widget>
      )}
    </Section>
  )
}

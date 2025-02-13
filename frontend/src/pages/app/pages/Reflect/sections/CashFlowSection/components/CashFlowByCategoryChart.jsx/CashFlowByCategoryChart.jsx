import { CustomPieChartWithIconLabels } from "@/components/charts/pie-charts/CustomPieChartWithIconLabels";
import { ContentWidget } from "@/components/widgets/ContentWidget";

export default function CashFlowByCategoryChart({ iconName, transactionType, chartData }) {
  return (
    <ContentWidget
      iconName={iconName}
      title={`${transactionType} by category`}
      content={{
        className: "h-[450px]"
      }}
      className="w-full"
    >
      <CustomPieChartWithIconLabels entity="category" data={chartData} />
    </ContentWidget>
  )
}
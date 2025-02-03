import { CustomPieChart } from "@/components/charts/CustomPieChart";
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
      <CustomPieChart type="byCategory" data={chartData} />
    </ContentWidget>
  )
}
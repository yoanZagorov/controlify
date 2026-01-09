import { CustomPieChartWithIconLabels } from '#components/charts/pie-charts/CustomPieChartWithIconLabels'
import { Notification } from '#components/Notification'
import { ContentWidget } from '#components/widgets/ContentWidget'

export default function CashFlowByCategoryChart({
  iconName,
  transactionType,
  hasSufficientData,
  chartSize,
  chartData,
}) {
  return (
    <ContentWidget
      iconName={iconName}
      title={`${transactionType} by category`}
      content={{
        className: 'flex justify-center items-center h-[450px]',
      }}
      className="w-full"
    >
      {hasSufficientData ? (
        <CustomPieChartWithIconLabels
          size={chartSize}
          entity="category"
          data={chartData}
        />
      ) : (
        <Notification className="max-w-64">
          Not enough data available to create the chart yet. Add a few
          transactions to get started!
        </Notification>
      )}
    </ContentWidget>
  )
}

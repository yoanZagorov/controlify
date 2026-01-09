import { Notification } from "#components/Notification";
import { ContentWidget } from "#components/widgets/ContentWidget";

export default function ChartWrapper({ iconName, title, height = "h-[450px]", hasSufficientData, children }) {
  return (
    <ContentWidget
      iconName={iconName}
      title={title}
      content={{ className: `flex justify-center items-center ${height}` }}
      className="w-full"
    >
      {hasSufficientData ?
        children // the chart itself
        : (
          <Notification className="max-w-64 mx-auto">
            Not enough data available to create the chart yet. Add a few transactions to get started!
          </Notification>
        )
      }
    </ContentWidget>
  )
}
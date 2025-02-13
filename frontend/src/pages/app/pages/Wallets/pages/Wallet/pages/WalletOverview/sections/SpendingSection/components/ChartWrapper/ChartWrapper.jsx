import { Notification } from "@/components/Notification";
import { ContentWidget } from "@/components/widgets/ContentWidget";

export default function ChartWrapper({ iconName, title, hasSufficientData, children }) {
  return (
    <ContentWidget iconName={iconName} title={title} className="w-full">
      {hasSufficientData ? (
        <div className="h-[450px]">
          {children}
        </div>
      ) : (
        <Notification className="max-w-64 mx-auto">
          Not enough data available to create the chart yet. Add a few transactions to get started!
        </Notification>
      )
      }
    </ContentWidget>
  )
}
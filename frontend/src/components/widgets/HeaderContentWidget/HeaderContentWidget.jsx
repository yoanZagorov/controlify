import cn from "classnames";
import { ContentWidget } from "../ContentWidget";
import { Widget } from "../Widget";

export default function HeaderContentWidget({ contentWidget, widgetContent, className }) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <ContentWidget
        {...contentWidget.props}
        content={{
          hasBackground: false,
          ...contentWidget.props.content
        }}
      >
        {contentWidget.content}
      </ContentWidget >
      <Widget>
        {widgetContent}
      </Widget>
    </div>
  )
}
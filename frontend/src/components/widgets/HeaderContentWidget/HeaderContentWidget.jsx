import cn from 'classnames'
import { ContentWidget } from '../ContentWidget'
import { Widget } from '../Widget'

// The header widget states the information and the body widget provides a visual display. Used for thinks like balance visualization
// It gives more fine-grain control over the distribution of the widgets on the page
export default function HeaderContentWidget({
  contentWidget,
  widgetContent,
  className,
}) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <ContentWidget
        {...contentWidget.props}
        content={{
          hasBackground: false,
          ...contentWidget.props.content,
        }}
      >
        {contentWidget.content}
      </ContentWidget>
      <Widget>{widgetContent}</Widget>
    </div>
  )
}

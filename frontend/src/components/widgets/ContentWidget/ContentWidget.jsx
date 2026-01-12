import cn from 'classnames'
import { SvgIcon } from '#/components/SvgIcon'
import { Widget } from '#/components/widgets/Widget'

// A widget with a title and an icon. Used a lot throughout the app
// If the content.hasBackground is true, it provides a structured area to show the content. Else, it gives more freedom to the consumer
export default function ContentWidget({
  iconName,
  title,
  className,
  content = {},
  children,
}) {
  const contentConfig = { hasBackground: true, ...content }

  return (
    <Widget className={cn('flex flex-col', className)}>
      <SvgIcon iconName={iconName} className="size-5 fill-gray-dark" />
      <span className="mt-2 uppercase text-sm text-gray-dark opacity-50 font-semibold">
        {title}
      </span>

      <div
        className={cn(
          contentConfig.hasBackground && 'mt-4 p-3 rounded-lg bg-gray-light',
          contentConfig.className,
        )}
        {...contentConfig.props}
      >
        {children}
      </div>
    </Widget>
  )
}

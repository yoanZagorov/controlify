import cn from 'classnames'
import { formatDateLong } from '#/utils/date'
import { SvgIcon } from '#/components/SvgIcon'

export default function SelectedDay({ date, iconName, className }) {
  const formattedDate = formatDateLong(date)

  return (
    <div
      className={cn(
        'flex items-end gap-4 rounded-lg bg-gray-light p-3',
        className,
      )}
    >
      <SvgIcon
        iconName={iconName || 'calendar'}
        className="size-5 fill-gray-dark"
      />
      <time className="text-sm font-semibold text-gray-dark">
        {formattedDate}
      </time>
    </div>
  )
}

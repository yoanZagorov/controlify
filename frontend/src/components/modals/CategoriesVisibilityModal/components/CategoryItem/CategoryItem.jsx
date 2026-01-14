import cn from 'classnames'

import { formatEntityNameForUI } from '#/utils/formatting'
import { SvgIcon } from '#/components/SvgIcon'

// To do: give the ability to edit the categories
export default function CategoryItem({
  category: { id, iconName, name, isVisible, color },
  handleVisibilityToggle,
}) {
  const btnClasses = cn(
    'ml-auto relative size-5',
    isVisible ? 'opacity-100' : 'opacity-50',
  )

  return (
    <div className="flex items-center gap-4">
      <div
        className="flex size-8 items-center justify-center rounded-full"
        style={{ backgroundColor: color }}
      >
        <SvgIcon iconName={iconName} className="size-1/2 fill-gray-light" />
      </div>
      <span className="text-sm font-semibold text-gray-dark">
        {formatEntityNameForUI(name)}
      </span>

      <button
        type="button"
        className={btnClasses}
        onClick={() => handleVisibilityToggle(id)}
      >
        <SvgIcon iconName="eye" className="size-full fill-gray-dark" />
        {!isVisible && (
          <div className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-gray-dark"></div>
        )}
      </button>
    </div>
  )
}

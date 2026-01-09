import cn from 'classnames'
import { capitalizeEveryWord } from '#utils/str'

// A wrapper around presentational modals which are used for selection
export default function SelectModal({
  type = 'fullScreen',
  name,
  contentMaxWidth = 'max-w-none',
  children,
}) {
  const modalClassName = cn(
    'flex-1 w-full p-4 border-t border-gray-dark rounded-t-lg ml:rounded-lg bg-gray-medium overflow-auto', // Handle overflow here, so the "rubber band" iOS effect can look better
    type === 'fullScreen' && 'border-t ml:border',
  )

  return (
    <div className={modalClassName}>
      <div className={`mx-auto ${contentMaxWidth}`}>
        <span className="text-gray-dark font-semibold">
          Select {capitalizeEveryWord(name)}
        </span>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}

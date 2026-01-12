import cn from 'classnames'
import { SvgIcon } from '#/components/SvgIcon'

export default function SlideButton({ disabled, handleClick, iconName }) {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={cn(disabled && 'opacity-50')}
      data-actionable={true} // Used to not mess with useOutsideClick hook (see the docs for more info)
    >
      <SvgIcon iconName={iconName} className="size-5 fill-gray-dark" />
    </button>
  )
}

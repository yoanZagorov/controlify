import { useRef } from 'react'
import { SvgIcon } from '#/components/SvgIcon'
import { useAutoFocus } from '#/hooks'

// Color selection
export default function ColorModal({
  colors,
  colorBrightness = 'dark',
  closeModal,
  state,
}) {
  const activeColorBtnRef = useRef(null)
  useAutoFocus({ ref: activeColorBtnRef })

  function handleClick(color) {
    state.updateState(color)
    closeModal()
  }

  const colorsEls = colors.map((color) => {
    const isActive = color === state.value

    return (
      <li key={color}>
        <button
          ref={isActive ? activeColorBtnRef : null}
          type="button"
          onClick={() => handleClick(color)}
          className={`relative size-12 rounded-full ${colorBrightness === 'bright' ? 'focus-gray-dark' : 'focus-goldenrod'}`}
          style={{ backgroundColor: color }}
        >
          {isActive && (
            <div className="absolute bottom-0 right-0 flex size-4 items-center justify-center rounded-full border-2 border-gray-dark bg-gray-light">
              <SvgIcon iconName="check" className="size-2.5 fill-green-dark" />
            </div>
          )}
        </button>
      </li>
    )
  })

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fit,48px)] items-center justify-between gap-x-10 gap-y-6">
        {colorsEls}
      </ul>
    </>
  )
}

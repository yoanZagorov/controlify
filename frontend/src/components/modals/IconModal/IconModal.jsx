import { useRef } from 'react'

import { SvgIcon } from '#/components/SvgIcon'
import { useAutoFocus } from '#/hooks'

// Icon selection
export default function IconModal({ iconNames, closeModal, state }) {
  const activeIconBtnRef = useRef(null)
  useAutoFocus({ ref: activeIconBtnRef })

  function handleClick(iconName) {
    state.updateState(iconName)
    closeModal()
  }

  const iconNamesEls = iconNames.map((iconName) => {
    const isActive = iconName === state.value

    return (
      <li key={iconName}>
        <button
          ref={isActive ? activeIconBtnRef : null}
          type="button"
          onClick={() => handleClick(iconName)}
          className="focus-goldenrod relative flex size-12 items-center justify-center rounded-full bg-gray-light"
        >
          <SvgIcon iconName={iconName} className="size-1/2 fill-gray-dark" />

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
        {iconNamesEls}
      </ul>
    </>
  )
}

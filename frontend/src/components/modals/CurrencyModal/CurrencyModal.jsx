import { useRef } from 'react'

import { useAutoFocus } from '#/hooks'
import { SvgIcon } from '#/components/SvgIcon'
import { Widget } from '#/components/widgets/Widget'

// Currency selection
export default function CurrencyModal({ closeModal, currencies, state }) {
  const activeCurrencyBtnRef = useRef(null)
  useAutoFocus({ ref: activeCurrencyBtnRef })

  function handleClick(currencyCode) {
    state.updateState(currencyCode)
    closeModal()
  }

  const currencyEls = currencies.map((currency, index) => {
    const { code, iconName } = currency
    const isActive = code === state.value

    return (
      <button
        ref={isActive ? activeCurrencyBtnRef : null}
        key={index}
        type="button"
        onClick={() => handleClick(code)}
        className="focus-goldenrod rounded-lg"
      >
        <Widget
          colorPalette="secondary"
          className="focus-goldenrod flex items-center gap-4"
        >
          <SvgIcon iconName={iconName} className="h-[30px] w-[50px]" />
          <span className="text-lg font-semibold text-gray-dark">{code}</span>

          <div className="ml-auto flex size-6 items-center justify-center rounded-full bg-navy">
            <div
              className={`size-2.5 rounded-full ${isActive ? 'bg-goldenrod' : 'bg-gray-light'}`}
            ></div>
          </div>
        </Widget>
      </button>
    )
  })

  return (
    <div className="flex flex-col gap-5">
      <SvgIcon iconName="flag-eu" className="hidden h-[30px] w-[50px]" />{' '}
      {/* need to use this to render another instance to "fix" a bizarre bug where the stars aren't showing */}
      {currencyEls}
    </div>
  )
}

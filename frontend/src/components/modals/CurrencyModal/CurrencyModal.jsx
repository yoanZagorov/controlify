import { useRef } from 'react'

import { useAutoFocus } from '#hooks'

import { SvgIcon } from '#components/SvgIcon'
import { Widget } from '#components/widgets/Widget'

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
        className="rounded-lg focus-goldenrod"
      >
        <Widget
          colorPalette="secondary"
          className="flex items-center gap-4 focus-goldenrod"
        >
          <SvgIcon iconName={iconName} className="w-[50px] h-[30px]" />
          <span className="text-lg text-gray-dark font-semibold">{code}</span>

          <div className="ml-auto flex justify-center items-center size-6 rounded-full bg-navy">
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
      <SvgIcon iconName="flag-eu" className="hidden w-[50px] h-[30px]" />{' '}
      {/* need to use this to render another instance to "fix" a bizarre bug where the stars aren't showing */}
      {currencyEls}
    </div>
  )
}

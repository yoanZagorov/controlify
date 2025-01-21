import { SvgIcon } from "@/components/SvgIcon";
import { Widget } from "@/components/widgets/Widget";

export default function ColorModal({ colors, closeModal, state }) {
  function handleClick(color) {
    state.updateState(color);
    closeModal();
  }

  const colorsEls = colors.map(color => {
    const isActive = color === state.value;

    return (
      <li key={color}>
        <button
          type="button"
          onClick={() => handleClick(color)}
          className="relative size-12 rounded-full focus-goldenrod"
          style={{ backgroundColor: color }}
        >
          {isActive &&
            <div className="absolute right-0 bottom-0 flex justify-center items-center size-4 border border-gray-dark rounded-full bg-gray-light">
              <SvgIcon iconName="check" className="size-2.5 fill-green-dark" />
            </div>
          }
        </button>
      </li>
    )
  })

  const currencies = [
    {
      name: "BGN",
      iconName: "flag-bulgaria",
    },
    {
      name: "USD",
      iconName: "flag-usa",
    },
    {
      name: "EUR",
      iconName: "flag-eu",
    },
    {
      name: "GBP",
      iconName: "flag-uk",
    },
  ]

  const currencyEls = currencies.map((currency, index) => {
    const { name, iconName } = currency;

    return (
      <button key={index} type="button" onClick={() => console.log("Hello there!")} className="rounded-lg focus-goldenrod">
        <Widget colorPalette="secondary" className="flex items-center gap-4 focus-goldenrod">
          <SvgIcon iconName={iconName} className="w-[50px] h-[30px]" />
          <span className="text-lg text-gray-dark font-semibold">{name}</span>

          <div className="ml-auto flex justify-center items-center size-6 rounded-full bg-navy">
            <div className={`size-2.5 rounded-full bg-gray-light`}></div>
          </div>
        </Widget>
      </button>
    )
  })

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fit,48px)] justify-between items-center gap-x-10 gap-y-6">
        {colorsEls}
      </ul>

      {/* {<button type="button" onClick={() => console.log("Hello there!")} className="w-full rounded-lg focus-goldenrod">
        <Widget colorPalette="secondary" className="flex items-center gap-4 focus-goldenrod"> */}
      <SvgIcon iconName="flag-eu" className="hidden w-[50px] h-[30px]" />
      {/* <span className="text-lg text-gray-dark font-semibold">EUR</span>

          <div className="ml-auto flex justify-center items-center size-6 rounded-full bg-navy">
            <div className={`size-2.5 rounded-full bg-gray-light`}></div>
          </div>
        </Widget>
      </button>} */}

      {currencyEls}
    </>
  )
}
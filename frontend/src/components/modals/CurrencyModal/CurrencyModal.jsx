import { SvgIcon } from "@/components/SvgIcon"
import { Widget } from "@/components/widgets/Widget"

export default function CurrencyModal({ closeModal, state }) {
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

  function handleClick(currencyName) {
    state.updateState(currencyName);
    closeModal();
  }

  const currencyEls = currencies.map((currency, index) => {
    const { name, iconName } = currency;
    const isActive = name === state.value;

    return (
      <button key={index} type="button" onClick={() => handleClick(name)} className="rounded-lg focus-goldenrod">
        <Widget colorPalette="secondary" className="flex items-center gap-4 focus-goldenrod">
          <SvgIcon iconName={iconName} className="w-[50px] h-[30px]" />
          <span className="text-lg text-gray-dark font-semibold">{name}</span>

          <div className="ml-auto flex justify-center items-center size-6 rounded-full bg-navy">
            <div className={`size-2.5 rounded-full ${isActive ? "bg-goldenrod" : "bg-gray-light"}`}></div>
          </div>
        </Widget>
      </button>
    )
  })

  return (
    <div className="flex flex-col gap-5">
      <SvgIcon iconName="flag-eu" className="hidden w-[50px] h-[30px]" /> {/*need to use this to render another instance to "fix" a bizarre bug where the stars aren't showing*/}
      {currencyEls}
    </div>
  )
}
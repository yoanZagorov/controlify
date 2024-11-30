import { SvgIcon } from "@/components/SvgIcon"
import { Widget } from "@/components/widgets/Widget"

export default function CurrencyModal({ closeModal, state }) {
  console.log(state);

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
      <button onClick={() => handleClick(name)}>
        <Widget key={index} colorPalette="secondary" className="flex items-center gap-4">
          <SvgIcon iconName={iconName} className="w-10 h-5" />
          <span className="text-lg text-gray-dark font-semibold">{name}</span>

          <div className="ml-auto flex justify-center items-center size-6 rounded-full bg-navy">
            <div className={`size-2.5 rounded-full ${isActive ? "bg-goldenrod" : "bg-gray-light"}`}></div>
          </div>
        </Widget>
      </button>
    )
  })

  return (
    <div className="mt-7 flex flex-col gap-5">{currencyEls}</div>
  )
}
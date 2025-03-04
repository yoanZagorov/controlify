import { SvgIcon } from "@/components/SvgIcon";

// Icon selection
export default function IconModal({ iconNames, closeModal, state }) {
  function handleClick(iconName) {
    state.updateState(iconName);
    closeModal();
  }

  const iconNamesEls = iconNames.map(iconName => {
    const isActive = iconName === state.value;

    return (
      <li key={iconName}>
        <button
          type="button"
          onClick={() => handleClick(iconName)}
          className="relative flex justify-center items-center size-12 rounded-full bg-gray-light focus-goldenrod"
        >
          <SvgIcon iconName={iconName} className="size-1/2 fill-gray-dark" />

          {isActive &&
            <div className="absolute right-0 bottom-0 flex justify-center items-center size-4 border-2 border-gray-dark rounded-full bg-gray-light">
              <SvgIcon iconName="check" className="size-2.5 fill-green-dark" />
            </div>
          }
        </button>
      </li>
    )
  })

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fit,48px)] justify-between items-center gap-x-10 gap-y-6">
        {iconNamesEls}
      </ul>
    </>
  )
}
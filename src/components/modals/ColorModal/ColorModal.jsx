import { SvgIcon } from "@/components/SvgIcon";
import cn from "classnames";

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
          className="relative size-12 rounded-full"
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

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,48px)] justify-between items-center gap-x-10 gap-y-6">
      {colorsEls}
    </ul>
  )
}
import cn from "classnames";

import { capitalize } from "@/utils/str";

export default function ToggleSwitch({ options, activeOption, handleToggle, className }) {
  const { firstOption, secondOption } = options;

  function renderOption(option) {
    const optionClasses = cn(
      options.baseOptionClasses,
      activeOption === option.name && options.baseActiveOptionClasses,
      activeOption === option.name ? option.activeClassName : option.className
    );

    return (
      <button
        type="button"
        className={optionClasses}
        onClick={handleToggle}
      >
        {capitalize(option.name)}
      </button>
    )
  }

  const toggleSwitchClasses = cn(
    "p-0.5 rounded-full flex items-center",
    className
  )

  return (
    <div className={toggleSwitchClasses}>
      {renderOption(firstOption)}
      {renderOption(secondOption)}
    </div>
  )
}

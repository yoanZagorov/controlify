import { useState } from "react"
import cn from "classnames";

import { capitalize } from "@/utils/str";

export default function ToggleSwitch({ options, state, className }) {
  const { firstOption, secondOption } = options;
  // To do: create the option for derived state to fix the bug
  const { value, updateState } = state ?? {};

  const [activeOption, setActiveOption] = [value, updateState] || useState(firstOption.name);

  function handleToggle() {
    setActiveOption(prev => prev === firstOption.name ? secondOption.name : firstOption.name);
  }

  const toggleSwitchClasses = cn(className, "p-0.5 rounded-full flex items-center")

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

  return (
    <div className={toggleSwitchClasses}>
      {renderOption(firstOption)}
      {renderOption(secondOption)}
    </div>
  )
}

import cn from "classnames";
import { useState } from "react"

export default function ToggleSwitch({ className, options, addHandleToggle }) {
  const { firstOption, secondOption } = options;
  const [activeOption, setActiveOption] = useState(firstOption.name);

  function handleToggle() {
    setActiveOption(prev => prev === firstOption.name ? secondOption.name : firstOption.name);
    addHandleToggle();
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
        {option.name}
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

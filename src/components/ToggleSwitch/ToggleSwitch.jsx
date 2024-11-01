import { useState } from "react"
import cn from "classnames";

export default function ToggleSwitch({ options, addHandleToggle, className }) {
  const { firstOption, secondOption } = options;
  const [activeOption, setActiveOption] = useState(firstOption.name);

  function handleToggle() {
    setActiveOption(prev => prev === firstOption.name ? secondOption.name : firstOption.name);
    addHandleToggle && addHandleToggle();
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

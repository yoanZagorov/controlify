import cn from "classnames";
import { capitalize } from "@/utils/str";

export default function ToggleSwitch({ options, activeOption, handleToggle, isDisabled, className }) {
  const { firstOption, secondOption } = options;

  function renderOption(option) {
    const optionClasses = cn(
      options.baseOptionClasses,
      activeOption === option.name && options.baseActiveOptionClasses,
      activeOption === option.name ? option.className.active : option.className.base
    );

    return (
      <button
        type="button"
        className={optionClasses}
        onClick={handleToggle}
        disabled={isDisabled}
      >
        {capitalize(option.name)}
      </button>
    )
  }

  const toggleSwitchClasses = cn(
    "p-1 rounded-full flex items-center",
    isDisabled && "opacity-50",
    className
  )

  return (
    <div className={toggleSwitchClasses} data-actionable={true}>
      {renderOption(firstOption)}
      {renderOption(secondOption)}
    </div>
  )
}

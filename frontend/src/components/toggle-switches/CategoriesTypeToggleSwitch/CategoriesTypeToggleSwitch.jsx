import cn from "classnames";
import { ToggleSwitch } from "../ToggleSwitch";

export default function CategoriesTypeToggleSwitch({ activeOption, handleToggle, isToggleSwitchDisabled, className }) {
  const toggleSwitchOptions = {
    firstOption: {
      name: "expense",
      className: {
        base: "text-red-dark",
        active: "text-red-light"
      }
    },
    secondOption: {
      name: "income",
      className: {
        base: "text-green-dark",
        active: "text-green-light"
      }
    },
    baseOptionClasses: "w-1/2 rounded-full py-1 px-3 text-center font-medium focus-visible-goldenrod",
    baseActiveOptionClasses: "bg-navy"
  }

  return (
    <ToggleSwitch
      options={toggleSwitchOptions}
      activeOption={activeOption}
      handleToggle={handleToggle}
      isDisabled={isToggleSwitchDisabled}
      className={cn("border border-gray-dark bg-gray-light", className)}
    />
  )
}
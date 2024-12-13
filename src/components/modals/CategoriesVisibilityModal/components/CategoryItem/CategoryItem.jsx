// To do: give the ability to edit the categories

import { SvgIcon } from "@/components/SvgIcon";
import { formatEntityName } from "@/utils/formatting";
import { capitalize } from "@/utils/str";
import cn from "classnames";

export default function CategoryItem({ category, handleVisibilityToggle }) {
  const { iconName, name, isVisible, color } = category;

  const btnClasses = cn(
    "ml-auto relative size-5",
    isVisible ? "opacity-100" : "opacity-50"
  )

  return (
    <div className="flex items-center gap-4">
      <div className="flex justify-center items-center rounded-full size-8" style={{ backgroundColor: color }}>
        <SvgIcon iconName={iconName} className="size-1/2 fill-gray-light" />
      </div>
      <span className="text-sm text-gray-dark font-semibold">{formatEntityName(name)}</span>

      <button type="button" className={btnClasses} onClick={() => handleVisibilityToggle(category.id)}>
        <SvgIcon iconName="eye" className="size-full fill-gray-dark" />
        {!isVisible &&
          <div className="absolute left-0 top-1/2 w-full h-px -rotate-45 bg-gray-dark"></div>
        }
      </button>
    </div>
  )
}
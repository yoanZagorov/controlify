// To do: give the ability to edit the categories

import { SvgIcon } from "@/components/SvgIcon";
import { capitalize } from "@/utils/str";
import cn from "classnames";

export default function CategoryItem({ category }) {
  const { iconName, name, isVisible } = category;

  const btnClasses = cn(
    "ml-auto relative size-4",
    isVisible ? "opacity-100" : "opacity-50"
  )

  return (
    <div className="flex items-center gap-4">
      <SvgIcon iconName={iconName} className="size-8" fill={category.color} />
      <span className="text-sm text-gray-dark">{capitalize(name)}</span>

      <button type="button" className={btnClasses}>
        <SvgIcon iconName="eye" className="size-full fill-gray-dark" />
        {isVisible &&
          <div className="absolute left-0 bottom-0 w-full h-px -rotate-45 bg-gray-dark"></div>
        }
      </button>
    </div>
  )
}
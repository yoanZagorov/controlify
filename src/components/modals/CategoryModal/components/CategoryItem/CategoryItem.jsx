import cn from "classnames";

import { capitalize } from "@/utils/str";

import { SvgIcon } from "@/components/SvgIcon";

export default function CategoryItem({ category, isActive, handleCategoryChange }) {
  const btnClasses = cn("flex justify-center items-center w-12 h-12 rounded-full ",
    isActive ? "border-2 bg-navy border-goldenrod" : "border bg-gray-light border-gray-dark");

  const svgClasses = cn(
    "w-6 h-6",
    isActive ? "fill-goldenrod" : "fill-gray-dark"
  )

  return (
    <li
      key={category.id}
      className="flex flex-col items-center gap-2 text-center"
    >
      <button
        type="button"
        onClick={() => handleCategoryChange({ name: category.name, id: category.id })}
        className={btnClasses}>
        <SvgIcon iconName={category.iconName} className={svgClasses} />
      </button>
      <span className="text-xs font-semibold text-gray-dark">{capitalize(category.name)}</span>
    </li>
  )
}

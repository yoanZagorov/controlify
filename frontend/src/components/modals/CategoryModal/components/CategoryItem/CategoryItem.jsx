import cn from "classnames";

import { formatEntityNameForUI } from "@/utils/formatting";

import { SvgIcon } from "@/components/SvgIcon";

export default function CategoryItem({ category, isActive, handleClick }) {
  return (
    <li key={category.id} className="flex flex-col items-center gap-2 text-center">
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "flex justify-center items-center size-12 rounded-full focus:outline-none focus-visible:ring focus-visible:ring-gray-dark ",
          isActive && "ring-2 ring-goldenrod bg-navy"
        )}
        style={!isActive ? { backgroundColor: category.color } : {}}
      >
        <SvgIcon
          iconName={category.iconName}
          className={cn(
            "size-1/2",
            isActive ? "fill-goldenrod" : "fill-gray-light"
          )}
        />
      </button>
      <span className="text-xs font-semibold text-gray-dark">{formatEntityNameForUI(category.name)}</span>
    </li>
  )
}

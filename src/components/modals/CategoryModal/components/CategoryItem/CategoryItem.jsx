import cn from "classnames";

import { capitalize } from "@/utils/str";

import { SvgIcon } from "@/components/SvgIcon";
import { categoryColorsMap } from "@/utils/category";

export default function CategoryItem({ category, isActive, handleClick }) {
  const classes = {
    btn: cn(
      "flex justify-center items-center size-12 rounded-full ",
      isActive ? "border-2 border-goldenrod bg-navy" : categoryColorsMap.background[category.color]),
    icon: cn(
      "size-1/2",
      isActive ? "fill-goldenrod" : "fill-gray-light"
    )
  }

  return (
    <li
      key={category.id}
      className="flex flex-col items-center gap-2 text-center"
    >
      <button
        type="button"
        onClick={handleClick}
        className={classes.btn}
      >
        <SvgIcon iconName={category.iconName} className={classes.icon} />
      </button>
      <span className="text-xs font-semibold text-gray-dark">{capitalize(category.name)}</span>
    </li>
  )
}

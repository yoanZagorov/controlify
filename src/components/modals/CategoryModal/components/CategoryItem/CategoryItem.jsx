import cn from "classnames";

import formatEntityName from "@/utils/formatting/formatEntityName";

import { SvgIcon } from "@/components/SvgIcon";

export default function CategoryItem({ category, isActive, handleClick }) {
  const classes = {
    btn: cn(
      "flex justify-center items-center size-12 rounded-full focus:outline-none focus-visible:ring focus-visible:ring-gray-dark ",
      isActive && "ring-2 ring-goldenrod bg-navy"
    ),
    icon: cn(
      "size-1/2",
      isActive ? "fill-goldenrod" : "fill-gray-light"
    )
  }

  const btnStyles = !isActive ? { backgroundColor: category.color } : {};

  console.log(btnStyles);

  return (
    <li
      key={category.id}
      className="flex flex-col items-center gap-2 text-center"
    >
      <button
        type="button"
        onClick={handleClick}
        className={classes.btn}
        style={btnStyles}
      >
        <SvgIcon iconName={category.iconName} className={classes.icon} />
      </button>
      <span className="text-xs font-semibold text-gray-dark">{formatEntityName(category.name)}</span>
    </li>
  )
}

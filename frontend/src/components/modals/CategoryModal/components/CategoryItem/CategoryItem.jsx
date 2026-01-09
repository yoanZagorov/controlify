import { useRef } from "react";
import cn from "classnames";

import { useAutoFocus } from "#hooks";
import { formatEntityNameForUI } from "#utils/formatting";

import { SvgIcon } from "#components/SvgIcon";

export default function CategoryItem({ category, isActive, handleClick }) {
  const activeCategoryBtnRef = useRef(null);
  useAutoFocus({ ref: activeCategoryBtnRef });

  return (
    <li key={category.id} className="flex flex-col items-center gap-2 text-center">
      <button
        ref={isActive ? activeCategoryBtnRef : null}
        type="button"
        onClick={handleClick}
        className={cn(
          "flex justify-center items-center size-12 rounded-full",
          isActive ? "bg-navy focus-goldenrod" : "focus-gray-dark"
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

import cn from "classnames";

import { SvgIcon } from "@/components/SvgIcon";

export default function SelectedDay({ date, iconName, className = {} }) {
  const { component } = className;

  const componentClasses = cn(
    "flex items-end gap-4 p-3 rounded-lg bg-gray-light",
    component
  )

  return (
    <div className={componentClasses}>
      <SvgIcon
        iconName={iconName || "calendar"}
        className="w-5 h-5 fill-gray-dark"
      />
      <time className="text-sm text-gray-dark font-semibold">{date}</time>
    </div>
  )
}

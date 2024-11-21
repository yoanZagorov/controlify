import cn from "classnames";

import { formatDateLong } from "@/utils/date";
import { SvgIcon } from "@/components/SvgIcon";

export default function SelectedDay({ date, iconName, className }) {
  const formattedDate = formatDateLong(date);

  const componentClasses = cn(
    "flex items-end gap-4 p-3 rounded-lg bg-gray-light",
    className
  )

  return (
    <div className={componentClasses}>
      <SvgIcon
        iconName={iconName || "calendar"}
        className="size-5 fill-gray-dark"
      />
      <time className="text-sm text-gray-dark font-semibold">{formattedDate}</time>
    </div>
  )
}

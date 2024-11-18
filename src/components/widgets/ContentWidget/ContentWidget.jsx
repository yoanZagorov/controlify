import cn from "classnames"

import { SvgIcon } from "@/components/SvgIcon"
import { Widget } from "@/components/widgets/Widget"

export default function ContentWidget({ iconName, title, className = "", children }) {
  const classes = {
    widget: cn(
      "flex flex-col",
      className
    )
  }

  return (
    <Widget className={classes.widget}>
      <SvgIcon iconName={iconName} className="size-5 fill-gray-dark" />
      <span className="mt-2 uppercase text-sm text-gray-dark opacity-50 font-semibold">{title}</span>
      {children}
    </Widget>
  )
}

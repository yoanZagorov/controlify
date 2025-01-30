import cn from "classnames";

export default function IconCircle({ wrapper, icon }) {
  const classes = {
    wrapper: cn(
      "flex justify-center items-center rounded-full",
      wrapperProps.color,
      wrapperProps.className
    ),
    icon: cn(
      "size-1/2",
      iconProps.color
    )
  }

  return (
    <div className={classes.wrapper}>
      <SvgIcon iconName={icon.name} className="size-1/2 fill-gray-light" />
    </div>

  )
}

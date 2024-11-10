import { NavLink } from "react-router-dom";
import cn from "classnames";

import { useLayout } from "@/hooks";
import { capitalize } from "@/utils/str";

import { SvgIcon } from "@/components/SvgIcon";

export default function NavItem({ variants = { layout: "iconOnly", type: "main" }, to, iconName = "house", handleClose = null }) {
  const { breakpoints: { isDesktop } } = useLayout();

  const { layout: layoutVariant, type: typeVariant } = variants;

  const variantClasses = {
    layout: {
      iconOnly: "justify-center rounded-lg",
      iconWithText: "gap-3"
    },
    type: {
      main: {
        base: "p-4 text-lg ll:text-xl",
        inactive: "bg-navy text-gray-light",
        active: "bg-gray-medium text-gray-dark",
        icon: "size-7 ll:size-8"
      },
      secondary: {
        base: "px-4 py-3 text-base",
        inactive: "bg-navy text-gray-medium",
        active: "bg-navy text-gray-light underline",
        icon: "size-5"
      }
    }
  }

  const classes = {
    navEl: ({ isActive }) => cn(
      "mt-1 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-goldenrod",
      variantClasses.layout[layoutVariant],
      variantClasses.type[typeVariant].base,
      isActive ? `opacity-100 font-bold ${variantClasses.type[typeVariant].active}` : `opacity-80 hover:opacity-100 ${variantClasses.type[typeVariant].inactive}`,
    ),
    icon: cn(
      "fill-current",
      variantClasses.type[typeVariant].icon
    )
  }

  return (
    <li>
      <NavLink
        to={to}
        className={classes.navEl}
        onClick={!isDesktop && handleClose}
      >
        <SvgIcon iconName={iconName} className={classes.icon} />
        {layoutVariant === "iconWithText" && capitalize(to)}
      </NavLink>
    </li>
  )
}
// padding, text size, bg (constant for the SecNav, depends on the state for MainNav), underline for the sec, icon size, 
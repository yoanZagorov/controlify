import { NavLink, Form as RouterForm } from "react-router-dom";
import cn from "classnames";

import { useLayout } from "@/hooks";
import { capitalize } from "@/utils/str";

import { SvgIcon } from "@/components/SvgIcon";

export default function NavItem({
  variants = { layout: "iconOnly", type: "primary", purpose: "navigation" },
  to = null,
  action = null,
  iconName = "house",
  handleClose = null
}) {
  const { breakpoints: { isDesktop } } = useLayout();

  const { layout: layoutVariant, type: typeVariant } = variants;
  const isLogout = variants.purpose === "logout";

  const colors = {
    primary: {
      inactive: "bg-navy text-gray-light",
      active: "bg-gray-medium text-gray-dark"
    },
    secondary: {
      inactive: "bg-navy text-gray-medium",
      active: "bg-navy text-gray-light",
    },
    logout: "bg-navy text-red-light"
  }

  const variantClasses = {
    layout: {
      iconOnly: "justify-center rounded-lg",
      iconWithText: "gap-3"
    },
    type: {
      primary: {
        base: "p-4 text-lg ll:text-xl",
        inactive: colors.primary.inactive,
        active: colors.primary.active,
        icon: "size-7 ll:size-8"
      },
      secondary: {
        base: cn("px-4 py-2.5 text-base", isLogout && colors.logout),
        inactive: colors.primary.inactive,
        active: colors.secondary.active,
        icon: "size-5"
      }
    }
  }

  const getClasses = (isLink = false, isActive = null) => cn(
    "mt-1 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-goldenrod",
    variantClasses.layout[layoutVariant],
    variantClasses.type[typeVariant].base,
    isLink && (isActive ? `opacity-100 font-bold ${variantClasses.type[typeVariant].active}` : `opacity-80 hover:opacity-100 ${variantClasses.type[typeVariant].inactive}`),
  )

  const classes = {
    navItem: ({ isActive }) => getClasses(true, isActive),
    logoutBtn: getClasses(),
    icon: cn(
      "fill-current",
      variantClasses.type[typeVariant].icon
    )
  }

  return (
    <li>
      {isLogout ? (
        <RouterForm method="post" action={action}>
          <button
            type="submit"
            name="intent" // use to differentiate between the different forms on the action
            value="logout"
            className={classes.logoutBtn}
            onClick={!isDesktop ? handleClose : undefined}
          >
            <SvgIcon iconName="logout" className={classes.icon} />
            {layoutVariant === "iconWithText" && "Log out"}
          </button>
        </RouterForm>
      ) : (
        <NavLink
          to={to}
          className={classes.navItem}
          onClick={!isDesktop ? handleClose : undefined}
        >
          <SvgIcon iconName={iconName} className={classes.icon} />
          {layoutVariant === "iconWithText" && capitalize(to)}
        </NavLink>
      )
      }
    </li >
  )
}

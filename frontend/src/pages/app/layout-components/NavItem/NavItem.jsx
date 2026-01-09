import { NavLink } from "react-router";
import cn from "classnames";

import { capitalize } from "#utils/str";

import { SvgIcon } from "#components/SvgIcon";
import { Form } from "#components/Form";

// A nav item for the navigation components
// Would be better off split in different components, but it works so leave it as is
export default function NavItem({
  variants = { layout: "iconOnly", type: "primary", purpose: "navigation" },
  to = null,
  action = null,
  iconName = "house",
  handleClose = null
}) {
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
        base: cn("px-4 py-2 text-sm ll:text-base", isLogout && colors.logout),
        inactive: colors.secondary.inactive,
        active: `underline ${colors.secondary.active}`,
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
    logoutBtn: getClasses(),
    navItem: ({ isActive }) => getClasses(true, isActive),
    icon: cn(
      "fill-current",
      variantClasses.type[typeVariant].icon
    )
  }

  return (
    <li>
      {isLogout ? (
        <Form action={action} btn={{ isBtn: false }}>
          <button
            type="submit"
            name="intent" // use to differentiate between the different forms on the action
            value="logout"
            className={classes.logoutBtn}
            onClick={handleClose}
          >
            <SvgIcon iconName="logout" className={classes.icon} />
            {layoutVariant === "iconWithText" && "Log out"}
          </button>
        </Form>
      ) : (
        <NavLink
          to={to}
          className={classes.navItem}
          onClick={handleClose || null}
        >
          <SvgIcon iconName={iconName} className={classes.icon} />
          {layoutVariant === "iconWithText" && capitalize(to)}
        </NavLink>
      )
      }
    </li >
  )
}

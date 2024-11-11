import cn from "classnames"
import { Form as RouterForm } from "react-router-dom"

import { SvgIcon } from "@/components/SvgIcon"

export default function LogoutNavItem({ variant, handleClose = null }) {
  const variantClasses = {
    iconOnly: "justify-center rounded-lg",
    iconWithText: "gap-3"
  }

  const classes = {
    btn: cn(
      "mt-1 w-full flex items-center px-4 py-2 text-red-light focus:outline-none focus-visible:ring-2 focus-visible:ring-goldenrod",
      variantClasses[variant]
    )
  }

  return (
    <li>
      <RouterForm method="post" action="/app">
        <button
          type="submit"
          name="intent" // use to differentiate between the different forms on the action
          value="logout"
          onClick={handleClose}
          className={classes.btn}
        >
          <SvgIcon iconName="logout" className="fill-current size-5" />
          {variant === "iconWithText" && "Log out"}
        </button>
      </RouterForm>
    </li>
  )
}

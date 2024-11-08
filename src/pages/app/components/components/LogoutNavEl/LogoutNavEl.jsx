import { SvgIcon } from "@/components/SvgIcon"
import cn from "classnames"
import { Form as RouterForm } from "react-router-dom"

export default function LogoutNavEl({ variant, handleClose = null, className = {} }) {
  const isIconWithText = variant === "iconWithText";

  const btn = cn(
    "text-red-light",
    isIconWithText && "flex items-center gap-3",
    className.btn
  )

  const icon = cn(
    "fill-current",
    className.icon
  )

  return (
    <li>
      <RouterForm method="post" action="/app">
        <button
          type="submit"
          name="intent" // use to differentiate between the different forms on the action
          value="logout"
          onClick={handleClose}
          className={btn}
        >
          <SvgIcon iconName="logout" className={icon} />
          {isIconWithText && "Log out"}
        </button>
      </RouterForm>
    </li>
  )
}

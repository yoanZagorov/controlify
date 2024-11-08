import { SvgIcon } from "@/components/SvgIcon";
import cn from "classnames";
import { NavLink } from "react-router-dom";

export default function NavEl({ variant, link, icon, text = "", handleClose = null }) {
  const isIconWithText = variant === "iconWithText";

  // const isMain = type === "main";
  // const isExpanded = sidebarType === "expanded";

  // const navEl = ({ isActive }) => (cn(
  //   "flex items-center",
  //   isExpanded ? "px-4 gap-3" : "justify-center p-4 rounded-lg",
  //   isExpanded && (isMain ? "py-3.5 text-lg" : "py-1.5"),
  //   isActive && "font-bold",
  //   // !isMain && (isActive ? "opacity-100" : "opacity-80"),
  //   isActive ? "opacity-100" : "opacity-80",
  //   isActive && (isMain ? "bg-gray-medium text-gray-dark" : "underline")
  // ))

  const navElClasses = ({ isActive }) => cn(
    "flex items-center",
    isActive ? "opacity-100 font-bold" : "opacity-80",
    isIconWithText ? "gap-3" : "justify-center",
    link.className.base,
    isActive && link.className.active
  )

  const iconClasses = cn(
    "fill-current",
    icon.className
  )

  return (
    <li>
      <NavLink
        to={link.to}
        className={navElClasses}
        onClick={handleClose}
      >
        <SvgIcon iconName={icon.name} className={iconClasses} />
        {isIconWithText && text}
      </NavLink>
    </li>
  )
}

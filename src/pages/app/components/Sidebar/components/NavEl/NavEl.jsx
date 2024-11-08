import { SvgIcon } from "@/components/SvgIcon";
import { capitalize } from "@/utils/str";
import cn from "classnames";
import { NavLink } from "react-router-dom";

export default function NavEl({ type, page, toggleSidebar = null }) {
  const isMain = type === "main";

  const navEl = ({ isActive }) => (cn(
    "px-4 flex items-center gap-3",
    isMain ? "py-3.5 text-lg" : "py-1.5 text-gray-medium",
    isActive && "font-bold",
    !isMain && (isActive ? "opacity-100" : "opacity-80"),
    isActive && (isMain ? "bg-gray-medium text-gray-dark" : "underline")
  ))

  const icon = cn(
    "fill-current",
    isMain ? "size-6" : "size-4"
  )

  return (
    <NavLink
      to={page.name}
      className={navEl}
      onClick={toggleSidebar && toggleSidebar}
    >
      <SvgIcon iconName={page.iconName} className={icon} /> {capitalize(page.name)}
    </NavLink>
  )
}

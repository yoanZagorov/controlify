import { capitalize } from "@/utils/str";
import cn from "classnames";
import { NavLink } from "react-router";

export default function NavItem({ page, index }) {
  const linkClasses = ({ isActive }) => cn(
    "p-2 mm:px-3.5 mm:py-2 border border-gray-dark font-medium",
    index === 0
      ? "rounded-l-md"
      : index === 1
        ? "border-x-0"
        : "rounded-r-md",
    isActive ? "text-gray-light bg-navy" : "text-gray-dark bg-gray-medium"
  );

  return (
    <NavLink
      to={page}
      className={linkClasses}
      preventScrollReset={true}
    >
      <span>{capitalize(page)}</span>
    </NavLink>
  )
}
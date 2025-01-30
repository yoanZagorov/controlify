import { NavLink } from "react-router"

import { capitalize } from "@/utils/str";

export default function createNavElsFromPages(pages, className, toggleSidebar) {
  return pages.map((page, index) => {
    const pageName = page.name || page;
    const icon = page.icon || null;

    return (
      <li key={index}>
        <NavLink
          to={pageName}
          className={className}
          onClick={toggleSidebar && toggleSidebar}
        >
          {icon && icon} {capitalize(pageName)}
        </NavLink>
      </li>
    )
  })
}
import { NavLink } from "react-router-dom"
import capitalize from "../generic/capitalize"

export default function createNavElsFromPages(pages, className, toggleSidebar) {
  return pages.map((page, index) => {
    const pageName = page.name ? page.name : page;
    const icon = page.icon ? page.icon : null;

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
    )})
}
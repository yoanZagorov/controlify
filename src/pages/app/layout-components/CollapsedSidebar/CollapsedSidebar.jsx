import cn from "classnames";

import { useLayout } from "@/hooks";
import { renderNavItems } from "../utils";
import { mainNavPages, secondaryNavPages } from "../utils";

import { SvgIcon } from "@/components/SvgIcon";
import { LogoutNavItem } from "../nav-items/LogoutNavItem";

export default function CollapsedSidebar() {
  const {
    sidebar: {
      isExpanded: isSidebarExpanded,
      toggle: toggleSidebar
    }
  } = useLayout();

  const mainNavItems = renderNavItems(mainNavPages, "iconOnly", "main");
  const secondaryNavItems = renderNavItems(secondaryNavPages, "iconOnly", "secondary");

  const classes = {
    collapsedSidebar: cn(
      "fixed h-full w-20 py-10 px-3 flex flex-col items-center bg-navy text-gray-light transition-[left] duration-500",
      isSidebarExpanded ? "-left-full" : "left-0"
    )
  }

  return (
    <div className={classes.collapsedSidebar}>
      <button onClick={toggleSidebar} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-goldenrod">
        <SvgIcon iconName="hamburger" className="size-8 fill-current" />
      </button>
      <ul className="mt-14">
        {mainNavItems}
      </ul>
      <ul className="mt-auto">
        {secondaryNavItems}
        <LogoutNavItem
          variant="iconOnly"
        />
      </ul>
    </div>
  )
}

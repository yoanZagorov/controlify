import cn from "classnames";

import { useLayout } from "@/hooks";
import { primaryNavPages, secondaryNavPages } from "../data";

import { SvgIcon } from "@/components/SvgIcon";
import { NavItem } from "../NavItem";

export default function CollapsedSidebar() {
  const { isSidebarExpanded, toggleSidebar } = useLayout();

  function renderNavItems(navPages, layout, type) {
    return navPages.map((page, index) => (
      <NavItem
        key={index}
        variants={{ layout, type }}
        to={page.name}
        iconName={page.iconName}
      />
    ));
  }

  const primaryNavItems = renderNavItems(primaryNavPages, "iconOnly", "primary");
  const secondaryNavItems = renderNavItems(secondaryNavPages, "iconOnly", "secondary");

  const classes = {
    collapsedSidebar: cn(
      "fixed h-full w-20 pt-10 px-2.5 pb-8 flex flex-col items-center bg-navy text-gray-light transition-[left] duration-500",
      isSidebarExpanded ? "-left-full" : "left-0"
    )
  }

  return (
    <div className={classes.collapsedSidebar}>
      <button onClick={toggleSidebar} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-goldenrod">
        <SvgIcon iconName="hamburger" className="size-8 fill-current" />
      </button>
      <ul className="mt-14">
        {primaryNavItems}
      </ul>
      <ul className="mt-auto">
        {secondaryNavItems}

        <NavItem
          variants={{ layout: "iconOnly", type: "secondary", purpose: "logout" }}
          action="/app"
        />
      </ul>
    </div>
  )
}

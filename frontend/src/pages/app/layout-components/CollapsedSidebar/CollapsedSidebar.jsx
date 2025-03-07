import cn from "classnames";

import { PAGES } from "@/constants";

import { useLayout } from "@/hooks";

import { SvgIcon } from "@/components/SvgIcon";
import { NavItem } from "../NavItem";

// The sidebar appearing on tablet screens
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

  const primaryNavItems = renderNavItems(PAGES.PRIMARY, "iconOnly", "primary");
  const secondaryNavItems = renderNavItems(PAGES.SECONDARY, "iconOnly", "secondary");

  const classes = {
    collapsedSidebar: cn(
      "fixed inset-y-0 left-0 h-full w-20 pt-10 px-2.5 pb-8 flex flex-col items-center bg-navy text-gray-light overflow-y-auto transition-transform duration-500",
      isSidebarExpanded && "-translate-x-full"
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

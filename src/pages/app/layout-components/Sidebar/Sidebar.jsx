import cn from "classnames";
import { useRouteLoaderData } from "react-router";

import logo from "@/assets/images/logos/logoNavyBg.png";

import { useBreakpoint, useLayout } from "@/hooks";
import { primaryNavPages, secondaryNavPages } from "../utils";
import { renderNavItems } from "../utils";

import { SvgIcon } from "@/components/SvgIcon";
import { NavItem } from "../NavItem";

export default function Sidebar() {
  const { userData: { user } } = useRouteLoaderData("app");
  const { isSidebarExpanded, toggleSidebar, sidebarRef } = useLayout();
  const { isDesktop } = useBreakpoint();

  const primaryNavItems = renderNavItems(primaryNavPages, "iconWithText", "primary", !isDesktop ? toggleSidebar : null);
  const secondaryNavItems = renderNavItems(secondaryNavPages, "iconWithText", "secondary", !isDesktop ? toggleSidebar : null);

  const classes = {
    sidebar: cn(
      "fixed h-screen w-64 ml:w-72 tab:w-80 ll:w-96 py-8 tab:pt-10 ll:pt-12 flex flex-col items-center text-gray-light bg-navy z-10 transition-[left] duration-300 tab:duration-500",
      isSidebarExpanded ? "left-0" : "-left-full"
    )
  }

  return (
    <div className={classes.sidebar} ref={sidebarRef}>
      <img src={logo} className="px-4" />
      <p className="text-sm mm:text-base ll:text-lg tracking-wider font-light">Take control of your finances</p>

      <div className="mt-8 ll:mt-10 size-20 ll:size-24 rounded-full">
        {user.profilePic?.url ?
          <img src={user.profilePic.url} className="rounded-full size-full object-cover" alt="Profile Picture" /> // To do: test with an actual image
          :
          <SvgIcon iconName="user-circle" className="size-full fill-current" />
        }
      </div>

      <p className="mt-4 text-xs ll:text-sm font-light">{user.email}</p>
      <p className="mt-2 text-2xl">{user.fullName}</p>

      <nav className="w-full mt-8">
        <ul>
          {primaryNavItems}
        </ul>
      </nav>

      <nav className="mt-auto w-full">
        <ul>
          {secondaryNavItems}

          <NavItem
            variants={{ layout: "iconWithText", type: "secondary", purpose: "logout" }}
            action="/app"
            handleClose={!isDesktop ? toggleSidebar : null}
          />
        </ul>
      </nav>
    </div>
  )
}
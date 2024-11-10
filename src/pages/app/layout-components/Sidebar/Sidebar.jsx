import cn from "classnames";
import { useRouteLoaderData } from "react-router-dom";

import logo from "@/assets/images/logos/logoNavyBg.png";

import { useLayout } from "@/hooks";
import { mainNavPages, secondaryNavPages } from "../utils";
import { renderNavItems } from "../utils";

import { SvgIcon } from "@/components/SvgIcon";
import { LogoutNavItem } from "../nav-items/LogoutNavItem";

export default function Sidebar() {
  const { user } = useRouteLoaderData("app");

  const {
    sidebar: {
      isExpanded: isSidebarExpanded,
      toggle: toggleSidebar,
      ref: sidebarRef
    }
  } = useLayout();

  const mainNavItems = renderNavItems(mainNavPages, "iconWithText", "main", toggleSidebar);
  const secondaryNavItems = renderNavItems(secondaryNavPages, "iconWithText", "secondary", toggleSidebar);

  const classes = {
    sidebar: cn(
      "fixed h-screen w-64 ml:w-72 tab:w-80 ll:w-96 py-6 flex flex-col items-center text-gray-light bg-navy z-10 transition-[left] duration-300 tab:duration-500",
      isSidebarExpanded ? "left-0" : "-left-full"
    )
  }

  return (
    <div className={classes.sidebar} ref={sidebarRef}>
      <img src={logo} className="px-4" />
      <p className="text-sm mm:text-base ll:text-lg tracking-wider font-light">Take control of your finances</p>

      <div className="mt-8 ll:mt-10 size-20 ll:size-24 rounded-full">
        {user.profilePic ?
          <img src={user.profilePic} className="size-full" /> // To do: test with an actual image
          :
          <SvgIcon iconName="user-circle" className="size-full fill-current" />
        }
      </div>

      <p className="mt-4 text-xs ll:text-sm font-light">{user.email}</p>
      <p className="mt-2 text-2xl">{user.fullName}</p>

      <nav className="w-full mt-8">
        <ul>
          {mainNavItems}
        </ul>
      </nav>

      <nav className="mt-auto w-full">
        <ul>
          {secondaryNavItems}

          <LogoutNavItem
            variant="iconWithText"
            handleClose={toggleSidebar}
          />
        </ul>
      </nav>
    </div>
  )
}
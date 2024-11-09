import cn from "classnames";
import { useRouteLoaderData } from "react-router-dom";

import logo from "@/assets/images/logos/logoNavyBg.png";

import { SvgIcon } from "@/components/SvgIcon";
import { NavEl } from "../NavEl";
import { mainNavPages, secNavPages } from "../../data";
import { LogoutNavEl } from "../LogoutNavEl";
import { capitalize } from "@/utils/str";
import { useLayout } from "@/hooks";

export default function Sidebar() {
  const { user } = useRouteLoaderData("app");

  const {
    sidebar: {
      isExpanded: isSidebarExpanded,
      toggle: toggleSidebar,
      ref: sidebarRef
    }
  } = useLayout();

  const mainNavEls = mainNavPages.map((page, index) => (
    <NavEl
      key={index}
      variant="iconWithText"
      link={{
        to: page.name,
        className: {
          base: "py-3.5 px-4 text-lg",
          active: "bg-gray-medium text-gray-dark",
        }
      }}
      text={capitalize(page.name)}
      icon={{
        name: page.iconName,
        className: "size-6",
      }}
      handleClose={toggleSidebar}
    />
  ))

  const secNavEls = secNavPages.map((page, index) => (
    <NavEl
      key={index}
      variant="iconWithText"
      link={{
        to: page.name,
        className: {
          base: "py-1.5 px-4 text-gray-medium",
          active: "underline",
        }
      }}
      text={capitalize(page.name)}
      icon={{
        name: page.iconName,
        className: "size-4",
      }}
      handleClose={toggleSidebar}
    />
  ))

  const sidebar = cn(
    "fixed h-screen w-4/5 tab:w-80 max-w-72 tab:max-w-none py-5 flex flex-col items-center text-gray-light bg-navy z-10 transition-[left] duration-500",
    isSidebarExpanded ? "left-0" : "-left-full"
  )

  const classes = {
    sidebar: cn(
      "fixed h-screen w-64 ml:w-72 tab:w-80 lm:w-96 tab:max-w-none py-5 flex flex-col items-center text-gray-light bg-navy z-10 transition-[left] duration-500",
      isSidebarExpanded ? "left-0" : "-left-full"
    )
  }

  return (
    <div className={classes.sidebar} ref={sidebarRef}>
      <img src={logo} className="px-4" />
      <p className="text-sm mm:text-base tracking-wider font-light">Take control of your finances</p>

      <div className="mt-8 size-20 rounded-full">
        {user.profilePic ?
          <img src={user.profilePic} className="size-full" /> // To do: test with an actual image
          :
          <SvgIcon iconName="user-circle" className="size-full fill-current" />
        }
      </div>

      <p className="mt-4 text-xs font-light">{user.email}</p>
      <p className="mt-2 text-2xl">{user.fullName}</p>

      <nav className="w-full mt-8">
        <ul>
          {mainNavEls}
        </ul>
      </nav>

      <nav className="mt-auto self-start">
        <ul>
          {secNavEls}

          <LogoutNavEl
            variant="iconWithText"
            handleClose={toggleSidebar}
            className={{
              btn: "px-4 py-1.5",
              icon: "size-4"
            }}
          />
        </ul>
      </nav>
    </div>
  )
}
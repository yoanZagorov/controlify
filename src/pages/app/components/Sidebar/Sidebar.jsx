import cn from "classnames";
import { forwardRef } from "react";
import { Form as RouterForm, useRouteLoaderData } from "react-router-dom";

import logo from "@/assets/images/logos/logoNavyBg.png";

import { SvgIcon } from "@/components/SvgIcon";
import { dashboardAction } from "services/router/actions";
import { NavEl } from "./components/NavEl";

export default forwardRef(function Sidebar({ toggleSidebar = null, isSidebarOpen }, ref) {
  const { user } = useRouteLoaderData("app");

  const mainNavPages = [
    { name: "dashboard", iconName: "house" },
    { name: "wallets", iconName: "wallet" },
    { name: "reflect", iconName: "stats" },
  ]

  const secNavPages = [
    { name: "settings", iconName: "settings" },
    { name: "categories", iconName: "categories" },
  ]

  const mainNavEls = mainNavPages.map((page, index) => (
    <NavEl
      key={index}
      type="main"
      page={page}
      toggleSidebar={toggleSidebar}
    />
  ))

  const secNavEls = secNavPages.map((page, index) => (
    <NavEl
      key={index}
      type="secondary"
      page={page}
      toggleSidebar={toggleSidebar}
    />
  ))

  const sidebar = cn(
    "fixed h-screen w-4/5 max-w-72 py-5 flex flex-col items-center text-gray-light bg-navy z-10 transition-[left] duration-500",
    isSidebarOpen ? "left-0" : "-left-80"
  )

  return (
    <div className={sidebar} ref={ref}>
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
          <li>
            <RouterForm method="post" action={dashboardAction}>
              <button
                type="submit"
                name="intent" // use to differentiate between the different forms on the action
                value="logout"
                onClick={toggleSidebar}
                className="px-4 py-1.5 flex items-center gap-3 text-red-light"
              >
                <SvgIcon iconName="logout" className="size-4 fill-current" />
                Log out
              </button>
            </RouterForm>
          </li>
        </ul>
      </nav>
    </div>
  )
})
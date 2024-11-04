import cn from "classnames";
import { forwardRef } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

import { logOutUser } from "services/firebase/db/user";
import { createNavElsFromPages } from "@/pages/app/helpers";

import { mainNavPages, secNavPages } from "./data";
import logo from "@/assets/images/logos/logoNavyBg.png";

import { SvgIcon } from "@/components/SvgIcon";

export default forwardRef(function Sidebar({ toggleSidebar, isSidebarOpen }, ref) {
  const navigate = useNavigate();

  const { user } = useRouteLoaderData("app");
  const { profilePic, email, fullName } = user;


  async function handleLogOut() {
    // To do: check for errors
    await logOutUser();
    // To do: createa global notifications context
    navigate("/auth/login", { state: { "logOutMsg": "Successfully logged out!" } });
  }

  const sidebarWrapperCn = "px-4 w-full";

  const mainNavElCn = cn(sidebarWrapperCn, "flex items-center gap-3 py-3 tab:py-4 text-xl tab:text-2xl");
  const mainNavElActiveCn = cn(mainNavElCn, "bg-gray-medium text-gray-dark font-semibold");


  const mainNavElsClasses = ({ isActive }) => isActive ? mainNavElActiveCn : mainNavElCn;
  const mainNavEls = createNavElsFromPages(mainNavPages, mainNavElsClasses, toggleSidebar);

  // To do: deal with the active state on the secNavEls
  const secNavElCn = cn(sidebarWrapperCn, "flex items-center gap-3 py-1.5 tab:text-lg");
  const secNavEls = createNavElsFromPages(secNavPages, cn(secNavElCn, "text-gray-medium"), toggleSidebar);

  const sidebarCn = `
    fixed top-0
    flex flex-col items-center 
    py-5 w-[80%] max-w-[300px] tab:max-w-[360px] h-full 
    text-gray-light
    bg-navy
    transition-[left] duration-500 tab:duration-700 z-10`;

  const sidebarClosedCn = cn(sidebarCn, "-left-[300px] tab:-left-[360px]")
  const sidebarOpenedCn = cn(sidebarCn, "left-0");

  return (
    <div className={isSidebarOpen ? sidebarOpenedCn : sidebarClosedCn} ref={ref}>
      <div className={sidebarWrapperCn}>
        <img src={logo} />
      </div>
      <p className="text-sm tab:text-lg tracking-wider font-light">Take control of your finances</p>

      <div className="mt-7 tab:mt-10 w-20 h-20 tab:w-24 tab:h-24 rounded-full">
        {profilePic ?
          <img src={profilePic} className="w-full h-full" />
          :
          <SvgIcon iconName="user-circle" className="w-full h-full fill-current" />
        }
      </div>

      <p className="mt-4 text-xs tab:text-sm font-light">{email}</p>
      <p className="mt-2 text-2xl tab:text-3xl">{fullName}</p>

      <nav className="w-full mt-8 tab:mt-12">
        <ul>
          {mainNavEls}
        </ul>
      </nav>

      <nav className="mt-auto w-full">
        <ul>
          {secNavEls}
          <li>
            <button onClick={handleLogOut} className={cn(secNavElCn, "text-red-light")}>
              <SvgIcon iconName="log-out" className="w-4 h-4 tab:w-5 tab:h-5 fill-current" />
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
})
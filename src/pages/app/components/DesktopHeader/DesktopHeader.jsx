import cn from "classnames";

import { useNavigate, useRouteLoaderData } from "react-router-dom";

import { getFirstName } from "@/utils/user";
import { createNavElsFromPages } from "@/utils/components";

import UserIcon from "@/assets/icons/user-circle.svg?react";
import logo from "@/assets/images/logos/logoNavyBg.png";

export default function DesktopHeader() {
  const navigate = useNavigate();

  const { user } = useRouteLoaderData("app");
  const { fullName, profilePic } = user;
  const displayName = getFirstName(fullName);

  const pages = ["dashboard", "wallets", "reflect", "settings"];

  const navElCn = "lm:text-lg text-gray-light tracking-wide hover:opacity-100 hover:font-semibold transition";
  const navElInactiveCn = cn(navElCn, "opacity-50");
  const navElActiveCn = cn(navElCn, "underline opacity-100 font-semibold");

  const navElsClasses = ({ isActive }) => isActive ? navElActiveCn : navElInactiveCn;
  const navEls = createNavElsFromPages(pages, navElsClasses);

  return (
    <div className="page__wrapper fixed top-0 left-0 w-screen h-16 lm:h-20 flex items-center bg-navy shadow">
      <img src={logo} className="max-h-10 lm:max-h-12 cursor-pointer" onClick={() => navigate("..")} />

      <nav>
        <ul className="ml-8 lm:ml-10 flex gap-6 lm:gap-8">
          {navEls}
        </ul>
      </nav>

      <div className="ml-auto flex items-center gap-4 text-gray-light">
        <span className="lm:text-xl">Hello, {displayName}</span>
        <div className="w-8 h-8 lm:w-10 lm:h-10 rounded-full">
          {profilePic ?
            <img src={profilePic} className="w-full h-full" />
            :
            <UserIcon className="w-full h-full fill-current" />
          }
        </div>
      </div>
    </div>
  )
}
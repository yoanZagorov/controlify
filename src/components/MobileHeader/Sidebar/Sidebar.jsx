import { useNavigate } from "react-router-dom";
import { forwardRef } from "react";

import { mainNavPages, secNavPages } from "./data";

import { logOutUser } from "@/utils/auth";
import { createNavElsFromPages } from "@/utils/components";
import { useUser } from "@/utils/hooks";

import logo from "@/assets/images/logos/logoNavyBg.png";

import UserIcon from "@/assets/icons/user-circle.svg?react";
import LogOutIcon from "@/assets/icons/log-out.svg?react";

import s from "./Sidebar.module.css";

export default forwardRef(function Sidebar({ toggleSidebar, isSidebarOpen }, ref) {
  const { profilePic, email, fullName } = useUser();
  const navigate = useNavigate();

  async function handleLogOut() {
    // To do: check for errors
    await logOutUser();
    // To do: createa global notifications context
    navigate("/auth/login", { state: { "logOutMsg": "Successfully logged out!" } });
  }

  const mainNavElsClasses = ({ isActive }) => isActive ? s.mainNavElActive : s.mainNavEl;
  const mainNavEls = createNavElsFromPages(mainNavPages, mainNavElsClasses, toggleSidebar);

  // To do: deal with the active state on the secNavEls
  const secNavEls = createNavElsFromPages(secNavPages, s.secNavEl, toggleSidebar);

  return (
    <div className={isSidebarOpen ? s.sidebarOpened : s.sidebar} ref={ref}>
      <div className={s.sidebarWrapper}>
        <img src={logo} />
      </div>
      <p className={s.slogan}>Take control of your finances</p>

      <div className={s.avatarWrapper}>
        {profilePic ?
          <img src={profilePic} className={s.profilePic} />
          :
          <UserIcon className={s.userIcon} />
        }
      </div>

      <p className={s.email}>{email}</p>
      <p className={s.fullName}>{fullName}</p>

      <nav className={s.mainNav}>
        <ul>
          {mainNavEls}
        </ul>
      </nav>

      <nav className={s.secNav}>
        <ul>
          {secNavEls}
          <li>
            <button onClick={handleLogOut} className={s.logOutNavEl}>
              <LogOutIcon className={s.secNavIcon} />
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
})
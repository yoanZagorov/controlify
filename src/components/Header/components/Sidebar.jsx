import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { forwardRef, useState } from "react";

import logo from "@/assets/images/logos/logoNavyBg.png";

import User from "@/assets/icons/user-circle.svg?react";
import HouseIcon from "@/assets/icons/house.svg?react";
import WalletIcon from "@/assets/icons/wallet.svg?react";
import StatsIcon from "@/assets/icons/stats.svg?react";
import SettingsIcon from "@/assets/icons/settings.svg?react";
import CategoriesIcon from "@/assets/icons/categories.svg?react";
import LogOutIcon from "@/assets/icons/log-out.svg?react";

import s from "../header.module.css";
import classNames from "classnames";

import capitalize from "@/utils/capitalize";
import { logOutUser } from "@/utils/auth";
import { useUser } from "@/utils/hooks";

export default forwardRef(function Sidebar({ toggleSidebar }, ref) {
  const { profilePic, email, fullName } = useUser();
  const navigate = useNavigate();

  async function handleLogOut() {
    // To do: check for errors
    await logOutUser();
    navigate("/auth/login", { state: { "logOutMsg": "Successfully logged out!" } });
  }

  const mainNavPages = [
    {
      name: "dashboard",
      icon: <HouseIcon className={s.mainNavIcon} />
    },
    {
      name: "wallets",
      icon: <WalletIcon className={s.mainNavIcon} />
    },
    {
      name: "reflect",
      icon: <StatsIcon className={s.mainNavIcon} />
    },
  ]

  const secNavPages = [
    {
      name: "settings",
      icon: <SettingsIcon className={s.secNavIcon} />
    },
    {
      name: "categories",
      icon: <CategoriesIcon className={s.secNavIcon} />
    },
  ]

  const activeClasses = classNames(s.mainNavEl, s.active);

  const mainNavEls = mainNavPages.map((page, index) => {
    return (
      <li key={index}>
        <NavLink
          to={page.name}
          className={({ isActive }) => isActive ? activeClasses : s.mainNavEl}
          onClick={toggleSidebar}
        >
          {page.icon} {capitalize(page.name)}
        </NavLink>
      </li>
    )
  })


  const secNavEls = secNavPages.map((page, index) => {
    const isLogOut = page.name === "log out";
    return (
      <li key={index}>
        <NavLink
          to={page.name}
          className={s.secNavEl}
          onClick={toggleSidebar}
        >
          {page.icon} {capitalize(page.name)}
        </NavLink>
      </li>
    )
  })

  return (
    <div className={s.sidebar} ref={ref}>
      <div className={s.logoWrapper}>
        <img src={logo} />
      </div>
      <p className={s.slogan}>Take control of your finances</p>

      {profilePic ?
        <img src={profilePic} className={s.userIcon} />
        :
        <User className={s.userIcon} />
      }

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
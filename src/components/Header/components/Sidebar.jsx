import { NavLink, useLoaderData } from "react-router-dom";
import { forwardRef } from "react";

import logo from "@/assets/images/logos/logoNavyBg.png";

import User from "@/assets/icons/user-circle.svg?react";
import House from "@/assets/icons/house.svg?react";
import Wallet from "@/assets/icons/wallet.svg?react";
import Stats from "@/assets/icons/stats.svg?react";

import s from "../header.module.css";
import classNames from "classnames";

import capitalize from "@/utils/capitalize";

export default forwardRef(function Sidebar({ toggleSidebar }, ref) {
  // To do: implement the data base querying functions in the loader
  const loaderData = useLoaderData();

  const { profilePic, email, fullName } = loaderData;

  const mainNavPages = [
    {
      name: "dashboard",
      icon: <House className={s.mainNavIcon} />
    },
    {
      name: "wallets",
      icon: <Wallet className={s.mainNavIcon} />
    },
    {
      name: "reflect",
      icon: <Stats className={s.mainNavIcon} />
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
    </div>
  )
})
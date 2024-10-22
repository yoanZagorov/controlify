import logo from "logos/logoNavyBg.png";
import User from "@/assets/icons/user-circle.svg?react";
import House from "@/assets/icons/house.svg?react";
import Wallet from "@/assets/icons/wallet.svg?react";
import Stats from "@/assets/icons/stats.svg?react";

import s from "../header.module.css";
import { NavLink, useLoaderData } from "react-router-dom";

export default function Sidebar() {
  // To do: implement the data base querying functions in the loader
  const loaderData = useLoaderData();

  const { profilePic, email, fullName } = loaderData;

  const mainNavPages = [
    {
      name: "Dashboard",
      icon: <House />
    },
    {
      name: "Wallet",
      icon: <Wallet />
    },
    {
      name: "Reflect",
      icon: <Stats />
    },
  ]

  // To do: implement styles based on the state (active or not)
  // const mainNavEls = mainNavPages.map(page => {
  //   <li>
  //     <NavLink to={`/app/${page}`} className={}/>
  //   </li>
  // }) 

  return (
    <div className={s.sidebar}>
      <img src={logo} />
      <p className={s.slogan}>Take control of your finances</p>

      {profilePic ?
        <img src={profilePic} className={s.userIcon} />
        :
        <User className={s.userIcon} />
      }

      <p className={s.email}>john@doe.gmail.com</p>
      <p className={s.fullName}>John Doe</p>

      <nav className={s.navMain}>
        <ul>
          {/* {mainNavEls} */}
        </ul>
      </nav>
    </div>
  )
}
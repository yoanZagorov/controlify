import { useNavigate } from "react-router-dom";

import { getFirstName } from "@/utils/user";
import { useUser } from "@/utils/hooks";

import UserIcon from "@/assets/icons/user-circle.svg?react";
import logo from "@/assets/images/logos/logoNavyBg.png";

import s from "./DesktopHeader.module.css";
import { createNavElsFromPages } from "@/utils/components";

export default function DesktopHeader() {
  const navigate = useNavigate();

  const user = useUser();
  const { fullName, profilePic } = user;
  const displayName = getFirstName(fullName);

  const pages = ["dashboard", "wallets", "reflect", "settings"];

  const navElsClasses = ({ isActive }) => isActive ? s.navElActive : s.navEl;
  const navEls = createNavElsFromPages(pages, navElsClasses);

  return (
    <div className={s.topBar}>
      <img src={logo} className={s.logo} onClick={() => navigate("..")}/>

      <nav>
        <ul className={s.navUl}>
          {navEls}
        </ul>
      </nav>

      <div className={s.greetingContrainer}>
        <span className={s.greeting}>Hello, {displayName}</span>
        <div className={s.avatarWrapper}>
          {profilePic ?
            <img src={profilePic} className={s.profilePic} />
            :
            <UserIcon className={s.userIcon} />
          }
        </div>
      </div>
    </div>
  )
}
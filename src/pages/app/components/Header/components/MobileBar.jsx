import { useLocation } from "react-router-dom";

import Hamburger from "@/assets/icons/hamburger.svg?react";

import s from "../header.module.css";

import getCurrentPage from "@/utils/getCurrentPage";

export default function MobileBar({ toggleSidebar }) {
  const location = useLocation();
  const currentPage = getCurrentPage(location.pathname);

  return (
    <div className={s.mobileBar}>
      <button onClick={toggleSidebar}>
        <Hamburger className={s.hamburger} />
      </button>
      <p className={s.pageTitle}>{currentPage}</p>
    </div>
  )
}
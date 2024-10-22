import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import classNames from "classnames";

import Hamburger from "@/assets/icons/hamburger.svg?react";

import s from "../header.module.css";

import getCurrentPage from "@/utils/getCurrentPage";

import Sidebar from "./Sidebar";

export default function MobileHeader() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isSidebarOpen]);

  const handleOutsideClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarOpen(false);
    }
  }

  function toggleSidebar() {
    setSidebarOpen(wasOpen => !wasOpen);
  }

  const currentPage = getCurrentPage(location.pathname);

  const mobileBarClasses = isSidebarOpen 
    ? classNames(s.mobileBar, "invisible")
    : s.mobileBar;

  return (
    <>
      <div className={mobileBarClasses}>
        <button onClick={toggleSidebar}>
          <Hamburger className={s.hamburger} />
        </button>
        <p className={s.pageTitle}>{currentPage}</p>
      </div>

      {isSidebarOpen &&
        <Sidebar ref={sidebarRef} toggleSidebar={toggleSidebar} />
      }
    </>
  )
}
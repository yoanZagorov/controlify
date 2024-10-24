import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Sidebar } from "./Sidebar";

import getCurrentPage from "@/utils/generic/getCurrentPage";

import s from "./MobileHeader.module.css";
import Hamburger from "@/assets/icons/hamburger.svg?react";

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

  return (
    <>
      <div className={isSidebarOpen ? s.topBarClosed : s.topBar}>
        <button onClick={toggleSidebar}>
          <Hamburger className={s.hamburger} />
        </button>
        <p className={s.pageTitle}>{currentPage}</p>
      </div>

      <Sidebar ref={sidebarRef} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
    </>
  )
}
import cn from "classnames";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getCurrentPage } from "../../helpers";

import { SvgIcon } from "@/components/SvgIcon";
import { Sidebar } from "./components/Sidebar";

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

  const topBarCn = "page__wrapper fixed left-0 h-16 lm:h-20 flex items-center bg-navy z-10 shadow gap-4 transition-[top] duration-500 tab:duration-700";

  const topBarOpenedCn = cn(topBarCn, "top-0");
  const topBarClosedCn = cn(topBarCn, "-top-[4.5rem] lm:-top-[5.5rem]");

  return (
    <>
      <div
        className={isSidebarOpen ? topBarClosedCn : topBarOpenedCn}>
        <button onClick={toggleSidebar}>
          <SvgIcon iconName="hamburger" className="w-8 h-8 fill-gray-light" />
        </button>
        <p className="text-lg tab:text-xl text-gray-light font-medium">{currentPage}</p>
      </div>

      <Sidebar ref={sidebarRef} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
    </>
  )
}
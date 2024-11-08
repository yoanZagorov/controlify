import cn from "classnames";
import { useLocation } from "react-router-dom";

import { getCurrentPage } from "../../helpers";

import { SvgIcon } from "@/components/SvgIcon";
import { Sidebar } from "../components/Sidebar";
import { useLayout, useOutsideClick } from "@/hooks";
import { capitalize } from "@/utils/str";

export default function MobileHeader() {
  const { isSidebarExpanded, toggleSidebar } = useLayout();

  const location = useLocation();
  const currentPage = capitalize(getCurrentPage(location.pathname));

  const topBarClasses = cn(
    "page__wrapper fixed h-16 flex items-center gap-4 bg-navy z-10 shadow transition-[top] duration-500",
    isSidebarExpanded ? "-top-20" : "top-0"
  )

  return (
    <header>
      <div className={topBarClasses}>
        <button onClick={toggleSidebar}>
          <SvgIcon iconName="hamburger" className="size-8 fill-gray-light" />
        </button>
        <p className="text-lg text-gray-light font-medium">{currentPage}</p>
      </div>

      <Sidebar />
    </header>
  )
}
import cn from "classnames";
import { useLocation } from "react-router-dom";

import { useLayout } from "@/hooks"
import { capitalize } from "@/utils/str";
import { getCurrentPage } from "../utils"
  ;
import { SvgIcon } from "@/components/SvgIcon";

export default function TopBar() {
  const {
    sidebar: {
      isExpanded: isSidebarExpanded,
      toggle: toggleSidebar
    }
  } = useLayout();

  const location = useLocation();
  const currentPage = capitalize(getCurrentPage(location.pathname));

  const classes = {
    topBar: cn(
      "fixed w-screen h-16 px-4 tab:px-6 flex items-center gap-4 bg-navy z-10 shadow transition-[top] duration-300 tab:duration-500",
      isSidebarExpanded ? "-top-20" : "top-0"
    )
  }

  return (
    <div className={classes.topBar}>
      <button onClick={toggleSidebar} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-goldenrod">
        <SvgIcon iconName="hamburger" className="size-8 fill-gray-light " />
      </button>
      <p className="text-lg text-gray-light font-medium">{currentPage}</p>
    </div>
  )
}

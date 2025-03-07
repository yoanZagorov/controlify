import { Link, Outlet, useLoaderData } from "react-router";

import { PAGES } from "@/constants";

import { useScrollToTop } from "@/hooks";
import { formatEntityNameForUI } from "@/utils/formatting";

import BackArrow from "@/assets/icons/arrow-back.png";

import { NavItem } from "./layout-components/NavItem";

// The Wallet page layout
export default function Wallet() {
  useScrollToTop();

  const { wallet } = useLoaderData();

  const navElements = PAGES.WALLET.map((page, index) => (
    <NavItem key={index} page={page} index={index} />
  ))

  return (
    <div className="relative">
      <Link to=".." relative="path" className="inline-block" data-actionable={true}>
        <img src={BackArrow} />
      </Link>

      <h1 className="mt-5 text-5xl text-navy-dark font-bold">{formatEntityNameForUI(wallet.name)}</h1>
      <nav className="mt-6 w-full">
        <ul className="flex">
          {navElements}
        </ul>
      </nav>

      <div className="mt-12">
        <Outlet />
      </div>
    </div>
  )
}
import { Link, Outlet, useLoaderData } from "react-router"
import { nanoid } from "nanoid";

import BackArrow from "@/assets/icons/arrow-back.png";

import { useScrollToTop } from "@/hooks";
import { formatEntityName } from "@/utils/formatting";

import { NavItem } from "./layout-components/NavItem";

export default function Wallet() {
  const { wallet } = useLoaderData();
  useScrollToTop();

  const pages = ["overview", "transactions", "settings"];
  const navElements = pages.map((page, index) => (
    <NavItem key={nanoid()} page={page} index={index} />
  ))

  return (
    <>
      <Link to=".." relative="path">
        <img src={BackArrow} />
      </Link>

      <h1 className="mt-5 text-5xl text-navy-dark font-bold">{formatEntityName(wallet.name)}</h1>
      <nav className="mt-6 w-full">
        <ul className="flex">
          {navElements}
        </ul>
      </nav>

      <div className="mt-12">
        <Outlet />
      </div>
    </>
  )
}
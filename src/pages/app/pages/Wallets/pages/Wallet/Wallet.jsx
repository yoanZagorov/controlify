import { formatEntityName } from "@/utils/formatting";
import { Link, Outlet, useLoaderData } from "react-router"
import { NavItem } from "./layout-components/NavItem";
import BackArrow from "@/assets/icons/arrow-back.png";

export default function Wallet() {
  const { wallet } = useLoaderData();

  const formattedName = formatEntityName(wallet.name);

  const pages = ["overview", "transactions", "settings"];
  const navElements = pages.map((page, index) => (
    <li key={index} data-actionable="true" data-close="false">
      <NavItem key={index} page={page} index={index} />
    </li>
  ))

  return (
    <>
      <Link to=".." relative="path">
        <img src={BackArrow} />
      </Link>

      <h1 className="mt-5 text-5xl text-navy-dark font-bold">{formattedName}</h1>
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
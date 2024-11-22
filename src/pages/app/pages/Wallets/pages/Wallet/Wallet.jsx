import { formatEntityName } from "@/utils/formatting";
import { Link, Outlet, useLoaderData } from "react-router-dom"
import { NavItem } from "./layout-components/NavItem";

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
      <Link to=".." relative="path" className="text-gray-dark opacity-50 underline font-medium">
        &larr; Back to all wallets
      </Link>
      <h1 className="mt-2 text-5xl text-navy-dark font-bold">{formattedName} Wallet</h1>
      <nav className="mt-6 w-full">
        <ul className="flex">
          {navElements}
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
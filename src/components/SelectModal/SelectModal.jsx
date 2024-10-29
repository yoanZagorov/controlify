import { capitalize } from "@/utils/generic";
import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { SvgIcon } from "../SvgIcon";

export default function SelectModal({ name, closeModal, defaultOption }) {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const { wallets } = useRouteLoaderData("app");

  const walletsEls = wallets.map(wallet => {
    const isBalancePositive = wallet.balance >= 0;

    return (
      <li
        key={wallet.id}
        className="flex items-center gap-5"
      >
        <SvgIcon iconName={wallet.iconName} className="w-8 h-8 fill-gray-dark" />

        <div className="flex flex-col">
          <span className="text-lg text-gray-dark font-semibold">{capitalize(wallet.name)}</span>
          <span className={`-mt-1 ml-[1px] text-xs ${isBalancePositive ? "text-green-light" : "text-red-dark"} font-semibold`}>
            {wallet.currency} {isBalancePositive ? "+" : ""}{wallet.balance}
          </span>
        </div>

        <button
          type="button"
          className="ml-auto w-6 h-6 rounded-full bg-navy"
          onClick={() => setSelectedOption(wallet.name)}
        >
          <div className={`m-auto w-2.5 h-2.5 rounded-full ${wallet.name === selectedOption ? "bg-goldenrod" : "bg-gray-light"}`}></div>
        </button>
      </li>
    )
  })

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeModal}
        className="fixed bottom-0 left-0 h-screen w-screen border-gray-dark bg-gray-light opacity-30">
      </div>

      {/* Modal */}
      <div className="fixed bottom-0 left-0 h-1/3 w-screen p-6 rounded-lg border-t bg-gray-medium">
        <input type="hidden" name={name} value={selectedOption} />

        <span className="text-gray-dark font-semibold">Select Wallet</span>
        <ul className="mt-3 flex flex-col gap-4">
          {walletsEls}
        </ul>
      </div>
    </>
  )
}

import { useRouteLoaderData } from "react-router-dom";

import { capitalize } from "@/utils/generic";
import { useTransaction } from "@/utils/hooks";

import { SvgIcon } from "../SvgIcon";
import { Balance } from "../Balance";

export default function WalletModal({ closeModal }) {
  const { transactionData, updateTransactionData } = useTransaction();

  const { wallets } = useRouteLoaderData("app");

  function handleClick(selectedWallet) {
    updateTransactionData({ wallet: selectedWallet });
    closeModal();
  }

  const walletsEls = wallets.map(wallet => {
    return (
      <li
        key={wallet.id}
        className="flex items-center gap-5"
      >
        <SvgIcon iconName={wallet.iconName} className="w-8 h-8 fill-gray-dark" />

        <div className="flex flex-col">
          <span className="text-lg text-gray-dark font-semibold">{capitalize(wallet.name)}</span>
          <Balance
            balance={wallet.balance}
            currency={wallet.currency}
            type="dark"
            className="-mt-1 ml-[1px] text-xs font-semibold"
          />
        </div>

        <button
          type="button"
          className="ml-auto w-6 h-6 rounded-full bg-navy"
          onClick={() => handleClick(wallet.name)}
        >
          <div className={`m-auto w-2.5 h-2.5 rounded-full ${wallet.name === transactionData.wallet ? "bg-goldenrod" : "bg-gray-light"}`}></div>
        </button>
      </li>
    )
  })

  return (
    <ul className="mt-3 flex flex-col gap-4">
      {walletsEls}
    </ul>
  )
}

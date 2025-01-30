import cn from "classnames";
import { useRouteLoaderData } from "react-router";

import { formatEntityName } from "@/utils/formatting";

import { SvgIcon } from "@/components/SvgIcon";
import { Amount } from "@/components/Amount";

export default function WalletModal({ closeModal, state }) {
  const { userData: { wallets } } = useRouteLoaderData("app");

  const [wallet, setWallet] = [state.value, state.updateState];

  function handleClick(selectedWallet) {
    closeModal();
    setWallet(selectedWallet);
  }

  const getSelectedWalletIndicatorClasses = function (walletName) {
    return cn(
      "size-2.5 rounded-full",
      walletName === wallet.name ? "bg-goldenrod" : "bg-gray-light"
    )
  }

  const walletsEls = wallets.map(wallet => (
    <li key={wallet.id}>
      <button
        type="button"
        onClick={() => handleClick({ name: wallet.name, id: wallet.id, currency: wallet.currency })}
        className="w-full flex items-center gap-5 bg-gray-light p-4 rounded-lg focus-goldenrod"
      >
        <SvgIcon iconName={wallet.iconName} className="size-7" fill={wallet.color} />

        <div className="flex flex-col text-left">
          <span className="font-semibold" style={{ color: wallet.color }}>{formatEntityName(wallet.name)}</span>
          <Amount
            amount={wallet.balance}
            currency={wallet.currency}
            colorContext="light"
            className="-mt-1 text-xs font-semibold"
          />
        </div>

        <div className="ml-auto size-6 rounded-full bg-navy flex justify-center items-center">
          <div className={getSelectedWalletIndicatorClasses(wallet.name)}></div>
        </div>
      </button>
    </li>
  ))

  return (
    <ul className="flex flex-col gap-4">
      {walletsEls}
    </ul>
  )
}

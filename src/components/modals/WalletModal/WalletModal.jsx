import { useRouteLoaderData } from "react-router-dom";
import cn from "classnames";

import formatEntityName from "@/utils/formatting/formatEntityName";

import { SvgIcon } from "@/components/SvgIcon";
import { Amount } from "@/components/Amount";

export default function WalletModal({ closeModal, state }) {
  const [walletInState, setWalletInState] = [state.value, state.updateState];

  const { userData: { wallets } } = useRouteLoaderData("app");

  function handleClick(selectedWallet) {
    closeModal();
    setWalletInState(selectedWallet);
  }

  const selectIndicatorClasses = function (walletName) {
    return cn(
      "size-2.5 rounded-full",
      walletName === walletInState.name ? "bg-goldenrod" : "bg-gray-light"
    )
  }

  const walletsEls = wallets.map(wallet => (
    <li key={wallet.id}>
      <button type="button" onClick={() => handleClick({ name: wallet.name, id: wallet.id })} className="w-full flex items-center gap-5">
        <SvgIcon iconName={wallet.iconName} className="size-8 fill-gray-dark" />

        <div className="flex flex-col">
          <span className="text-left  text-gray-dark font-semibold">{formatEntityName(wallet.name)}</span>
          <Amount
            amount={wallet.balance}
            currency={wallet.currency}
            colorContext="light"
            className="-mt-1 text-xs font-semibold"
          />
        </div>

        <div className="ml-auto size-6 rounded-full bg-navy flex justify-center items-center">
          <div className={selectIndicatorClasses(wallet.name)}></div>
        </div>
      </button>
    </li>
  ))

  return (
    <ul className="mt-3 flex flex-col gap-4">
      {walletsEls}
    </ul>
  )
}

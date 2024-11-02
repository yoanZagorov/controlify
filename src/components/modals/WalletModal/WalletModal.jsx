import { useRouteLoaderData } from "react-router-dom";

import { capitalize } from "@/utils/generic";

import { SvgIcon } from "@/components/SvgIcon";
import { Balance } from "@/components/Balance";

export default function WalletModal({ closeModal, state }) {
  const [walletInState, setWalletInState] = [state.value, state.updateState];

  const { wallets } = useRouteLoaderData("app");

  function handleClick(selectedWallet) {
    closeModal();
    setWalletInState(selectedWallet);
  }

  const walletsEls = wallets.map(wallet => {
    const { name, id } = wallet;

    return (
      <li
        key={wallet.id}
      >
        <button type="button" onClick={() => handleClick({ name, id })} className="w-full flex items-center gap-5">
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

          <div className="ml-auto w-6 h-6 rounded-full bg-navy flex justify-center items-center">
            <div className={`w-2.5 h-2.5 rounded-full ${wallet.name === walletInState.name ? "bg-goldenrod" : "bg-gray-light"}`}></div>
          </div>
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

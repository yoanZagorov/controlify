import { useRef } from "react";
import cn from "classnames";

import { formatEntityNameForUI } from "@/utils/formatting";

import { SvgIcon } from "@/components/SvgIcon";
import { Amount } from "@/components/Amount";
import { useAutoFocus } from "@/hooks";

export default function WalletModal({ wallets, closeModal, state }) {
  const activeWalletBtnRef = useRef(null);
  useAutoFocus({ ref: activeWalletBtnRef });

  function handleClick(selectedWallet) {
    closeModal();
    state.updateState(selectedWallet);
  }

  const walletsEls = wallets.map(({ id, name, iconName, balance, currency, color }) => {
    const isActive = state.value.name === name;

    return (
      <li key={id}>
        <button
          ref={isActive ? activeWalletBtnRef : null}
          type="button"
          onClick={() => handleClick({ name, id, currency })}
          className="w-full flex items-center gap-5 bg-gray-light p-4 rounded-lg focus-goldenrod"
        >
          <SvgIcon iconName={iconName} className="size-7" fill={color} />

          <div className="flex flex-col text-left">
            <span className="font-semibold" style={{ color }}>{formatEntityNameForUI(name)}</span>
            <Amount
              amount={balance}
              currency={currency}
              colorContext="light"
              className="-mt-1 text-xs font-semibold"
            />
          </div>

          <div className="ml-auto size-6 rounded-full bg-navy flex justify-center items-center">
            <div className={cn("size-2.5 rounded-full", isActive ? "bg-goldenrod" : "bg-gray-light")}></div>
          </div>
        </button>
      </li>
    );
  })

  return (
    <ul className="flex flex-col gap-4">
      {walletsEls}
    </ul>
  )
}

import { useState, useEffect } from "react";

import { Widget, WidgetWrapper } from "@/components/Widget";

import ScaleIcon from "@/assets/icons/scale.svg?react";
import WalletIcon from "@/assets/icons/wallet.svg?react";

import PlusCircleIcon from "./PlusCircle";
import { useRouteLoaderData } from "react-router-dom";
import { capitalize } from "@/utils/generic";

export default function Dashboard() {
  const [flashMsg, setFlashMsg] = useState(null);

  const { user, balance, wallets } = useRouteLoaderData("app");
  const { defaultCurrency } = user;

  useEffect(() => {
    const createAccountMsg = sessionStorage.getItem("createAccountMsg");
    const loginMsg = sessionStorage.getItem("loginMsg");

    if (createAccountMsg) {
      setFlashMsg(createAccountMsg);
      sessionStorage.removeItem("createAccountMsg");
    } else if (loginMsg) {
      setFlashMsg(loginMsg);
      sessionStorage.removeItem("loginMsg");
    }
  }, []);

  const walletEls = wallets.map(wallet => (
    <Widget key={wallet.id}
      // To do: implement actual icon storage and pull it from the database
      icon={<WalletIcon className="w-5 h-5 fill-gray-dark" />}
      title={capitalize(wallet.name)}
      classes="h-full"
    >
      <h4 className="mt-0 text-navy-dark text-lg font-bold">{wallet.currency} {wallet.balance}</h4>
    </Widget>
  ))

  return (
    <div className="w-screen px-4 mt-24">
      {flashMsg && <p className="text-lg text-green-light text-center">{flashMsg}</p>}

      <h2 className="text-3xl text-navy-dark font-semibold tracking-wide">Balance</h2>
      <Widget
        icon={<ScaleIcon className="w-5 h-5 fill-gray-dark" />}
        title="Current"
      >
        <h3 className="mt-3 text-navy-dark text-2xl font-bold">{defaultCurrency} {balance}</h3>
      </Widget>

      <div className="mt-10 max-w-[600px]">
        <h2 className="text-3xl text-navy-dark font-semibold tracking-wide mt-10">Wallets</h2>

        <div className="flex flex-col mm:flex-row h-28 gap-6">
          {walletEls}

          <WidgetWrapper
            classes="items-center h-full"
          >
            <h4 className="text-navy-dark font-bold">Add Wallet</h4>
            <button className="mt-1.5 w-12 h-12 rounded-full">
              <PlusCircleIcon size="48" />
            </button>
          </WidgetWrapper>
        </div>
      </div>
    </div>
  )
}
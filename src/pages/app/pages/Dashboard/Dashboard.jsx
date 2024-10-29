import { useState, useEffect, Suspense } from "react";

import { TransactionModal } from "@/components/TransactionModal";
import { Transaction, Widget, WidgetSection } from "./components";

import ScaleIcon from "@/assets/icons/scale.svg?react";
import CashWalletIcon from "@/assets/icons/wallet.svg?react";
import CalendarIcon from "@/assets/icons/calendar.svg?react";
import ShoppingCartIcon from "@/assets/icons/shopping-cart.svg?react";

import PlusCircleIcon from "./PlusCircle";
import { useRouteLoaderData } from "react-router-dom";
import { capitalize } from "@/utils/generic";
import { Button } from "@/components/Button";
import { openTransactionModal } from "@/utils/transaction";
import { LazySvg } from "@/components/LazySvg";
import { SvgIcon } from "@/components/SvgIcon";
import { useScrollLock } from "@/utils/hooks";
import { TransactionProvider } from "@/contexts";

export default function Dashboard() {
  const [flashMsg, setFlashMsg] = useState(null);
  const [isTransactionModalOpen, setTransactionModalOpen] = useScrollLock(false);

  const { user, wallets, categories, balance, todayTransactionsByWallet } = useRouteLoaderData("app");

  const { defaultCurrency } = user;


  // To do: create a custom hook and/or context for notifications 
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

  // Check if the user has any transactions
  let hasTransactions;
  for (const wallet of todayTransactionsByWallet) {
    if (wallet.transactions.length > 0) {
      hasTransactions = true;
      break;
    }
  }

  const walletWidgets = wallets.map(wallet => {
    const WalletIcon =
      <LazySvg iconName={wallet.iconName} className="w-5 h-5 fill-gray-dark" />
      ||
      <CashWalletIcon className="w-5 h-5 fill-gray-dark" />

    return (
      <Widget key={wallet.id}
        // To do: implement actual icon storage and pull it from the database
        icon={WalletIcon}
        widgetTitle={capitalize(wallet.name)}
      >
        <h4 className="text-navy-dark mt-0 text-lg font-bold">{wallet.currency} {wallet.balance}</h4>
      </Widget>
    )
  })

  // const isWalletsEven = wallets.length % 2 === 0;
  return (
    <>
      <div className={`page__wrapper mt-24 lm:mt-32 self-center tab:max-w-[calc(theme('screens.lm')-2*2.5rem)]`}>
        {flashMsg && <p className="text-lg text-green-light text-center">{flashMsg}</p>}

        <div className="grid grid-cols-1 tab:grid-cols-10 tab:grid-flow-col tab:grid-rows-[auto,1fr] gap-14 rounded-b-lg">
          <WidgetSection
            title="Balance"
            containsWidget
            icon={<ScaleIcon className="w-5 h-5 fill-gray-dark" />}
            widgetTitle="Current"
            className="tab:col-span-6 tab:row-span-1"
          >
            <h3 className="mt-3 text-navy-dark text-2xl font-bold">{defaultCurrency} {balance}</h3>
          </WidgetSection>

          <WidgetSection
            title="Wallets"
            className="tab:col-span-6 tab:row-span-1"
          >
            <div className="grid grid-cols-2 w-full gap-5">
              {walletWidgets}

              <Widget
                type="wrapper"
                className={`items-center`}
              >
                <h4 className="text-navy-dark text-lg font-bold">Add Wallet</h4>
                {/* To do: make this button use the btn primary classes */}
                <button className="mt-1.5 w-12 h-12 rounded-full focus:outline-none focus-visible:ring-goldenrod">
                  <PlusCircleIcon size="48" />
                </button>
              </Widget>
            </div>
          </WidgetSection>

          <WidgetSection
            title="Transactions"
            containsWidget
            icon={<CalendarIcon className="w-5 h-5 fill-gray-dark" />}
            widgetTitle="Today"
            className="tab:col-span-4 tab:row-span-2 h-full flex flex-col"
            widgetClasses="flex-grow"
          >
            <div className="flex-grow mt-2 p-3 bg-gray-light rounded-lg flex flex-col gap-4">
              {hasTransactions ? (
                <ul className="flex flex-col gap-4">
                  {/* To do: implement real transaction data */}
                  <Transaction
                    type="expense"
                    icon={<ShoppingCartIcon className="w-7 ml:w-8 h-7 ml:h-8 fill-navy" />}
                    category="groceries"
                    wallet={{ name: "cash", icon: <CashWalletIcon className="w-2.5 ml:w-3 h-2.5 ml:h-3 fill-navy opacity-50" /> }}
                    amount="200"
                    defaultCurrency="BGN"
                  >
                  </Transaction>
                </ul>
              ) : (
                <p className="text-navy-dark text-center font-semibold max-w-[350px] min-[375px]:max-tab:self-center">Oops... It looks like you haven’t made any transactions yet today. Add one now!</p>
              )}
              <Button
                size="s"
                className="ll:rounded-xl min-[375px]:max-tab:w-[285px] min-[375px]:max-tab:self-center"
                onClick={() => setTransactionModalOpen(true)}
              >
                Add Transaction
              </Button>
            </div>
          </WidgetSection>
        </div>

      </div>

      {isTransactionModalOpen &&
        <TransactionProvider>
          <TransactionModal
            closeModal={() => setTransactionModalOpen(false)}
          />
        </TransactionProvider>
      }
    </>
  )
}
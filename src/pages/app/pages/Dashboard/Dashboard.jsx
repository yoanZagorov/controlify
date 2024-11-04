import { useActionData, useRouteLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

import { TransactionProvider } from "@/contexts";

import { capitalize } from "@/utils/generic";
import { useMountTransition, useScrollLock } from "@/utils/hooks";

import { Button } from "@/components/Button";
import { LazySvg } from "@/components/LazySvg";
import { SvgIcon } from "@/components/SvgIcon";
import { TransactionModal } from "@/components/modals/TransactionModal";
import { Transaction, Widget, WidgetSection } from "./components";

import PlusCircleIcon from "./PlusCircle";
import { formatBalance } from "@/utils/formatting";
import { Balance } from "@/components/Balance";
import cn from "classnames";

export default function Dashboard() {
  const [flashMsg, setFlashMsg] = useState(null);
  const [isTransactionModalOpen, setTransactionModalOpen] = useScrollLock(false);
  const hasTransitioned = useMountTransition(isTransactionModalOpen, 300);

  const actionData = useActionData();
  const { success, msg, resetKey } = actionData ?? {};

  const { user, wallets, balance, todayTransactionsByWallet } = useRouteLoaderData("app");
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

  useEffect(() => {
    if (success) {
      setTransactionModalOpen(false);
    }
  }, [success, resetKey])

  const hasTransactions = todayTransactionsByWallet.find(wallet => wallet.transactions.length > 0);

  const transactionEls = hasTransactions ? todayTransactionsByWallet.map(wallet => (
    wallet.transactions.map(transaction => (
      <li key={transaction.id}>
        <Transaction
          type={transaction.category.type}
          category={{ name: transaction.category.name, icon: <SvgIcon iconName={transaction.category.iconName} className="w-7 ml:w-8 h-7 ml:h-8 fill-navy" /> }}
          wallet={{ name: transaction.wallet.name, icon: <SvgIcon iconName={transaction.wallet.iconName} className="w-2.5 ml:w-3 h-2.5 ml:h-3 fill-navy opacity-50" /> }}
          amount={transaction.amount}
          currency={transaction.wallet.currency}
        >
        </Transaction>
      </li>
    ))
  )) : null;

  const widgetIconClasses = "w-5 h-5 fill-gray-dark";

  const walletWidgets = wallets.map(wallet => {
    const WalletIcon =
      <LazySvg iconName={wallet.iconName} className={widgetIconClasses} />
      ||
      <SvgIcon iconName="wallet" className={widgetIconClasses} />

    return (
      <Widget key={wallet.id}
        icon={WalletIcon}
        widgetTitle={capitalize(wallet.name)}
      >
        <Balance
          balance={wallet.balance}
          currency={wallet.currency}
          type="dark"
          className="mt-0 text-lg font-bold"
        />
      </Widget>
    )
  })

  return (
    <>
      <div className="page__wrapper mt-24 lm:mt-32 self-center tab:max-w-[calc(theme('screens.lm')-2*2.5rem)]">
        {flashMsg && <p className="text-lg text-green-light text-center">{flashMsg}</p>}
        {msg && <p className="text-lg text-green-light text-center">{msg}</p>}

        <div className="grid grid-cols-1 tab:grid-cols-10 tab:grid-flow-col tab:grid-rows-[auto,1fr] gap-14 rounded-b-lg">
          <WidgetSection
            title="Balance"
            containsWidget
            icon={<SvgIcon iconName="scale" className={widgetIconClasses} />}
            widgetTitle="Current"
            className="tab:col-span-6 tab:row-span-1"
          >
            <Balance
              balance={balance}
              currency={defaultCurrency}
              type="dark"
              className="mt-3 text-2xl font-bold"
            />
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
            icon={<SvgIcon iconName="calendar" className={widgetIconClasses} />}
            widgetTitle="Today"
            className="tab:col-span-4 tab:row-span-2 h-full flex flex-col"
            widgetClasses="flex-grow"
          >
            <div className="flex-grow mt-2 p-3 bg-gray-light rounded-lg flex flex-col gap-6">
              {hasTransactions ? (
                <ul className="flex flex-col gap-4">
                  {/* To do: implement real transaction data */}
                  {transactionEls}
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

      {(isTransactionModalOpen || hasTransitioned) &&
        <TransactionProvider>
          <TransactionModal
            closeModal={() => setTransactionModalOpen(false)}
            isTransactionModalOpen={isTransactionModalOpen}
            hasTransitioned={hasTransitioned}
          />
        </TransactionProvider>
      }
    </>
  )
}
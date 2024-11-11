import { useEffect, useState } from "react";
import { useActionData, useLoaderData, useRouteLoaderData } from "react-router-dom";

import { TransactionProvider } from "@/contexts";

import { useLayout, useMountTransition, useScreenWidth, useScrollLock } from "@/hooks";
import { capitalize } from "@/utils/str";

import { Balance } from "@/components/Balance";
import { Button } from "@/components/Button";
import { LazySvg } from "@/components/LazySvg";
import { SvgIcon } from "@/components/SvgIcon";
import { TransactionModal } from "@/components/modals/TransactionModal";
import { Transaction, Widget, WidgetSection } from "./components";
import PlusCircleIcon from "./PlusCircle";
import { Notification } from "@/components/Notification";
import { Quote } from "@/components/Quote";
import cn from "classnames";

export default function Dashboard() {
  const {
    sidebar: {
      isExpanded: isSidebarExpanded
    },
    breakpoints: {
      isMobile,
      isTablet,
      isDesktop
    }
  } = useLayout();

  const { user, wallets, balance, todayTransactionsByWallet } = useRouteLoaderData("app");
  const { defaultCurrency } = user;

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  useScrollLock(isTransactionModalOpen);
  const hasTransitioned = useMountTransition(isTransactionModalOpen, 300);

  const { redirectData, quote } = useLoaderData();
  const {
    msg: redirectflashMsg,
    msgType: redirectMsgType
  } = redirectData ?? {};

  const {
    msg: actionMsg,
    msgType: actionMsgType,
    success,
    resetKey
  } = useActionData() ?? {};

  const msg = redirectflashMsg || actionMsg || null;
  const msgType = redirectMsgType || actionMsgType || null;

  // To do: implement a better way to close the modal on transaction completion
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
          // To do: replace the icon with an icon name
          category={{ name: transaction.category.name, icon: <SvgIcon iconName={transaction.category.iconName} className="w-7 ml:w-8 h-7 ml:h-8 fill-navy" /> }}
          // To do: replace the icon with an icon name
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

  const gridClasses = cn(
    "mt-6 grid gap-10 ll:gap-14 fhd:gap-16 rounded-b-lg",
    isMobile || (isTablet && isSidebarExpanded)
      ? "grid-cols-1"
      : "tab:grid-cols-10 tab:grid-flow-col tab:grid-rows-[auto,1fr]",
  )

  return (
    <>
      <>
        <Widget type="wrapper" size="s">
          {msg ? (
            <Notification type={msgType}>
              {msg}
            </Notification>
          ) : (
            <Quote quote={quote} />
          )}
        </Widget >

        <div className={gridClasses}>
          <WidgetSection
            title="Balance"
            containsWidget
            icon={<SvgIcon iconName="scale" className={widgetIconClasses} />}
            widgetTitle="Current"
            className="tab:col-span-5 tab:row-span-1"
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
            className="tab:col-span-5 tab:row-span-1"
          >
            <div className="grid grid-cols-2 w-full gap-5">
              {walletWidgets}

              <Widget
                type="wrapper"
                className={`items-center mt-2`}
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
            className="tab:col-span-5 tab:row-span-2 h-full flex flex-col"
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
                onClick={() => setTransactionModalOpen(true)}
                className="ll:rounded-xl min-[375px]:max-tab:w-[285px] min-[375px]:max-tab:self-center focus:ring-2"
              >
                Add Transaction
              </Button>
            </div>
          </WidgetSection>
        </div>
      </>

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
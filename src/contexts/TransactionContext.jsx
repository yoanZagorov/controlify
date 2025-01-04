import { createContext, useState } from "react"
import { useRouteLoaderData } from "react-router";

export const TransactionContext = createContext(null);

export default function TransactionProvider({ prepopulatedTransactionData = null, wallet = null, children }) {
  const { userData: { wallets } } = useRouteLoaderData("app");

  const defaultWallet = wallets.find(wallet => wallet.isDefault);

  const { name: walletName, id: walletId, currency: walletCurrency } = wallet ? wallet : defaultWallet;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const defaultTransactionData = prepopulatedTransactionData
    ? prepopulatedTransactionData
    : {
      amount: "0",
      wallet: {
        id: walletId,
        name: walletName,
        isPreselected: wallet ? true : false
      },
      currency: walletCurrency, // Plan to give the ability to change currency at a later stage
      category: {
        id: "",
        name: "choose",
        type: ""
      },
      date: today,
      // hour: To do
    }

  const [transactionData, setTransactionData] = useState(defaultTransactionData)

  function updateTransactionData(newTransactionData) {
    setTransactionData(prevTransactionData => ({
      ...prevTransactionData,
      ...newTransactionData
    }))
  }

  function resetTransactionData() {
    setTransactionData(defaultTransactionData);
  }

  return (
    <TransactionContext.Provider value={{ transactionData, defaultTransactionData, updateTransactionData, resetTransactionData }}>
      {children}
    </TransactionContext.Provider>
  )
}

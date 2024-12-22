import { createContext, useState } from "react"
import { useRouteLoaderData } from "react-router";

export const TransactionContext = createContext(null);

export default function TransactionProvider({ wallet = null, children }) {
  const { userData: { wallets } } = useRouteLoaderData("app");

  const defaultWallet = wallets.find(wallet => wallet.isDefault);

  const { name: walletName, id: walletId, currency } = wallet ? wallet : defaultWallet;

  const defaultTransactionData = {
    amount: "0",
    wallet: {
      id: walletId,
      name: walletName,
      isPreselected: wallet ? true : false
    },
    currency, // Plan to give the ability to change currency at a later stage
    category: {
      id: "",
      name: "choose",
      type: ""
    },
    date: new Date(),
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
    <TransactionContext.Provider value={{ transactionData, updateTransactionData, resetTransactionData }}>
      {children}
    </TransactionContext.Provider>
  )
}

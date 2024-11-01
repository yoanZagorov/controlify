import { createContext, useState } from "react"
import { useRouteLoaderData } from "react-router-dom";

export const TransactionContext = createContext(null);

export default function TransactionProvider({ children }) {
  const { wallets } = useRouteLoaderData("app");

  const defaultWallet = wallets.find(wallet => wallet.isDefault);

  const walletName = defaultWallet.name;
  const currency = defaultWallet.currency;

  const [transactionData, setTransactionData] = useState({
    amount: "0",
    wallet: walletName,
    currency,
    category: {
      name: "choose",
      id: null
    },
    categoriesType: "expenses",
    date: new Date()
  })

  function updateTransactionData(newTransactionData) {
    setTransactionData(prevTransactionData => ({
      ...prevTransactionData,
      ...newTransactionData
    }))
  }

  return (
    <TransactionContext.Provider value={{ transactionData, updateTransactionData }}>
      {children}
    </TransactionContext.Provider>
  )
}

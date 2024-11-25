import { createContext, useState } from "react"
import { useRouteLoaderData } from "react-router";

export const TransactionContext = createContext(null);

export default function TransactionProvider({ children }) {
  const { userData: { wallets } } = useRouteLoaderData("app");

  const defaultWallet = wallets.find(wallet => wallet.isDefault);

  const [transactionData, setTransactionData] = useState({
    amount: "0",
    wallet: {
      name: defaultWallet.name,
      id: defaultWallet.id
    },
    currency: defaultWallet.currency, // Plan to give the ability to change currency at a later stage
    category: {
      name: "choose",
      type: "",
      id: ""
    },
    date: new Date(),
    // hour: To do
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

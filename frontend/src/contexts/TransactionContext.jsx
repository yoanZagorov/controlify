import { isObjTruthy } from "@/utils/obj";
import { createContext, useState } from "react"
import { useRouteLoaderData } from "react-router";

// Used to keep the state for transaction submissions and updates
// The providedTransactionData is used when the operation is a transaction update so there already is initial data
// The providedWallet is used when the wallet should be set to a certain value and not change
export const TransactionContext = createContext(null);

export default function TransactionProvider({ providedTransactionData = {}, providedWallet = null, children }) {
  const { userData: { wallets } } = useRouteLoaderData("app");
  const defaultWallet = wallets.find(wallet => wallet.isDefault);
  // If there is a provided wallet - use it. Else - fallback to the default one
  const { name: walletName, id: walletId, currency: walletCurrency } = providedWallet ? providedWallet : defaultWallet;

  // The default transaction data can be either provided (in the context of editing a transaction) or not (creating a new one)
  // The wallet of the transaction could be locked (when the modal is used on a single wallet's transactions page) or not  
  const defaultTransactionData = isObjTruthy(providedTransactionData)
    ? {
      ...providedTransactionData,
      wallet: providedWallet
        ? { ...providedWallet, isLocked: true }
        : { ...providedTransactionData.wallet, isLocked: false },
    } : {
      amount: "0",
      wallet: {
        id: walletId,
        name: walletName,
        isLocked: providedWallet ? true : false
      },
      currency: walletCurrency, // To do (maybe) (Non-MVP): Give the ability to change currency 
      category: {
        id: "",
        name: "choose",
      },
      type: "",
      date: new Date(), // default to today
      // To do: give the ability to select the specific hour
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

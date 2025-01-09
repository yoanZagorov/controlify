import { createContext, useState } from "react"
import { useRouteLoaderData } from "react-router";

export const WalletSubmissionContext = createContext(null);

export default function WalletSubmissionProvider({ children }) {
  const DEFAULT_WALLET_COLOR = "#004D40";

  const { userData: { user, categories: userCategories } } = useRouteLoaderData("app");

  const defaultWalletData = {
    name: "New Wallet",
    initialBalance: "0",
    currency: user.currency,
    categories: userCategories.map(category => ({ ...category, isVisible: true })),
    color: DEFAULT_WALLET_COLOR
  }

  const [walletData, setWalletData] = useState(defaultWalletData);

  function updateWalletData(newWalletData) {
    return setWalletData(prevWalletData => ({
      ...prevWalletData,
      ...newWalletData
    }))
  }

  function resetWalletData() {
    setWalletData(defaultWalletData);
  }

  return (
    <WalletSubmissionContext.Provider value={{ walletData, defaultWalletData, updateWalletData, resetWalletData }}>
      {children}
    </WalletSubmissionContext.Provider>
  )
}

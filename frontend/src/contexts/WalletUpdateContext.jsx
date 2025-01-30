import { formatEntityName } from "@/utils/formatting";
import { createContext, useState } from "react"
import { useRouteLoaderData } from "react-router";

export const WalletUpdateContext = createContext(null);

export default function WalletUpdateProvider({ children }) {
  const { userData: { categories: userCategories } } = useRouteLoaderData("app");
  const { wallet: { name, currency, color, categories: walletCategories } } = useRouteLoaderData("wallet");

  function getCurrentCategories() {
    const currentCategories = userCategories.map(userCategory => {
      const currentWalletCategory = walletCategories.find(walletCategory => walletCategory.id === userCategory.id);

      return {
        ...userCategory,
        isVisible: currentWalletCategory.isVisible
      }
    })

    return currentCategories;
  }

  const defaultWalletData = {
    name: formatEntityName(name),
    categories: getCurrentCategories(),
    currency,
    color
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
    <WalletUpdateContext.Provider value={{ walletData, defaultWalletData, updateWalletData, resetWalletData }}>
      {children}
    </WalletUpdateContext.Provider>
  )
}

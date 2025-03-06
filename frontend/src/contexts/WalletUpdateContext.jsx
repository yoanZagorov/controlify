import { createContext, useState } from "react"
import { useRouteLoaderData } from "react-router";

import { formatEntityNameForUI } from "@/utils/formatting";

// Used to keep the state for updating an existing wallet
export const WalletUpdateContext = createContext(null);

export default function WalletUpdateProvider({ children }) {
  const { userData: { categories: userCategories } } = useRouteLoaderData("app");
  const { wallet: { name, currency, color, categoriesVisibility: walletCategoriesVisibilityMap } } = useRouteLoaderData("wallet");

  const defaultWalletData = {
    name: formatEntityNameForUI(name),
    categories: userCategories.map(category => ({ ...category, isVisible: walletCategoriesVisibilityMap[category.id] })),
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

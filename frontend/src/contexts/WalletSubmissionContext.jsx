import { createContext, useState } from 'react'
import { useRouteLoaderData } from 'react-router'

import { COLORS } from '#/constants'

// Used to keep the state for adding a new wallet
export const WalletSubmissionContext = createContext(null)

export default function WalletSubmissionProvider({ children }) {
  const {
    userData: { currency, categories: userCategories },
  } = useRouteLoaderData('app')

  const defaultWalletData = {
    name: 'New Wallet',
    initialBalance: '0',
    currency,
    categories: userCategories.map((category) => ({
      ...category,
      isVisible: true,
    })), // keeping all of the properties of the category since it's used for the UI
    color: COLORS.ENTITIES.DEFAULT_WALLET_COLOR,
  }

  const [walletData, setWalletData] = useState(defaultWalletData)

  function updateWalletData(newWalletData) {
    return setWalletData((prevWalletData) => ({
      ...prevWalletData,
      ...newWalletData,
    }))
  }

  function resetWalletData() {
    setWalletData(defaultWalletData)
  }

  return (
    <WalletSubmissionContext.Provider
      value={{
        walletData,
        defaultWalletData,
        updateWalletData,
        resetWalletData,
      }}
    >
      {children}
    </WalletSubmissionContext.Provider>
  )
}

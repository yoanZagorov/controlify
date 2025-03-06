import { createContext, useState } from "react"
import { useRouteLoaderData } from "react-router";

// Used to keep the state for profile settings updates
export const SettingsContext = createContext(null);

export default function SettingsProvider({ children }) {
  const { userData: { profilePic, fullName, email, currency }, categories } = useRouteLoaderData("app");

  const defaultSettingsData = {
    profilePic,
    fullName,
    email,
    currency,
    categories
  }

  const [settingsData, setSettingsData] = useState(defaultSettingsData);

  function updateSettingsData(newSettingsData) {
    return setSettingsData(prevSettingsData => ({
      ...prevSettingsData,
      ...newSettingsData
    }))
  }

  function resetSettingsData() {
    setSettingsData(defaultSettingsData);
  }

  return (
    <SettingsContext.Provider value={{ settingsData, defaultSettingsData, updateSettingsData, resetSettingsData }}>
      {children}
    </SettingsContext.Provider>
  )
}
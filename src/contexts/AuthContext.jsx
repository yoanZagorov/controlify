import { createContext, useState } from "react"

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const defaultAuthData = {
    email: "",
    password: "",
    fullName: ""
  }

  const [authData, setAuthData] = useState(defaultAuthData);

  function updateAuthData(newAuthData) {
    setAuthData(prevAuthData => ({
      ...prevAuthData,
      ...newAuthData
    }))
  }

  function resetAuthData() {
    setAuthData(defaultAuthData);
  }

  return (
    <AuthContext.Provider value={{ authData, updateAuthData, resetAuthData }}>
      {children}
    </AuthContext.Provider>
  )
}

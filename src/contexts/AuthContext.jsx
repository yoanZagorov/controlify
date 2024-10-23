import { createContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "services/firebase/firebase.config";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (userObj) => {
  //     setUser(userObj);
  //     // Used localStorage because auth.currentUser is initially null, so it doesn't work with the app loader 
  //     localStorage.setItem("isUser", userObj ? true : false);
  //   });

  //   return () => localStorage.removeItem("isUser");
  // }, [])

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

import { createContext, useEffect, useState } from "react";

import { getAuthUser } from "@/utils/auth";
import { getUser } from "services/firebase/db/user";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const authUser = await getAuthUser();

      if (authUser) {
        const user = await getUser(authUser.uid);
        setUser(user);
      }
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

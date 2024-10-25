import { createContext, useEffect, useState } from "react";

import { getAuthUserId } from "@/utils/auth";
import { getUser } from "services/firebase/db/user";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const authUserId = await getAuthUserId();

      if (authUserId) {
        const user = await getUser(authUserId);
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

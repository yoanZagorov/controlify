import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "services/firebase/firebase.config";

import { useAuth } from "@/utils/hooks";

import { Button } from "@/components/Button";


export default function Dashboard() {  
  const [flashMsg, setFlashMsg] = useState(null);
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const createAccountMsg = sessionStorage.getItem("createAccountMsg");
    const loginMsg = sessionStorage.getItem("loginMsg");
    
    if (createAccountMsg) {
      setFlashMsg(createAccountMsg);
      sessionStorage.removeItem("createAccountMsg");
    } else if (loginMsg) {
      setFlashMsg(loginMsg);
      sessionStorage.removeItem("loginMsg");
    }
  }, []);
  
  const displayName = user?.displayName || null;

  // Temp sign out func for testing
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {displayName && <h1>Hello, {displayName}</h1>}
      {flashMsg && <h1>{flashMsg}</h1>}
      <h1>This <i>will :)</i> be the Dashboard</h1>
      <Button classes={"bg-navy text-gray-light"} onClick={handleSignOut}>Sign out</Button>
    </>
  )
}
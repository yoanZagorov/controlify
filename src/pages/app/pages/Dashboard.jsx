import { useUser } from "@/utils/hooks";
import { useAuth } from "@/utils/hooks";
import { getFirstName } from "@/utils/user";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export default function Dashboard() {
  const [flashMsg, setFlashMsg] = useState(null);

  const user = useUser();
  const { fullName } = user;
  const displayName = getFirstName(fullName);
  
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
  
  return (
    <>
      {flashMsg && <h1>{flashMsg}</h1>}
      <h1>Hello, {displayName}</h1>
      <h1>This <i>will :)</i> be the Dashboard</h1>
    </>
  )
}
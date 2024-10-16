import { useState, useEffect } from "react"

export default function Dashboard() {  
  const [flashMsg, setFlashMsg] = useState(null);

  useEffect(() => {
    const msg = sessionStorage.getItem("createdAccountMessage");

    if (msg) {
      setFlashMsg(msg);
      sessionStorage.removeItem("createdAccountMessage");
    }
  }, [flashMsg]);

  return (
    <>
      {flashMsg && <h1>{flashMsg}</h1>}
      <h1>This <i>will :)</i> be the Dashboard</h1>
    </>
  )
}
import { useEffect, useState } from "react";

export default function useRedirectData() {
  const [redirectData, setRedirectData] = useState(null);

  useEffect(() => {
    const storedRedirectData = localStorage.getItem("redirectData");

    if (storedRedirectData) {
      setRedirectData(JSON.parse(storedRedirectData));
      localStorage.removeItem("redirectData")
    }
  }, [])

  return redirectData ?? {};
}
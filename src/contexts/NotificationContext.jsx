import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext(null);

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        setNotification(null);
      }, 3000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  const notify = (message) => {
    setNotification(message);
  }

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}

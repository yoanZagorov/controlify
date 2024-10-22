import { useContext } from "react";
import { NotificationContext } from "@/contexts";

const useNotification = () => {
  return useContext(NotificationContext);
}

export default useNotification;
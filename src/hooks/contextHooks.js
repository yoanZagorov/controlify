import { useContext } from "react";
import { TransactionContext, NotificationContext, UserContext } from "@/contexts";

export function useTransaction() {
  return useContext(TransactionContext);
}

export function useNotification() {
  return useContext(NotificationContext);
}

export default function useUser() {
  return useContext(UserContext);
}
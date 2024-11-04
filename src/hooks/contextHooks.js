import { useContext } from "react";
import { TransactionContext, AuthContext, NotificationContext, UserContext } from "@/contexts";

export function useTransaction() {
  return useContext(TransactionContext);
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useNotification() {
  return useContext(NotificationContext);
}

export default function useUser() {
  return useContext(UserContext);
}
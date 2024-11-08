import { useContext } from "react";
import { TransactionContext, NotificationContext, UserContext, LayoutContext } from "@/contexts";

export function useTransaction() {
  return useContext(TransactionContext);
}

export function useNotification() {
  return useContext(NotificationContext);
}

export function useUser() {
  return useContext(UserContext);
}

export function useLayout() {
  return useContext(LayoutContext);
}
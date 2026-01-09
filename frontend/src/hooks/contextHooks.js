import { useContext } from 'react'
import {
  TransactionContext,
  LayoutContext,
  BreakpointContext,
  AuthContext,
  WalletSubmissionContext,
  WalletUpdateContext,
  SettingsContext,
  CategoryContext,
} from '#contexts'

// Define all context hooks
export function useTransaction() {
  return useContext(TransactionContext)
}

export function useLayout() {
  return useContext(LayoutContext)
}

export function useBreakpoint() {
  return useContext(BreakpointContext)
}

export function useAuth() {
  return useContext(AuthContext)
}

export function useWalletSubmission() {
  return useContext(WalletSubmissionContext)
}

export function useWalletUpdate() {
  return useContext(WalletUpdateContext)
}

export function useSettings() {
  return useContext(SettingsContext)
}

export function useCategory() {
  return useContext(CategoryContext)
}

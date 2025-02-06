const ROUTES = {
  INDEX: "/",
  LOGIN: "/login",
  CREATE_ACCOUNT: "/create-account",
  APP: "/app",
  DASHBOARD: "/app/dashboard",
  WALLETS: "/app/wallets",
  WALLET: "/app/wallets/:walletId",
  WALLET_OVERVIEW: "/app/wallets/:walletId/overview",
  WALLET_TRANSACTIONS: "/app/wallets/:walletId/transactions",
  WALLET_SETTINGS: "/app/wallets/:walletId/settings",
  REFLECT: "/app/reflect",
  SETTINGS: "/app/settings",
  RESET_FETCHER: "/data/reset-fetcher",
  CATCH_ALL: "*"
}

export default ROUTES;
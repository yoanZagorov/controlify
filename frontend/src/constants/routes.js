const ROUTES = {
  INDEX: "/",
  LOGIN: "/login",
  CREATE_ACCOUNT: "/create-account",
  APP: "/app",
  DASHBOARD: "/app/dashboard",
  WALLETS: "/app/wallets",
  WALLET: {
    DYNAMIC: (walletId) => `/app/wallets/${walletId}`,
    STATIC: "/app/wallets/:walletId"
  },
  WALLET_OVERVIEW: {
    DYNAMIC: (walletId) => `/app/wallets/${walletId}/overview`,
    STATIC: "/app/wallets/:walletId/overview"
  },
  WALLET_TRANSACTIONS: {
    DYNAMIC: (walletId) => `/app/wallets/${walletId}/transactions`,
    STATIC: "/app/wallets/:walletId/transactions"
  },
  WALLET_SETTINGS: {
    DYNAMIC: (walletId) => `/app/wallets/${walletId}/settings`,
    STATIC: "/app/wallets/:walletId/settings"
  },
  REFLECT: "/app/reflect",
  SETTINGS: "/app/settings",
  RESET_FETCHER: "/data/reset-fetcher",
  CATCH_ALL: "*"
}

export default ROUTES;
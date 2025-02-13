import { createBrowserRouter, Navigate } from "react-router";

import { Auth } from "@/pages/auth";
import { AppLayout, Dashboard, Wallets, Wallet, WalletOverview, WalletTransactions, WalletSettings } from "@/pages/app";

import { appAction, createAccountAction, dashboardAction, loginAction, reflectAction, resetFetcherAction, settingsAction, walletAction, walletsAction } from "./actions";
import { appLoader, dashboardLoader, walletsLoader, authLoader, walletLoader, settingsLoader, reflectLoader } from "./loaders";
import { NotFound, RootError } from "@/components/errors";
import { LayoutProvider, WalletUpdateProvider } from "@/contexts";
import { Settings } from "@/pages/app/pages/Settings";
import { Reflect } from "@/pages/app/pages/Reflect";
import { ROUTES } from "@/constants";

// To do (Non-MVP): find the reason for the infinite loop bug, when defining all routes as children of INDEX
const routes = [
  {
    path: ROUTES.INDEX,
    element: <Navigate to="app" replace />,
    errorElement: <RootError />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Auth type="login" />,
    action: loginAction,
    loader: authLoader,
    errorElement: <RootError />,
  },
  {
    path: ROUTES.CREATE_ACCOUNT,
    element: <Auth type="createAccount" />,
    action: createAccountAction,
    loader: authLoader,
    errorElement: <RootError />,
  },
  {
    path: ROUTES.APP,
    element:
      <LayoutProvider>
        <AppLayout />
      </LayoutProvider>,
    id: "app",
    loader: appLoader,
    action: appAction,
    errorElement: <RootError />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />
      },
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction
      },
      {
        path: ROUTES.WALLETS,
        element: <Wallets />,
        loader: walletsLoader,
        action: walletsAction
      },
      {
        path: ROUTES.WALLET.STATIC,
        element: <Wallet />,
        id: "wallet",
        loader: walletLoader,
        action: walletAction,
        children: [
          {
            index: true,
            element: <Navigate to="overview" replace /> // Doesn't work with absolute paths (likely a bug in React Router)
          },
          {
            path: ROUTES.WALLET_OVERVIEW.STATIC,
            index: true,
            element: <WalletOverview />
          },
          {
            path: ROUTES.WALLET_TRANSACTIONS.STATIC,
            element: <WalletTransactions />
          },
          {
            path: ROUTES.WALLET_SETTINGS.STATIC,
            element:
              <WalletUpdateProvider>
                <WalletSettings />
              </WalletUpdateProvider>
          },
        ]
      },
      {
        path: ROUTES.REFLECT,
        element: <Reflect />,
        id: "reflect",
        loader: reflectLoader,
        action: reflectAction
      },
      {
        path: ROUTES.SETTINGS,
        element: <Settings />,
        loader: settingsLoader,
        action: settingsAction
      }
    ]
  },
  {
    path: ROUTES.RESET_FETCHER,
    action: resetFetcherAction,
  },
  {
    path: ROUTES.CATCH_ALL,
    element: <NotFound />
  }
]

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export default router;
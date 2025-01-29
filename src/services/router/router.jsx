import { createBrowserRouter, Navigate, redirect } from "react-router";

import { Auth } from "@/pages/auth";
import { AppLayout, Dashboard, Wallets, Wallet, WalletOverview, WalletTransactions, WalletSettings } from "@/pages/app";

import { appAction, createAccountAction, dashboardAction, loginAction, resetFetcherAction, settingsAction, walletAction, walletsAction } from "./actions";
import { appLoader, dashboardLoader, rootLoader, walletsLoader, authLoader, walletLoader, settingsLoader } from "./loaders";
import { AppErrorComponent, RootError } from "@/components/errors";
import { LayoutProvider, SettingsProvider, WalletUpdateProvider } from "@/contexts";
import { NotFound } from "@/components/NotFound";
import { Settings } from "@/pages/app/pages/Settings";

const routes = [
  {
    path: "/",
    loader: rootLoader,
    errorElement: <RootError />
  },
  {
    path: "/login",
    element: <Auth type="login" />,
    action: loginAction,
    loader: authLoader
  },
  {
    path: "/create-account",
    element: <Auth type="createAccount" />,
    action: createAccountAction,
    loader: authLoader
  },
  {
    path: "/app",
    element:
      <LayoutProvider>
        <AppLayout />
      </LayoutProvider>,
    id: "app",
    loader: appLoader,
    action: appAction,
    errorElement: <AppErrorComponent />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction
      },
      {
        path: "wallets",
        element: <Wallets />,
        loader: walletsLoader,
        action: walletsAction
      },
      {
        path: "wallets/:walletId",
        element: <Wallet />,
        id: "wallet",
        loader: walletLoader,
        action: walletAction,
        children: [
          {
            index: true,
            loader: () => redirect("overview")
          },
          {
            path: "overview",
            index: true,
            element: <WalletOverview />
          },
          {
            path: "transactions",
            element: <WalletTransactions />
          },
          {
            path: "settings",
            element:
              <WalletUpdateProvider>
                <WalletSettings />
              </WalletUpdateProvider>
          },
        ]
      },
      {
        path: "reflect",
        element: <h1>This will be the stats page!</h1>
      },
      {
        path: "settings",
        element: <Settings />,
        loader: settingsLoader,
        action: settingsAction
      }
    ]
  },
  {
    path: "/data/reset-fetcher",
    action: resetFetcherAction,
  },
  {
    path: "*",
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
  // hydrateFallbackElement: <div>Loading...</div>,
});

export default router;
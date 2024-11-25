import { createBrowserRouter, Navigate, redirect } from "react-router";

import { Auth } from "@/pages/auth";
import { AppLayout, Dashboard, Wallets, Wallet, WalletOverview, WalletTransactions, WalletSettings } from "@/pages/app";

import { appAction, createAccountAction, dashboardAction, loginAction, resetFetcherAction } from "./actions";
import { appLoader, dashboardLoader, rootLoader, walletsLoader, authLoader, walletLoader } from "./loaders";
import { AppErrorComponent, RootError } from "@/components/errors";
import { LayoutProvider } from "@/contexts";
import { NotFound } from "@/components/NotFound";

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
        loader: walletsLoader
      },
      {
        path: "wallets/:walletId",
        element: <Wallet />,
        id: "wallet",
        loader: walletLoader,
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
            element: <WalletSettings />
          },
        ]
      },
      {
        path: "reflect",
        element: <h1>This will be the stats page!</h1>
      },
      {
        path: "settings",
        element: <h1>This will be the settings page!</h1>
      },
      {
        path: "categories",
        element: <h1>This will be the categories page!</h1>
      },
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
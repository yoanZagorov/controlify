import { createBrowserRouter, Navigate } from "react-router-dom";

import { Auth } from "@/pages/auth";
import { AppLayout, Dashboard, Wallets } from "@/pages/app";

import { appAction, createAccountAction, dashboardAction, loginAction } from "./actions";
import { appLoader, dashboardLoader, rootLoader, walletsLoader, authLoader } from "./loaders";
import { AppErrorComponent, RootError } from "@/components/errors";
import { LayoutProvider } from "@/contexts";

const router = createBrowserRouter([
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
  }
])

export default router;
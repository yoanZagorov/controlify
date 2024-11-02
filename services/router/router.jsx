import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import { Login } from "@/pages/auth";
import { AuthLayout, CreateAccount } from "@/pages/auth";
import { AppLayout, Dashboard, Wallets } from "@/pages/app";

import { createAccountAction, dashboardAction, loginAction } from "./actions";
import { appLoader, dashboardLoader, rootLoader, authLoader } from "./loaders";

const router = createBrowserRouter([
  {
    path: "/",
    loader: rootLoader
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction
      },
      {
        path: "create-account",
        element: <CreateAccount />,
        action: createAccountAction
      }
    ]
  },
  {
    path: "/app",
    element: <AppLayout />,
    id: "app",
    loader: appLoader,
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
        element: <Wallets />
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
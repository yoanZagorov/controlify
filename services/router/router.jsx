import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import { Login } from "@/pages/auth";
import { AuthLayout, CreateAccount } from "@/pages/auth";
import { AppLayout, Dashboard } from "@/pages/app";

import { createAccountAction, loginAction } from "./actions";
import { appLoader, rootLoader } from "./loaders";

const router = createBrowserRouter([
  {
    path: "/",
    loader: rootLoader
  },
  {
    path: "/auth",
    element: <AuthLayout />,
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
    element: <AppLayout/>,
    loader: appLoader,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "wallets",
        element: <h1>This will be the wallets page!</h1>
      },
      {
        path: "reflect",
        element: <h1>This will be the stats page!</h1>
      }
    ]
  }
])

export default router;
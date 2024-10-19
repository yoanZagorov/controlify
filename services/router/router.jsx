import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import { LandingPage } from "@/pages/LandingPage";
import { Login } from "@/pages/auth";
import { AuthLayout, CreateAccount } from "@/pages/auth";
import { AppLayout, Dashboard } from "@/pages/app";

import { createAccountAction, loginAction } from "./actions";
import { appLoader } from "./loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
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
        element: <Dashboard />
      }
    ]
  }
])

export default router;
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

import { LandingPage } from "@/pages/LandingPage";
import { Login } from "@/pages/auth";
import { AuthLayout, CreateAccount } from "@/pages/auth";
import { AppLayout, Dashboard } from "@/pages/app";

import { createAccountAction, loginAction } from "./actions";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route
      path="/"
      element={<LandingPage />}
    />
    <Route
      path="/auth"
      element={<AuthLayout />}
    >
      <Route
        index
        element={<Navigate to="login" replace />}
      />
      <Route
        path="login"
        element={<Login />}
        action={loginAction}
      />
      <Route
        path="create-account"
        element={<CreateAccount />}
        action={createAccountAction}
      />
    </Route>
    <Route
      path="/app"
      element={<AppLayout/>}
    >
      <Route 
        index
        element={<Dashboard/>}
      />
    </Route>
  </>
));

export default router;
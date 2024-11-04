// Consider creating an AuthPage component for both of the auth pages
import { useActionData } from "react-router-dom";

import { loginAction } from "/services/router/actions";

import { AuthForm } from "../components/AuthForm";

export default function Login() {
  const actionData = useActionData();
  const errorMsg = actionData?.errorMsg || null;

  return (
    <div className="tab:w-1/2 flex flex-col gap-6 justify-center items-center">
      {errorMsg &&
        <p className="text-red-dark max-w-[425px] ml:text-lg tab:text-xl">{errorMsg}</p>
      }

      <AuthForm
        type="login"
        action={loginAction}
        btnText="Log in"
        msg={"Don't yet have an account?"}
        CTA="Create one now!"
      />
    </div>
  )
}

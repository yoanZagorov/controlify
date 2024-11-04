// Consider creating an AuthPage component for both of the auth pages
import { useActionData } from "react-router-dom";

import { createAccountAction } from "/services/router/actions";

import { AuthForm } from "../components/AuthForm";

export default function CreateAccount() {
  const actionData = useActionData();
  const errorMsg = actionData?.errorMsg || null;

  return (
    <div className="tab:w-1/2 flex flex-col gap-6 justify-center items-center">
      {errorMsg &&
        <p className="text-red-dark max-w-[425px] ml:text-lg tab:text-xl">{errorMsg}</p>
      }

      <AuthForm
        type="createAccount"
        action={createAccountAction}
        btnText="Create account"
        msg="Already have an account?"
        CTA="Log in!"
      />
    </div>
  )
}
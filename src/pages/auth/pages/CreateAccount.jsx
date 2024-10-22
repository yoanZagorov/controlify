import { useActionData } from "react-router-dom";

import { AuthForm } from "@/components/AuthForm";
import { createAccountAction } from "/services/router/actions";

import s from "../auth.module.css";

export default function CreateAccount() {
  const actionData = useActionData();
  const errorMsg = actionData?.errorMsg || null;

  return (
    <div className={s.formContainer}>
      {errorMsg && <p className={s.errorMsg}>{errorMsg}</p>}

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
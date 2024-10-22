import { useActionData } from "react-router-dom";

import { AuthForm } from "@/components/AuthForm";
import { loginAction } from "/services/router/actions";

import s from "../auth.module.css";

export default function Login() {
  const actionData = useActionData();
  const errorMsg = actionData?.errorMsg || null;

  return (
    <div className={s.formContainer}>
      {errorMsg && <p className={s.errorMsg}>{errorMsg}</p>}

      <AuthForm
        type="login"
        action={loginAction}
        btnText="Log in"
        msg="Don’t yet have an account?"
        CTA="Create one now!"
      />
    </div>
  )
}

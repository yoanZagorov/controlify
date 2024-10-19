import { useActionData } from "react-router-dom";

import { Form } from "../components/Form";
import { loginAction } from "/services/router/actions";
import s from "../auth.module.css";

export default function Login() {
  const errorMsg = useActionData()?.errorMsg || null;

  return (
    <div className={s.formContainer}>
      {errorMsg && <p className={s.errorMsg}>{errorMsg}</p>}

      <Form
        type="login"
        action={loginAction}
        btnText="Log in"
        msg="Don’t yet have an account?"
        CTA="Create one now!"
      />
    </div>
  )
}

import { Form } from "../components/Form";
import { loginAction } from "/services/router/actions";
import s from "../auth.module.css";

export default function Login() {
  return (
    <div className={s.formContainer}>
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

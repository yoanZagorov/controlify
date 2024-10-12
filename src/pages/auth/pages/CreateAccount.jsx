import { Form } from "../components/Form";
import { createAccountAction } from "/services/router/actions";
import s from "../auth.module.css";

export default function CreateAccount() {
  return (
    <div className={s.formContainer}>
      <Form
        action={createAccountAction}
        btnText="Create account"
        msg="Already have an account?"
        CTA="Log in!"
      />
    </div>
  )
}
import { Form } from "../components/Form";
import { createAccountAction } from "/services/router/actions";
import s from "../auth.module.css";
import { useActionData } from "react-router-dom";

export default function CreateAccount() {
  const errorMsg = useActionData()?.errorMsg || null;
  // const errorMsg = actionData?.errorMsg || null;

  return (
    <>
      <div className={s.formContainer}>
        {errorMsg && <p className={s.errorMsg}>{errorMsg}</p>}

        <Form
          type="createAccount"
          action={createAccountAction}
          btnText="Create account"
          msg="Already have an account?"
          CTA="Log in!"
        />
      </div>
    </>
  )
}
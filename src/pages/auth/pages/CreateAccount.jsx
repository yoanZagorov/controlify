import { useActionData } from "react-router-dom";

import { Form } from "../components/Form";
import { createAccountAction } from "/services/router/actions";
import s from "../auth.module.css";

export default function CreateAccount() {
  const errorMessage = useActionData();

  return (
    <>
      {errorMessage && <h1 className="text-red">{errorMessage}</h1>}

      <div className={s.formContainer}>
        <Form
          action={createAccountAction}
          btnText="Create account"
          msg="Already have an account?"
          CTA="Log in!"
        />
      </div>
    </>
  )
}
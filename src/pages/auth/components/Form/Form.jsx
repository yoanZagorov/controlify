import classNames from "classnames";
import { Link, Form as RouterForm } from "react-router-dom";

// Components
import { Button } from "@/components/Button";

// Styles
import s from "./Form.module.css";
import { styles as btnS } from "@/components/Button";

export default function Form({ type, action, btnText, msg, CTA }) {
  const btnClasses = classNames(s.btn, btnS.btnPrimary);

  const isCreateAccount = type === "createAccount";
  const path = isCreateAccount
    ? "../login"
    : "../create-account";

  return (
    <RouterForm
      method="post"
      action={action}
      className={s.form}
    >
      <div className={s.inputsContainer}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          minLength={2}
          required
          className={s.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          minLength={8}
          maxLength={12}
          required
          className={s.input}
        />
        {isCreateAccount &&
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            minLength={5}
            maxLength={20}
            required
            className={s.input}
          />
        }
      </div>

      <Button classes={btnClasses}>
        {btnText}
      </Button>

      <p className={s.p}>{msg}
        <Link
          to={path}
          className={s.cta}
        >
          {CTA}
        </Link>
      </p>
    </RouterForm>
  )
}
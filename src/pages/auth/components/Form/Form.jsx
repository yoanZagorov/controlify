import classNames from "classnames";
import { Link, Form as RouterForm } from "react-router-dom";

// Components
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

// Styles
import s from "./Form.module.css";
import { styles as btnS } from "@/components/Button";

export default function Form({ action, btnText, msg, CTA }) {
  const btnClasses = classNames(s.btn, btnS.btnPrimary);

  return (
    <RouterForm
      method="post"
      action={action}
      className={s.form}
    >
      <div className={s.inputsContainer}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          classes={s.input} 
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          classes={s.input} 
        />
      </div>

      <Button classes={btnClasses}>
        {btnText}
      </Button>

      <p className={s.p}>{msg}
        <Link
          to="create-account"
          className={s.cta}
        >
          {CTA}
        </Link>
      </p>
    </RouterForm>
  )
}
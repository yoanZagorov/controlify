// Consider extracting the inputs into a separate component
import { Link, Form as RouterForm } from "react-router-dom";

import { Button } from "@/components/Button";

export default function AuthForm({ isCreateAccount, action, btnText, path, msg, CTA }) {
  console.log(isCreateAccount);

  return (
    <RouterForm
      method="post"
      action={action}
      className="flex flex-col w-full max-w-[425px]"
    >
      <div className="flex flex-col gap-5">
        <input
          type="email"
          name="email"
          placeholder="Email"
          minLength={2}
          required
          className="auth-form__input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          minLength={8}
          maxLength={12}
          required
          className="auth-form__input"
        />
        {isCreateAccount &&
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            minLength={5}
            required
            className="auth-form__input"
          />
        }
      </div>

      <Button
        className="mt-12"
        size="l"
      >
        {btnText}
      </Button>

      <p className="mt-2 text-navy text-sm ls:text-lg ll:text-xl">
        {msg}
        <Link
          to={path}
          className="ml-1 text-gray-dark font-bold underline"
        >
          {CTA}
        </Link>
      </p>
    </RouterForm>
  )
}
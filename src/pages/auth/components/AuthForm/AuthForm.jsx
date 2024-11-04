import { Link, Form as RouterForm } from "react-router-dom";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import cn from "classnames";

export default function AuthForm({ isCreateAccount, action, btnText, path, msg, CTA, className }) {
  return (
    <RouterForm
      method="post"
      action={action}
      className={className && className}
    >
      <div className="flex flex-col gap-5">
        <Input
          size="l"
          type="email"
          name="email"
          placeholder="Email"
          minLength={2}
          required
          className="ll:py-3 ll:px-5 ll:text-xl"
        />
        <Input
          size="l"
          type="password"
          name="password"
          placeholder="Password"
          minLength={8}
          maxLength={12}
          required
          className="ll:py-3 ll:px-5 ll:text-xl"
        />
        {isCreateAccount &&
          <Input
            size="l"
            type="text"
            name="fullName"
            placeholder="Full name"
            minLength={5}
            required
            className="ll:py-3 ll:px-5 ll:text-xl"
          />
        }
      </div>

      <Button
        type="submit"
        size="xl"
        className="mt-12 w-full ll:py-5 ll:text-2xl focus:ring-4"
      >
        {btnText}
      </Button>

      <p className="mt-2 text-navy ll:text-lg">
        {msg}
        <Link
          to={path}
          className="ml-1 font-bold underline text-gray-dark"
        >
          {CTA}
        </Link>
      </p>
    </RouterForm>
  )
}
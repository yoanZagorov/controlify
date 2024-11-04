// Consider extracting the inputs into a separate component
import { Link, Form as RouterForm } from "react-router-dom";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function AuthForm({ isCreateAccount, action, btnText, path, msg, CTA }) {
  return (
    <RouterForm
      method="post"
      action={action}
      className="flex flex-col w-full max-w-[425px]"
    >
      <div className="flex flex-col gap-5">
        <Input
          size="l"
          type="email"
          name="email"
          placeholder="Email"
          minLength={2}
          required
          className="tab:px-5 ll:py-3 ll:px-5 ll:text-xl"
        />
        <Input
          size="l"
          type="password"
          name="password"
          placeholder="Password"
          minLength={8}
          maxLength={12}
          required
          className="tab:px-5 ll:py-3 ll:px-5 ll:text-xl"
        />
        {isCreateAccount &&
          <Input
            size="l"
            type="text"
            name="fullName"
            placeholder="Full name"
            minLength={5}
            required
            className="tab:px-5 ll:py-3 ll:px-5 ll:text-xl"
          />
        }
      </div>

      <Button
        type="submit"
        size="xl"
        className="mt-12 ll:py-5 ls:text-2xl focus:ring-4"
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
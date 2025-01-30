import cn from "classnames";
import { useRef } from "react";
import { Link } from "react-router";

import { useAuth, useAutoFocus } from "@/hooks";

import { Input } from "@/components/Input";
import { Form } from "@/components/Form";

export default function AuthForm({ originalPath = "", isCreateAccount, authFormConfig, className }) {
  const {
    authData,
    updateAuthData
  } = useAuth();

  const { email, password, fullName } = authData;

  const emailInputRef = useRef(null);
  useAutoFocus({ ref: emailInputRef, deps: [isCreateAccount] });

  const { action, btnText, path, msg, CTA } = authFormConfig;

  const authDataConfig = [
    {
      formData: {
        name: "originalPath",
        value: originalPath
      }
    },
    {
      formData: {
        name: "email",
        value: email
      },
      inputProps: {
        inputRef: emailInputRef,
        type: "email",
        placeholder: "Email",
        minLength: 2,
        onChange: (e) => updateAuthData({ email: e.target.value })
      },
    },
    {
      formData: {
        name: "password",
        value: password
      },
      inputProps: {
        type: "password",
        placeholder: "Password",
        minLength: 8,
        maxLength: 12,
        onChange: (e) => updateAuthData({ password: e.target.value })
      },
    },
    ...(isCreateAccount ? [{
      formData: {
        name: "fullName",
        value: fullName
      },
      inputProps: {
        placeholder: "Full Name",
        minLength: 5,
        onChange: (e) => updateAuthData({ fullName: e.target.value })
      },
    }] : [])
  ];

  const inputFields = authDataConfig.filter(field => field.inputProps).map((field, index) => {
    return (
      <Input
        key={index}
        size="l"
        required
        value={field.formData.value}
        {...field.inputProps}
        className="ll:py-3 ll:px-5 ll:text-xl"
      />
    )
  })

  return (
    <Form
      action={action}
      className={cn(className)}
      btn={{
        props: {
          size: "xl",
          className: "mt-8 w-full ll:py-5 ll:text-2xl focus:ring-4"
        },
        text: btnText
      }}
      fields={[
        ...authDataConfig.map(field => field.formData),
      ]}
    >
      <div className="flex flex-col gap-5">{inputFields}</div>

      <p className="mt-3 text-sm mm:text-base ll:text-lg text-navy">
        {msg}
        <Link
          to={path}
          className="ml-1 font-bold underline text-gray-dark"
        >
          {CTA}
        </Link>
      </p>
    </Form>
  )
}
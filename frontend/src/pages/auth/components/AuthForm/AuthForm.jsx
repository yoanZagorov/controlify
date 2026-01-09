import cn from 'classnames'
import { useRef } from 'react'
import { Link } from 'react-router'

import { useAuth, useAutoFocus, useBreakpoint } from '#hooks'

import { Input } from '#components/Input'
import { Form } from '#components/Form'
import { VALIDATION_RULES } from '#constants'

// Using a controlled inputs approach to guide the user
// To do: create handleChange functions for the inputs
export default function AuthForm({
  originalPath = '',
  isCreateAccount,
  config,
  className,
}) {
  const { action, btnText, path, msg, CTA } = config

  const {
    authData: { email, password, fullName },
    updateAuthData,
  } = useAuth()

  const emailInputRef = useRef(null)
  useAutoFocus({ ref: emailInputRef, deps: [isCreateAccount] }) // Run the hook again if the page is changed

  const { isMobileS, isMobileM } = useBreakpoint()
  const isSmallScreen = isMobileS || isMobileM

  const authDataConfig = [
    {
      formData: {
        name: 'originalPath',
        value: originalPath,
      },
    },
    {
      formData: {
        name: 'email',
        value: email,
      },
      inputProps: {
        inputRef: emailInputRef,
        type: 'email',
        placeholder: 'Email',
        minLength: VALIDATION_RULES.EMAIL.MIN_LENGTH,
        maxLength: VALIDATION_RULES.EMAIL.MAX_LENGTH,
        onChange: (e) => updateAuthData({ email: e.target.value }),
      },
    },
    {
      formData: {
        name: 'password',
        value: password,
      },
      inputProps: {
        type: 'password',
        placeholder: 'Password',
        minLength: VALIDATION_RULES.PASSWORD.MIN_LENGTH,
        maxLength: VALIDATION_RULES.PASSWORD.MAX_LENGTH,
        onChange: (e) => updateAuthData({ password: e.target.value }),
      },
    },
    ...(isCreateAccount
      ? [
          {
            formData: {
              name: 'fullName',
              value: fullName,
            },
            inputProps: {
              placeholder: 'Full Name',
              minLength: VALIDATION_RULES.FULL_NAME.MIN_LENGTH,
              maxLength: VALIDATION_RULES.FULL_NAME.MAX_LENGTH,
              onChange: (e) => updateAuthData({ fullName: e.target.value }),
            },
          },
        ]
      : []),
  ]

  const inputFields = authDataConfig
    .filter((field) => field.inputProps)
    .map((field, index) => {
      return (
        <Input
          key={index}
          size={isSmallScreen ? 'm' : 'l'}
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
      btn={{
        props: {
          size: isSmallScreen ? 'l' : 'xl',
          className: 'mt-8 w-full ll:py-5 ll:text-2xl focus:ring-4',
        },
        text: btnText,
      }}
      fields={authDataConfig.map((field) => field.formData)}
      className={cn(className)}
    >
      <div className="flex flex-col gap-5">{inputFields}</div>

      <p className="mt-3 text-sm mm:text-base ll:text-lg text-navy">
        {msg}
        <Link to={path} className="ml-1 font-bold underline text-gray-dark">
          {CTA}
        </Link>
      </p>
    </Form>
  )
}

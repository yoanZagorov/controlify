import { Form as RouterForm } from 'react-router'
import cn from 'classnames'

import { isObjTruthy } from '#utils/obj'
import { isArrayTruthy } from '#utils/array'

import { Button } from '../Button'

// A wrapper on top of the react router Form component
// The goals is clear separation of concerns - keep all the controlled inputs here and use presentational ones for the UI
export default function Form({
  fetcher = {},
  btn = {},
  fields = [],
  className,
  children,
  ...props
}) {
  const formConfig = {
    method: 'post',
    ...props,
  }

  const btnConfig = {
    isBtn: true,
    text: 'submit',
    ...btn,
    props: {
      type: 'submit',
      size: 'l',
      name: 'intent',
      'data-actionable': true,
      ...btn.props,
    },
  }

  // Used for forms with controlled inputs
  const fieldsEls = isArrayTruthy(fields)
    ? fields.map(({ name, value }, index) => (
        <input key={index} type="hidden" name={name} value={value} />
      ))
    : []

  return isObjTruthy(fetcher) ? (
    <fetcher.Form {...formConfig} className={cn(className)}>
      {isArrayTruthy(fields) && fieldsEls}
      {children}
      {btnConfig.isBtn && (
        <Button {...btnConfig.props}>{btnConfig.text}</Button>
      )}
    </fetcher.Form>
  ) : (
    <RouterForm {...formConfig} className={cn(className)}>
      {isArrayTruthy(fields) && fieldsEls}
      {children}
      {btnConfig.isBtn && (
        <Button {...btnConfig.props}>{btnConfig.text}</Button>
      )}
    </RouterForm>
  )
}

import { Form as RouterForm } from "react-router"
import { Button } from "../Button"

export default function Form({ fetcher = null, action, encType = "application/x-www-form-urlencoded", onSubmit = null, isNative = false, className, btn = {}, fields, children }) {
  const isBtn = Object.keys(btn).length > 0;
  const btnConfig = { text: "submit", ...btn };

  const fieldsEls = fields.map(({ name, value }, index) => (
    <input key={index} type="hidden" name={name} value={value} />
  ))

  return isNative ? (
    <form
      method="post"
      action={action}
      encType={encType}
      {...onSubmit ? { onSubmit } : {}}
      className={className}
    >
      {fieldsEls}
      {children}
      {isBtn &&
        <Button type="submit" size="l" name="intent" {...btnConfig.props}>
          {btnConfig.text}
        </Button>
      }
    </form>
  ) : fetcher ? (
    <fetcher.Form
      method="post"
      action={action}
      encType={encType}
      {...onSubmit ? { onSubmit } : {}}
      className={className}
    >
      {fieldsEls}
      {children}
      {isBtn &&
        <Button type="submit" size="l" name="intent" {...btnConfig.props}>
          {btnConfig.text}
        </Button>
      }
    </fetcher.Form>
  ) : (
    <RouterForm
      method="post"
      action={action}
      encType={encType}
      {...onSubmit ? { onSubmit } : {}}
      className={className}
    >
      {fieldsEls}
      {children}
      {isBtn &&
        <Button type="submit" size="l" name="intent" {...btnConfig.props}>
          {btnConfig.text}
        </Button>
      }
    </RouterForm>
  );
}
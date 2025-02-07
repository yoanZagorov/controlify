import { Form as RouterForm } from "react-router"
import { Button } from "../Button"
import { isObjTruthy } from "@/utils/obj";
import cn from "classnames";

export default function Form({ fetcher = {}, btn = {}, fields = [], className, children, ...props }) {
  const formConfig = {
    method: "post",
    ...props
  }

  const btnConfig = {
    isBtn: true,
    text: "submit",
    ...btn,
    props: {
      type: "submit",
      size: "l",
      name: "intent",
      ...btn.props
    },
  };

  // Used for forms with controlled inputs
  const fieldsEls = fields.length ? fields.map(({ name, value }, index) => (
    <input key={index} type="hidden" name={name} value={value} />
  )) : [];

  return isObjTruthy(fetcher) ? (
    <fetcher.Form {...formConfig} className={cn(className)}>
      {fields.length && fieldsEls}
      {children}
      {btnConfig.isBtn &&
        <Button {...btnConfig.props}>
          {btnConfig.text}
        </Button>
      }
    </fetcher.Form>
  ) : (
    <RouterForm {...formConfig} className={cn(className)}>
      {fields.length && fieldsEls}
      {children}
      {btnConfig.isBtn &&
        <Button {...btnConfig.props}>
          {btnConfig.text}
        </Button>
      }
    </RouterForm>
  );
}
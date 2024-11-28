import cn from "classnames";
import { Button } from "../Button";

export default function Select({ btnProps, value }) {
  const className = cn(
    "flex items-center gap-3",
    btnProps.className
  )

  return (
    <Button {...btnProps} className={className}>
      <span>{value}</span>
      <span>{">"}</span>
    </Button>
  )
}
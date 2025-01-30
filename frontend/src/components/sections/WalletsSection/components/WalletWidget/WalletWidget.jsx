import cn from "classnames";

import { formatEntityName } from "@/utils/formatting";

import { Amount } from "@/components/Amount";
import { Widget } from "@/components/widgets/Widget";
import { SvgIcon } from "@/components/SvgIcon";

export default function WalletWidget({ wallet, className }) {
  const { iconName, name, balance, currency, color } = wallet;

  const widgetClasses = cn(
    "relative flex flex-col",
    className
  )

  return (
    <Widget className={widgetClasses}>
      <SvgIcon iconName={iconName} className="size-5" fill={color} />
      <span className="mt-2 uppercase text-sm font-semibold" style={{ color: color }}>{formatEntityName(name)}</span>

      <Amount
        amount={balance}
        currency={currency}
        colorContext="light"
        className="text-lg font-bold"
      />

      <div className="absolute top-0 right-5 h-8 w-2.5" style={{ backgroundColor: color }}></div>
    </Widget>
  )
}

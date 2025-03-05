import cn from "classnames";

import { formatEntityNameForUI } from "@/utils/formatting";

import { Amount } from "@/components/Amount";
import { Widget } from "@/components/widgets/Widget";
import { SvgIcon } from "@/components/SvgIcon";

// Handles the UI display for a single wallet
export default function WalletWidget({ wallet, className }) {
  const { iconName, name, balance, currency, color } = wallet;

  return (
    <Widget className={cn("relative flex flex-col", className)}>
      <SvgIcon iconName={iconName} className="size-5" fill={color} />
      <span className="mt-2 uppercase text-sm font-semibold" style={{ color: color }}>{formatEntityNameForUI(name)}</span>

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

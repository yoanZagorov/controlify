import { formatEntityName } from "@/utils/formatting";

import { Amount } from "@/components/Amount";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import { walletsColorMap } from "@/utils/wallet";
import cn from "classnames";
import { Widget } from "@/components/widgets/Widget";
import { SvgIcon } from "@/components/SvgIcon";

export default function WalletWidget({ wallet, className }) {
  // <ContentWidget
  //   iconName={wallet.iconName}
  //   title={formatEntityName(wallet.name)}
  //   className={className ? className : ""}
  //   content={{ hasBackground: false }}
  // >
  //   <Amount
  //     amount={wallet.balance}
  //     currency={wallet.currency}
  //     colorContext="light"
  //     className="text-lg font-bold"
  //   />
  // </ContentWidget>
  const classes = {
    widget: cn(
      "relative flex flex-col",
      className
    ),
    name: cn(
      "mt-2 uppercase text-sm font-semibold",
      walletsColorMap.text[wallet.color]
    ),
    icon: cn(
      "size-5",
      walletsColorMap.fill[wallet.color]
    ),
    mark: cn(
      "absolute top-0 right-5 h-8 w-2.5",
      walletsColorMap.background[wallet.color]
    )
  }

  return (
    <Widget className={classes.widget}>
      <SvgIcon iconName={wallet.iconName} className={classes.icon} />
      <span className={classes.name}>{formatEntityName(wallet.name)}</span>

      <Amount
        amount={wallet.balance}
        currency={wallet.currency}
        colorContext="light"
        className="text-lg font-bold"
      />

      <div className={classes.mark}></div>
    </Widget>
  )
}

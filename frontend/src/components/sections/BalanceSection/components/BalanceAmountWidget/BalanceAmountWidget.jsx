import { Amount } from "@/components/Amount";
import { SvgIcon } from "@/components/SvgIcon";
import { ContentWidget } from "@/components/widgets/ContentWidget";
import cn from "classnames";

export default function BalanceAmountWidget({ iconName, title, amount, currency, balanceChange = null, className }) {
  const isBalanceChangePositive = balanceChange >= 0;

  const widgetClasses = cn(
    balanceChange !== null && "relative",
    className
  )

  return (
    <ContentWidget
      iconName={iconName}
      className={widgetClasses}
      title={title}
      content={{ hasBackground: false, className: "mt-2" }}
    >
      <Amount
        amount={amount}
        currency={currency}
        colorContext="light"
        className="text-2xl font-bold"
      />

      {balanceChange !== null &&
        <div className="absolute top-4 right-4 flex items-center gap-2 py-1.5 px-2 rounded font-bold bg-gray-light">
          {isBalanceChangePositive
            ? <SvgIcon iconName="arrow-up" className="size-3.5 fill-green-dark" />
            : <SvgIcon iconName="arrow-down" className="size-3.5 fill-red-dark" />
          }
          <Amount
            amount={balanceChange}
            currency={currency}
            colorContext="light"
            displayPlusSign
            className="text-xs"
          />
        </div>
      }
    </ContentWidget>
  )
}

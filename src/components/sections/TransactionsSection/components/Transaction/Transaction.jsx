import cn from "classnames";

import { useBreakpoint } from "@/hooks";
import { formatEntityName } from "@/utils/formatting";

import { Amount } from "@/components/Amount";
import { SvgIcon } from "@/components/SvgIcon";
import { formatDateLong, formatDateShort } from "@/utils/date";

export default function Transaction({ isExpanded, transaction: { category, wallet, date, amount }, display }) {
  const { isMobileS, isMobileM } = useBreakpoint();
  const isSpaceLimited = isMobileS || isMobileM;

  const classes = {
    transaction: cn(
      "grid items-center bg-gray-light rounded-lg overflow-auto",
      isExpanded ? "grid-cols-3 p-4" : "grid-cols-[minmax(auto,max-content)_1fr] gap-6 p-3"
    ),
    iconWrapper: cn(
      "flex justify-center items-center rounded-full",
      isSpaceLimited
        ? "min-h-8 min-w-8 max-h-8 max-w-8"
        : isExpanded ? "size-12" : "size-10", // ensure icon keeps its shape
    ),
    categoryName: cn(
      "text-gray-dark font-semibold",
      isSpaceLimited
        ? "text-sm"
        : isExpanded ? "text-lg" : "text-base"
    ),
    amount: cn(
      "text-right font-semibold",
      isSpaceLimited
        ? "text-sm"
        : isExpanded ? "text-lg" : "text-base"
    )
  }

  const formattedCategoryName = formatEntityName(category.name);
  const formattedWalletName = formatEntityName(wallet.name);
  const formattedDate = isSpaceLimited
    ? formatDateShort(new Date(date))
    : formatDateLong(new Date(date));

  const correctSignAmount = category.type === "expense" ? -amount : amount;

  return (
    <div className={classes.transaction}>
      <div className={`flex items-center ${isExpanded ? "gap-4" : "gap-2.5"}`}>
        <div className={classes.iconWrapper} style={{ backgroundColor: category.color }}>
          <SvgIcon iconName={category.iconName} className="size-1/2 fill-gray-light" />
        </div>

        <div className="flex flex-col">
          <span className={classes.categoryName}>{formattedCategoryName}</span>
          {display.wallet &&
            <div className="flex items-center gap-1.5 font-bold" style={{ color: wallet.color }}>
              <SvgIcon iconName={wallet.iconName} className="size-3 min-w-3 min-h-3 fill-current" />
              <span className="text-xs lm:text-sm">{formattedWalletName}</span>
            </div>
          }
          {(display.date && !isExpanded) &&
            <time className="mt-1 text-xs text-gray-dark opacity-50 font-bold">{formattedDate}</time>
          }
        </div>
      </div>

      {(display.date && isExpanded) && <time className="text-left text-base text-gray-dark opacity-50 font-bold">{formattedDate}</time>}

      <Amount
        amount={correctSignAmount}
        currency={wallet.currency}
        colorContext="light"
        displayPlusSign
        className={classes.amount}
      />
    </div>
  )
}
import cn from "classnames";

import { useBreakpoint } from "@/hooks";
import { categoryColorsMap } from "@/utils/category";
import formatEntityName from "@/utils/formatting/formatEntityName";

import { Amount } from "@/components/Amount";
import { SvgIcon } from "@/components/SvgIcon";
import { walletsColorMap } from "@/utils/wallet";
import { formatDateLong, formatDateShort } from "@/utils/date";

export default function Transaction({ isExpanded, transaction: { category, wallet, date, amount }, showDate }) {
  const { isMobileS, isMobileM } = useBreakpoint();
  const isSpaceLimited = isMobileS || isMobileM;

  const classes = {
    iconWrapper: cn(
      "flex justify-center items-center rounded-full",
      isSpaceLimited ? "min-h-8 min-w-8 max-h-8 max-w-8" : "size-10 lm:size-12", // ensure icon keeps its shape
      categoryColorsMap.background[category.color]
    ),
    categoryName: cn(
      "text-gray-dark font-semibold",
      isSpaceLimited ? "text-sm" : "text-base lm:text-lg"
    ),
    wallet: cn(
      "flex items-center gap-1 font-bold",
      walletsColorMap.text[wallet.color]
    ),
    amount: cn(
      "ml-auto text-nowrap text-right font-semibold",
      isSpaceLimited ? "text-sm" : "text-base lm:text-lg"
    )
  }

  const formattedCategoryName = formatEntityName(category.name);
  const formattedWalletName = formatEntityName(wallet.name);
  const formattedDate = isSpaceLimited
    ? formatDateShort(new Date(date))
    : formatDateLong(new Date(date));

  const correctSignAmount = category.type === "expense" ? -amount : amount;

  return (
    <div className="flex items-center gap-5 lm:gap-16 bg-gray-light p-3 lm:p-4 rounded-lg overflow-auto">
      <div className="flex items-center gap-2.5 lm:gap-4">
        <div className={classes.iconWrapper}>
          <SvgIcon iconName={category.iconName} className="size-1/2 fill-gray-light" />
        </div>

        <div className="flex flex-col">
          <span className={classes.categoryName}>{formattedCategoryName}</span>
          <div className={classes.wallet}>
            <SvgIcon iconName={wallet.iconName} className="size-3 fill-current" />
            <span className="text-xs lm:text-sm">{formattedWalletName}</span>
          </div>
          {(showDate && !isExpanded) && <time className="mt-1 text-xs text-gray-dark opacity-50 font-bold">{formattedDate}</time>}
        </div>
      </div>

      {(showDate && isExpanded) && <time className="text-left text-base text-gray-dark opacity-50 font-bold">{formattedDate}</time>}

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
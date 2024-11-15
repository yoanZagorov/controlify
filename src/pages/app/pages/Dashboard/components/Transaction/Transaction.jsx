import cn from "classnames";

import { useBreakpoint, useLayout } from "@/hooks";
import { categoryColorsMap } from "@/utils/category";
import formatEntityName from "@/utils/formatting/formatEntityName";

import { Amount } from "@/components/Amount";
import { SvgIcon } from "@/components/SvgIcon";

export default function Transaction({ category, wallet, amount, currency }) {
  const { isMobileS, isMobileM, isTablet, isLaptopS } = useBreakpoint();
  const { isSidebarExpanded } = useLayout();

  const isSpaceLimited = ((isMobileS || isMobileM) || (isTablet && !isSidebarExpanded) || isLaptopS);

  const classes = {
    iconWrapper: cn(
      "flex justify-center items-center rounded-full",
      isSpaceLimited ? "min-h-8 min-w-8 max-h-8 max-w-8 " : "size-10",
      categoryColorsMap.background[category.color]
    ),
    categoryName: cn(
      "text-gray-dark font-semibold",
      isSpaceLimited ? "text-sm" : "text-base"
    ),
    amount: cn(
      "basis-[90px] text-nowrap text-right font-semibold",
      isSpaceLimited ? "text-sm" : "text-base"
    )
  }

  const formattedCategoryName = formatEntityName(category.name);
  const formattedWalletName = formatEntityName(wallet.name);

  const correctSignAmount = category.type === "expense" ? -amount : amount;

  return (
    <div className="flex justify-between items-center gap-5">
      <div className="flex items-center gap-2.5">
        <div className={classes.iconWrapper}>
          <SvgIcon iconName={category.iconName} className="size-1/2 fill-gray-light" />
        </div>

        <div className="flex flex-col">
          <span className={classes.categoryName}>{formattedCategoryName}</span>
          <div className="-mt-1 flex items-center gap-1 text-gray-dark opacity-50 font-bold">
            <SvgIcon iconName={wallet.iconName} className="size-3 fill-current" />
            <span className="text-xs">{formattedWalletName}</span>
          </div>
        </div>
      </div>

      <Amount
        amount={correctSignAmount}
        currency={currency}
        colorContext="light"
        displayPlusSign
        className={classes.amount}
      />
    </div>
  )
}
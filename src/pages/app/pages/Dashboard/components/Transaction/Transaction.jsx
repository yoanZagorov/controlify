import { Amount } from "@/components/Amount";
import { SvgIcon } from "@/components/SvgIcon";
import { useLayout } from "@/hooks";
import { categoryColorsMap } from "@/utils/category";
import formatEntityName from "@/utils/formatting/formatEntityName";
import { capitalize } from "@/utils/str";
import cn from "classnames";

export default function Transaction({ category, wallet, amount, currency }) {
  const {
    breakpoints: {
      isMobile,
      isTablet
    }
  } = useLayout();


  const circleWrapperClasses = cn(
    "flex justify-center items-center size-10 rounded-full",
    categoryColorsMap.background[category.color]
  )

  const classes = {
    circleWrapper: cn(
      "flex justify-center items-center size-10 rounded-full",
      categoryColorsMap.background[category.color]
    ),
    categoryName: cn(
      "text-gray-dark font-semibold",
      // To do: implement different text size, based on the breakpoint and sidebar state

    )
  }

  const formattedCategoryName = formatEntityName(category.name);
  const formattedWalletName = formatEntityName(wallet.name);

  const correctSignAmount = category.type === "expense" ? -amount : amount;

  return (
    <div className="flex items-center gap-3">
      <div className={classes.circleWrapper}>
        <SvgIcon iconName={category.iconName} className="size-5 fill-gray-light" />
      </div>

      <div className="flex flex-col">
        <span className="text-gray-dark text-xs mm:text-sm tab:max-ls:text-xs font-semibold">{formattedCategoryName}</span>
        <div className="flex items-center gap-1 text-gray-dark opacity-50 font-bold">
          <SvgIcon iconName={wallet.iconName} className="size-3 fill-current" />
          <span className="text-xs">{formattedWalletName}</span>
        </div>
      </div>

      <Amount
        amount={correctSignAmount}
        currency={currency}
        colorContext="light"
        displayPlusSign
        className="text-nowrap ml-auto font-semibold text-right"
      />
    </div>
  )
}
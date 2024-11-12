import { formatUserBalance } from "@/utils/formatting";
import cn from "classnames";

export default function Amount({ amount, currency, colorContext, displayPlusSign = false, className }) {
  const isNegative = amount < 0;
  const isDark = colorContext === "dark";
  const absAmount = Math.abs(amount);
  const formattedAmount = formatUserBalance(absAmount);

  const balanceClass = cn(
    {
      "text-red-light": isNegative && isDark,
      "text-red-dark": isNegative && !isDark,
      "text-green-light": !isNegative && isDark,
      "text-green-dark": !isNegative && !isDark,
    },
    className
  )

  const sign = isNegative
    ? "-"
    : displayPlusSign ? "+" : "";

  return (
    <span className={balanceClass}>
      {sign}{currency} {formattedAmount}
    </span>
  );
}
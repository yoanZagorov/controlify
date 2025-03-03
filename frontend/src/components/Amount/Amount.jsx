import cn from "classnames";

// Used to display amount in various ways in the application
export default function Amount({ amount, currency, colorContext, displayPlusSign = false, className }) {
  const isNegative = amount < 0;
  const isDark = colorContext === "dark";

  const formattedAmount = Math.abs(amount).toFixed(2);

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
      <span className="text-nowrap">{sign}{currency}</span> {formattedAmount}
    </span>
  );
}
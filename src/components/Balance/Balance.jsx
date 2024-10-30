import cn from "classnames";

export default function Balance({ balance, currency, type, className }) {
  const isNegative = balance < 0;
  const absBalance = Math.abs(balance);
  const isDark = type === "dark";

  const classes = cn(
    isNegative
      ? isDark
        ? "text-red-dark"
        : "text-red-light"
      : isDark
        ? "text-green-dark"
        : "text-green-light"
    , className
  );

  return (
    <span className={classes}>
      {isNegative ? "-" : ""}{currency} {absBalance}
    </span>
  );
}
import cn from "classnames";

export default function formatBalance(balance, currency, className) {
  const isNegative = balance < 0;
  const absBalance = Math.abs(balance);
  const classes = cn(isNegative ? "text-red-light" : "text-green-dark", className);

  return `
    <span className=${classes}>
      ${isNegative ? "-" : ""}${currency} ${absBalance}
    </span>
  `;
}
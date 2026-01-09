import { Amount } from "#components/Amount";
import cn from "classnames";

export default function CustomTooltip({ active, payload, currency }) {
  if (active && payload && payload.length) {
    const amount = payload[0].value;
    const isExpense = payload[0].payload.name === "expense";

    return (
      <p className="bg-gray-medium p-2.5 rounded-lg text-sm text-gray-dark font-bold">
        Amount: <Amount amount={amount} currency={currency} className={cn("font-semibold", isExpense ? "text-red-dark" : "text-green-dark")} />
      </p>
    )
  }

  return null;
}
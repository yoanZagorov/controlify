import { Amount } from "#components/Amount";

export default function CustomTooltip({ active, label, payload, currency }) {
  if (active && payload && payload.length) {
    const expenseAmount = payload[0]?.value;
    const incomeAmount = payload[1]?.value;

    return (
      <div className="bg-gray-medium p-2.5 rounded-lg text-sm">
        <p className="text-gray-dark font-bold">Date: <span className="font-normal">{label}</span></p>
        <p className="text-gray-dark font-bold">
          Expense:
          &#32; {/* space */}
          <Amount
            amount={expenseAmount}
            currency={currency}
            colorContext="light"
            className="font-semibold text-red-dark"
          />
        </p>
        <p className="text-gray-dark font-bold">
          Income:
          &#32; {/* space */}
          <Amount
            amount={incomeAmount}
            currency={currency}
            colorContext="light"
            className="font-semibold"
          />
        </p>
      </div>
    )
  }

  return null;
}

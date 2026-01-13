import { Amount } from '#/components/Amount'

export default function CustomTooltip({ active, label, payload, currency }) {
  if (active && payload && payload.length) {
    const expenseAmount = payload[0]?.value
    const incomeAmount = payload[1]?.value

    return (
      <div className="rounded-lg bg-gray-medium p-2.5 text-sm">
        <p className="font-bold text-gray-dark">
          Date: <span className="font-normal">{label}</span>
        </p>
        <p className="font-bold text-gray-dark">
          Expense: &#32; {/* space */}
          <Amount
            amount={expenseAmount}
            currency={currency}
            colorContext="light"
            className="font-semibold text-red-dark"
          />
        </p>
        <p className="font-bold text-gray-dark">
          Income: &#32; {/* space */}
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

  return null
}

import { Amount } from '#/components/Amount'

export default function CustomTooltip({ active, label, payload, currency }) {
  if (active && payload && payload.length) {
    const amount = payload[0]?.value
    return (
      <div className="rounded-lg bg-gray-medium p-2.5 text-sm">
        <p className="font-bold text-gray-dark">
          Date: <span className="font-normal">{label}</span>
        </p>
        <p className="font-bold text-gray-dark">
          Balance: &#32; {/* space */}
          <Amount
            amount={amount}
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

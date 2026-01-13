import { Amount } from '#/components/Amount'

export default function CustomTooltip({ active, label, payload, currency }) {
  if (active && payload && payload.length) {
    const amount = payload[1]?.value

    return (
      <div
        className="rounded-lg bg-gray-medium p-2.5 text-sm"
        data-actionable={true}
      >
        {label === 'Total' ? (
          <p className="font-bold text-gray-dark">
            Total: &#32; {/* space */}
            <Amount
              amount={amount}
              currency={currency}
              colorContext="light"
              className="font-semibold"
              displayPlusSign={true}
            />
          </p>
        ) : (
          <>
            <p className="font-bold text-gray-dark">
              Date: <span className="font-normal">{label}</span>
            </p>
            <p className="font-bold text-gray-dark">
              Balance change: &#32; {/* space */}
              <Amount
                amount={amount}
                currency={currency}
                colorContext="light"
                className="font-semibold"
                displayPlusSign={true}
              />
            </p>
          </>
        )}
      </div>
    )
  }

  return null
}

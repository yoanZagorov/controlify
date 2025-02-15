import { Amount } from "@/components/Amount";

export default function CustomTooltip({ active, label, payload, currency }) {
  if (active && payload && payload.length) {
    const amount = payload[1]?.value;

    return (
      <div className="bg-gray-medium p-2.5 rounded-lg text-sm" data-actionable={true}>
        {label === "Total" ? (
          <p className="text-gray-dark font-bold">
            Total:
            &#32; {/* space */}
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
            <p className="text-gray-dark font-bold">Date: <span className="font-normal">{label}</span></p>
            <p className="text-gray-dark font-bold">
              Balance change:
              &#32; {/* space */}
              <Amount
                amount={amount}
                currency={currency}
                colorContext="light"
                className="font-semibold"
                displayPlusSign={true}
              />
            </p>
          </>
        )
        }
      </div>
    )
  }

  return null;
}

import { Amount } from "@/components/Amount";

export default function CustomTooltip({ chartType = "line", active, label, payload, currency }) {
  if (active && payload && payload.length) {
    const isWaterfall = chartType === "waterfall";
    const amount = payload[isWaterfall ? 1 : 0]?.value;
    // const amount = payload[0].value
    return (
      <div className="bg-gray-medium p-2.5 rounded-lg text-sm">
        <p className="text-gray-dark font-bold">Date: <span className="font-normal">{label}</span></p>
        <p className="text-gray-dark font-bold">
          Balance{isWaterfall ? " change" : ""}:
          &#32; {/* space */}
          <Amount
            amount={amount}
            currency={currency}
            colorContext="light"
            className="font-semibold"
            displayPlusSign={isWaterfall ? true : false}
          />
        </p>
      </div>
    )
  }

  return null;
}

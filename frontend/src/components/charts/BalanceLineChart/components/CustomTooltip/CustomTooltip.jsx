import { Amount } from "@/components/Amount";

export default function CustomTooltip({ chartType = "line", active, label, payload, currency }) {
  if (active && payload && payload.length) {
    const amount = payload[chartType === "waterfall" ? 1 : 0]?.value;
    return (
      <div className="bg-gray-medium p-2.5 rounded-lg text-sm">
        <p className="text-gray-dark font-bold">Date: <span className="font-normal">{label}</span></p>
        <p className="text-gray-dark font-bold">
          Balance: <Amount amount={amount} currency={currency} colorContext="light" className="font-semibold" />
        </p>
      </div>
    )
  }

  return null;
}

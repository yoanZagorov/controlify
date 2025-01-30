import { Amount } from "@/components/Amount";

export default function CustomTooltip(props) {
  const { active, payload, currency } = props;

  if (active && payload && payload.length) {
    const amount = payload[0].value;

    const correctSignAmount = payload[0].payload.name === "expenses"
      ? -amount
      : amount;

    return (
      <p className="bg-gray-medium p-2.5 rounded-lg text-sm text-gray-dark font-bold">
        Amount: <Amount amount={correctSignAmount} currency={currency} colorContext="light" className="font-semibold" />
      </p>
    )
  }

  return null;
}
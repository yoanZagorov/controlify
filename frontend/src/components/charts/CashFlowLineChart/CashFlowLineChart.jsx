import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomTooltip } from "../BalanceLineChart/components/CustomTooltip";
import { CustomXAxisTick } from "../BalanceLineChart/components/CustomXAxisTick";
import { CustomYAxisTick } from "../BalanceLineChart/components/CustomYAxisTick";

export default function CashFlowLineChart({ data, currency }) {
  const RED = "#CC0000";
  const GREEN = "#008000";

  return (
    <ResponsiveContainer className="w-full h-full">
      <LineChart data={data} margin={{ left: 15 }}>
        <CartesianGrid className="stroke-gray-medium" strokeDasharray="3 3" />
        <XAxis dataKey="presentationKey" tick={<CustomXAxisTick />} />
        <YAxis tick={<CustomYAxisTick currency={currency} />} />
        <Tooltip wrapperClassName="rounded-lg" content={<CustomTooltip currency={currency} />} />
        <Line type="monotone" dataKey="expense" stroke={RED} dot={false} />
        <Line type="monotone" dataKey="income" stroke={GREEN} dot={false} />
      </LineChart >
    </ResponsiveContainer >
  )
}
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomXAxisTick } from "./components/CustomXAxisTick";
import { CustomYAxisTick } from "./components/CustomYAxisTick";
import { CustomTooltip } from "./components/CustomTooltip";

export default function BalanceLineChart({ data, currency }) {
  return (
    <ResponsiveContainer className="w-full h-full">
      <LineChart data={data} margin={{ left: 15 }}>
        <CartesianGrid className="stroke-gray-medium" strokeDasharray="3 3" />
        <XAxis dataKey="presentationKey" tick={<CustomXAxisTick />} />
        <YAxis tick={<CustomYAxisTick currency={currency} />} />
        <Tooltip wrapperClassName="rounded-lg" content={<CustomTooltip currency={currency} />} />
        <Line type="monotone" dataKey="balance" stroke={"#002B5B"} dot={false} />
      </LineChart >
    </ResponsiveContainer >
  )
}

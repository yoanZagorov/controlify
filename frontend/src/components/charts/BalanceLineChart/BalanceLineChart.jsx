import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomXAxisTick } from "./components/CustomXAxisTick";
import { CustomYAxisTick } from "./components/CustomYAxisTick";
import { CustomTooltip } from "../components/CustomTooltip";
import { COLORS } from "@/constants";

export default function BalanceLineChart({ data, lineDataKey, currency }) {
  return (
    <ResponsiveContainer className="w-full h-full">
      <LineChart data={data} margin={{ top: 10, left: 15, right: 15 }}>
        <CartesianGrid className="stroke-gray-medium" strokeDasharray="3 3" />
        <XAxis dataKey="presentationKey" tick={<CustomXAxisTick />} />
        <YAxis tick={<CustomYAxisTick currency={currency} />} />
        <Tooltip wrapperClassName="rounded-lg" content={<CustomTooltip currency={currency} />} />
        <Line type="monotone" dataKey={lineDataKey} stroke={COLORS.THEME.NAVY} dot={false} />
      </LineChart >
    </ResponsiveContainer >
  )
}

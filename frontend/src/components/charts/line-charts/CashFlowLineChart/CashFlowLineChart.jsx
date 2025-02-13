import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomTooltip } from "../BalanceOverTimeLineChart/components/CustomTooltip";
import { CustomXAxisTick } from "../BalanceOverTimeLineChart/components/CustomXAxisTick";
import { CustomYAxisTick } from "../BalanceOverTimeLineChart/components/CustomYAxisTick";
import { COLORS } from "@/constants";

export default function CashFlowLineChart({ data, currency }) {
  return (
    <ResponsiveContainer className="w-full h-full">
      <LineChart data={data} margin={{ left: 15 }}>
        <CartesianGrid className="stroke-gray-medium" strokeDasharray="3 3" />
        <XAxis dataKey="presentationKey" tick={<CustomXAxisTick />} />
        <YAxis tick={<CustomYAxisTick currency={currency} />} />
        <Tooltip wrapperClassName="rounded-lg" content={<CustomTooltip currency={currency} />} />
        <Line type="monotone" dataKey="expense" stroke={COLORS.THEME.RED.DARK} dot={false} />
        <Line type="monotone" dataKey="income" stroke={COLORS.THEME.GREEN.DARK} dot={false} />
      </LineChart >
    </ResponsiveContainer >
  )
}
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { COLORS } from "@/constants";

import { CustomXAxisTick } from "../BalanceOverTimeLineChart/components/CustomXAxisTick";
import { CustomYAxisTick } from "../BalanceOverTimeLineChart/components/CustomYAxisTick";
import { CustomTooltip } from "./components/CustomTooltip";

export default function CashFlowOverTimeLineChart({ data, currency }) {
  return (
    <ResponsiveContainer>
      <LineChart data={data} margin={{ top: 10, left: 15, right: 15 }}>
        <CartesianGrid className="stroke-gray-medium" strokeDasharray="3 3" />
        <XAxis dataKey="presentationKey" tick={<CustomXAxisTick />} />
        <YAxis tick={<CustomYAxisTick currency={currency} />} />
        <Tooltip content={<CustomTooltip currency={currency} />} />
        <Line type="monotone" dataKey="expense" stroke={COLORS.THEME.RED.DARK} dot={false} />
        <Line type="monotone" dataKey="income" stroke={COLORS.THEME.GREEN.DARK} dot={false} />
      </LineChart >
    </ResponsiveContainer >
  )
}
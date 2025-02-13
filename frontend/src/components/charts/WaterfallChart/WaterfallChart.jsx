import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { CustomXAxisTick } from "../line-charts/BalanceOverTimeLineChart/components/CustomXAxisTick";
import { CustomYAxisTick } from "../line-charts/BalanceOverTimeLineChart/components/CustomYAxisTick";
import { CustomTooltip } from "../line-charts/BalanceOverTimeLineChart/components/CustomTooltip";
import { COLORS } from "@/constants";

export default function WaterfallChart({ data, currency }) {
  const customCells = data.map((day, index) => {
    return (
      <Cell
        key={index}
        fill={
          day.presentationKey === "Total" ? COLORS.THEME.NAVY
            : day.balanceChange < 0 ? COLORS.THEME.RED.DARK
              : COLORS.THEME.GREEN.DARK
        }
      />
    )
  });

  return (
    <ResponsiveContainer className="w-full h-full">
      <BarChart data={data} margin={{ left: 15 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="presentationKey" tick={<CustomXAxisTick />} />
        <YAxis tick={<CustomYAxisTick currency={currency} />} />
        <Tooltip wrapperClassName="rounded-lg" content={<CustomTooltip chartType="waterfall" currency={currency} />} />
        <Bar dataKey="prevDayBalance" stackId="a" fill="transparent" isAnimationActive={false} />
        <Bar dataKey="balanceChange" stackId="a" isAnimationActive={false}>
          {customCells}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

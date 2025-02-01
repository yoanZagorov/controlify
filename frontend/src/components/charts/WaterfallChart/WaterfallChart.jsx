import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { CustomXAxisTick } from "../BalanceLineChart/components/CustomXAxisTick";
import { CustomYAxisTick } from "../BalanceLineChart/components/CustomYAxisTick";
import { CustomTooltip } from "../BalanceLineChart/components/CustomTooltip";

export default function WaterfallChart({ data, currency }) {
  const RED = "#CC0000";
  const GREEN = "#008000";
  const NAVY = "#002B5B";

  const customCells = data.map((day, index) => {
    return (
      <Cell
        key={index}
        fill={
          day.presentationKey === "Total" ? NAVY
            : day.balanceChange < 0 ? RED
              : GREEN
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
        <Bar dataKey="accumulatedBalance" stackId="a" fill="transparent" isAnimationActive={false} />
        <Bar dataKey="balanceChange" stackId="a" isAnimationActive={false}>
          {customCells}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

import cn from "classnames";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function CustomizedXAxisTick({ x, y, payload }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        className="font-bold fill-navy"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  )
}

function CustomizedYAxisTick({ x, y, payload }) {
  const isPositive = payload.value >= 0;
  const absAmount = Math.abs(payload.value);
  const sign = isPositive ? "" : "-";

  const textClasses = cn(
    "font-bold",
    isPositive ? "fill-green-dark" : "fill-red-dark"
  )

  return (
    <g >
      <text
        x={x}
        y={y}
        dx={-5}
        textAnchor="end"
        dominantBaseline="middle"
        className={textClasses}
      >
        {sign}BGN {absAmount}
      </text>
    </g>
  )
}


export default function BalanceLineChart({ data }) {
  return (
    <ResponsiveContainer className="mt-4 w-full min-h-48 ml:min-h-56 p-2 ml:p-4 rounded-lg text-xs text-navy bg-gray-light">
      <LineChart data={data} margin={{ top: 15, right: 5, bottom: 10, left: 40 }}>
        <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
        <XAxis dataKey="presentationKey" tick={<CustomizedXAxisTick />} />
        <YAxis width={30} tick={<CustomizedYAxisTick />} className="fill-navy" />
        <Tooltip />
        <Line type="monotone" dataKey="balance" stroke="#002B5B" dot={false} />
      </LineChart >
    </ResponsiveContainer >
  )
}

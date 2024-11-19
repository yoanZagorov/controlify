import cn from "classnames";

export default function CustomYAxisTick({ x, y, payload, currency }) {
  const isPositive = payload.value >= 0;
  const absAmount = Math.abs(payload.value);
  const sign = isPositive ? "" : "-";

  const textClasses = cn(
    "text-xs font-bold",
    isPositive ? "fill-green-dark" : "fill-red-dark"
  )

  return (
    <g>
      <text
        x={x - 5}
        y={y}
        textAnchor="end"
        dominantBaseline="middle"
        className={textClasses}
      >
        {sign}{currency} {absAmount}
      </text>
    </g>
  )
}
import cn from "classnames";

export default function CustomYAxisTick({ x, y, payload, currency }) {
  // Could not use the custom Amount component since <text> accepts a text node, not a <span>
  const isPositive = payload.value >= 0;
  const absAmount = Math.abs(payload.value);
  const sign = isPositive ? "" : "-";

  return (
    <g>
      <text
        x={x - 5}
        y={y}
        textAnchor="end"
        dominantBaseline="middle"
        className={cn(
          "text-xs font-bold",
          isPositive ? "fill-green-dark" : "fill-red-dark"
        )}
      >
        {sign}{currency} {absAmount}
      </text>
    </g>
  )
}
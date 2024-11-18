import cn from "classnames";

export default function CustomizedYAxisTick({ x, y, payload }) {
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
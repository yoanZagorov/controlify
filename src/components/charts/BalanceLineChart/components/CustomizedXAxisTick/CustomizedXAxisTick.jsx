export default function CustomizedXAxisTick({ x, y, payload }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        className="font-bold fill-gray-dark"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  )
}
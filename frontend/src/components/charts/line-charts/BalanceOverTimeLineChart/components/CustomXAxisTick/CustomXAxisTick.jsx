export default function CustomXAxisTick({ x, y, payload }) {
  const VERTICAL_DISTANCE_X_AXIS = 16

  return (
    <g>
      <text
        x={x}
        y={y + VERTICAL_DISTANCE_X_AXIS}
        textAnchor="middle"
        className="fill-gray-dark text-xs font-bold"
      >
        {payload.value}
      </text>
    </g>
  )
}

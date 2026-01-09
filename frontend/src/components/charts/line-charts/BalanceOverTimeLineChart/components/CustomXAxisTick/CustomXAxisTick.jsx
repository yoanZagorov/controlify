export default function CustomXAxisTick({ x, y, payload }) {
  const VERTICAL_DISTANCE_X_AXIS = 16

  return (
    <g>
      <text
        x={x}
        y={y + VERTICAL_DISTANCE_X_AXIS}
        textAnchor="middle"
        className="text-xs font-bold fill-gray-dark"
      >
        {payload.value}
      </text>
    </g>
  )
}

import { capitalize } from '#/utils/str'

export default function CustomLabel({ x, y, name }) {
  const barMarginTop = 15
  return (
    <text
      className="text-lg font-semibold text-gray-dark"
      x={x}
      y={y - barMarginTop}
    >
      {capitalize(name)}
    </text>
  )
}

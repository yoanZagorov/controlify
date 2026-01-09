import { capitalize } from '#utils/str'

export default function CustomLabel({ x, y, name }) {
  const barMarginTop = 15
  return (
    <text
      className="text-lg text-gray-dark font-semibold"
      x={x}
      y={y - barMarginTop}
    >
      {capitalize(name)}
    </text>
  )
}

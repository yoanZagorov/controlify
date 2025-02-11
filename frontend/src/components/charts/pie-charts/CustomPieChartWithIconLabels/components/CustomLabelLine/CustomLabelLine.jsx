export default function CustomLabelLine({ size, cx, cy, midAngle, percent, outerRadius, stroke }) {
  if (percent === 0) return null;

  // Constants and maps
  const RADIAN = Math.PI / 180;
  const STROKE_WIDTH = 1;

  const lineLengths = {
    s: 20,
    m: 22.5,
    l: 25
  }

  const x1 = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const y1 = cy + outerRadius * Math.sin(-midAngle * RADIAN);

  const x2 = x1 + lineLengths[size] * Math.cos(-midAngle * RADIAN);
  const y2 = y1 + lineLengths[size] * Math.sin(-midAngle * RADIAN);

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={STROKE_WIDTH}
    >
    </line>
  )
}

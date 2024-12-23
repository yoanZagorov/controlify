import { useBreakpoint } from "@/hooks";

export default function CustomLabelLine({ cx, cy, midAngle, percent, outerRadius, stroke, isExpensesByWallet }) {
  const { isMobileS, isMobileM } = useBreakpoint();

  if (percent === 0) return null;

  const lineLengthByCategory =
    isMobileS ? 20
      : isMobileM ? 22.5
        : 25;

  const lineLengthByWallet =
    isMobileS ? 10
      : isMobileM ? 12.5
        : 15;

  const lineLength = isExpensesByWallet
    ? lineLengthByWallet
    : lineLengthByCategory;

  const RADIAN = Math.PI / 180;

  const x1 = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const y1 = cy + outerRadius * Math.sin(-midAngle * RADIAN);

  const x2 = x1 + lineLength * Math.cos(-midAngle * RADIAN);
  const y2 = y1 + lineLength * Math.sin(-midAngle * RADIAN);

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={1}
    >
    </line>
  )
}

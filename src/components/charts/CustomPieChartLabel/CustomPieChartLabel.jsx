import { formatEntityName } from "@/utils/formatting";
import { useEffect, useRef, useState } from "react";

export default function CustomPieChartLabel({ cx, cy, midAngle, outerRadius, name, percent, fill }) {
  if (percent === 0) return null;

  const RADIAN = Math.PI / 180;

  // Text label
  const textLabelMargin = 30;
  const rectPadding = 26;
  const rectHeight = 30;

  const textRef = useRef(null);
  const [rectWidth, setRectWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setRectWidth(textRef.current.getComputedTextLength() + rectPadding);
    }
  }, [])

  const radiusTextLabel = outerRadius + textLabelMargin;
  const xTextLabel = cx + (radiusTextLabel * Math.cos(-midAngle * RADIAN));
  const yTextLabel = cy + (radiusTextLabel * Math.sin(-midAngle * RADIAN));

  const isLeftSide = midAngle > 90 && midAngle < 180;

  // Percentage label 
  const radiusPercentageLabel = outerRadius * 0.5; // Right between the center and the edge
  const xPercentageLabel = cx + radiusPercentageLabel * Math.cos(-midAngle * RADIAN);
  const yPercentageLabel = cy + radiusPercentageLabel * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <rect
        x={isLeftSide ? xTextLabel - rectWidth : xTextLabel}
        y={isLeftSide ? yTextLabel - rectHeight : yTextLabel}
        width={rectWidth}
        height={rectHeight}
        rx={5}
        fill={fill}
      >
      </rect>
      <text
        ref={textRef}
        x={isLeftSide ? xTextLabel - rectWidth / 2 : xTextLabel + rectWidth / 2}
        y={isLeftSide ? yTextLabel - rectHeight / 2 : yTextLabel + rectHeight / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-gray-light font-semibold text-shadow"
      >
        {formatEntityName(name)}
      </text>

      <text
        x={xPercentageLabel}
        y={yPercentageLabel}
        className="text-xs fill-black font-bold"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </>
  )
}
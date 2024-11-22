import { useBreakpoint } from "@/hooks";
import { formatEntityName } from "@/utils/formatting";
import { useEffect, useRef, useState } from "react";

export default function CustomExpensesByWalletLabel({ cx, cy, midAngle, outerRadius, name, percent, fill, showChartLabel }) {
  if (percent === 0) return null;

  const RADIAN = Math.PI / 180;

  const { isMobileS, isMobileM } = useBreakpoint();
  // Text label
  const textLabelMargin = 30;
  const rectPadding = (isMobileS || isMobileM) ? 16 : 20;
  const rectHeight = (isMobileS || isMobileM) ? 26 : 30;

  const textRef = useRef(null);
  const [rectWidth, setRectWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setRectWidth(textRef.current.getComputedTextLength() + rectPadding);
    }
  }, [showChartLabel])

  const radiusTextLabel = outerRadius + textLabelMargin;
  const xRect = cx + (radiusTextLabel * Math.cos(-midAngle * RADIAN));
  const yRect = (cy + (radiusTextLabel * Math.sin(-midAngle * RADIAN))) - (0.5 * rectHeight);

  const isLeftSide = midAngle > 90 && midAngle < 270;

  // Percentage label 
  const radiusPercentageLabel = outerRadius * 0.5; // Right between the center and the edge
  const xPercentageLabel = cx + radiusPercentageLabel * Math.cos(-midAngle * RADIAN);
  const yPercentageLabel = cy + radiusPercentageLabel * Math.sin(-midAngle * RADIAN);

  return (
    <>
      {showChartLabel &&
        <>
          <rect
            x={isLeftSide ? xRect - rectWidth : xRect}
            y={yRect}
            width={rectWidth}
            height={rectHeight}
            rx={5}
            fill={fill}
          >
          </rect>
          <text
            ref={textRef}
            x={isLeftSide ? xRect - rectWidth / 2 : xRect + rectWidth / 2}
            y={yRect + (0.5 * rectHeight)}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-xs ml:text-sm fill-gray-light font-semibold text-shadow"
          >
            {formatEntityName(name)}
          </text>
        </>
      }
      <text
        x={xPercentageLabel}
        y={yPercentageLabel}
        className="text-xs fill-gray-light font-bold"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </>
  )
}
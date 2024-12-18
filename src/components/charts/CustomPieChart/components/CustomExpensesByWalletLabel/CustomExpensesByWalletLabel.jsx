import { useEffect, useRef, useState } from "react";

import { useBreakpoint } from "@/hooks";
import { formatEntityName } from "@/utils/formatting";

export default function CustomExpensesByWalletLabel(props) {
  const { cx, cy, midAngle, outerRadius, name, percent, fill, showChartLabel } = props;

  if (percent === 0) return null;

  const { isMobileS, isMobileM } = useBreakpoint();

  const textRef = useRef(null);

  const [textDimensions, setTextDimensions] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    if (textRef.current) {
      const textDimensions = textRef.current.getBoundingClientRect();

      const { width: textWidth, height: textHeight } = textDimensions;

      setTextDimensions({
        width: textWidth,
        height: textHeight
      });
    }
  }, []);

  const RADIAN = Math.PI / 180;

  // Text label
  const lineLength =
    isMobileS ? 10
      : isMobileM ? 12.5
        : 15;

  const textLabelMargin = 10;


  const radiusTextLabel = outerRadius + lineLength + textLabelMargin;
  const xText = cx + radiusTextLabel * Math.cos(-midAngle * RADIAN);
  const yText = cy + radiusTextLabel * Math.sin(-midAngle * RADIAN);

  const isLeftSide = midAngle > 90 && midAngle < 270;

  // Percentage label 
  const radiusPercentageLabel = outerRadius * 0.5; // Right between the center and the edge
  const xPercentageLabel = cx + radiusPercentageLabel * Math.cos(-midAngle * RADIAN);
  const yPercentageLabel = cy + radiusPercentageLabel * Math.sin(-midAngle * RADIAN);

  const words = formatEntityName(name).split(" ");

  const lineSpacing = 20;

  const textEls = words.map((word, index) => (
    <tspan
      key={index}
      x={isLeftSide ? xText - textDimensions.width : xText + textDimensions.width}
      dy={index === 0 ? 0 : lineSpacing}
    >
      {word}
    </tspan>
  ))

  return (
    <>
      {showChartLabel &&
        <text
          ref={textRef}
          // x={isLeftSide ? xText - textDimensions.width : xText + textDimensions.width}
          x={xText}
          y={yText}
          // textAnchor="middle"
          dominantBaseline="hanging"
          className="text-xs ml:text-sm font-black"
          fill={fill}
          transform={`translate(0, ${-textDimensions.height / 2})`}
        >
          {textEls}
        </text>
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
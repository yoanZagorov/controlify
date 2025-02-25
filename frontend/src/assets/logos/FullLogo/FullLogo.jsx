import { COLORS } from "@/constants";
import cn from "classnames";
import { useLayoutEffect, useRef, useState } from "react";

// The textLength property doesn't work on iOS - that's why manual calculation is needed to space the letters evenly
export default function FullLogo({ color = COLORS.THEME.NAVY, className }) {
  const LOGO_LABEL = "CONTROLIFY";
  const LABEL_NUM_LETTERS = LOGO_LABEL.split("").length;

  const textRef = useRef(null);
  const svgRef = useRef(null);
  const [textGapWidth, setTextGapWidth] = useState(0);

  // Using a layout effect to prevent layout UI jumps
  useLayoutEffect(() => {
    if (svgRef?.current && textRef?.current) {
      const svgViewBoxWidth = svgRef.current.viewBox.baseVal.width;
      const svgWidth = svgRef.current.getBoundingClientRect().width;
      // Since svgWidth is in pixels, but the textGap would need to be set as a unitless value used for the viewport, calculate the conversion ratio
      const pixelToViewBoxRatio = svgWidth / svgViewBoxWidth;

      const textWidth = textRef.current.getBoundingClientRect().width;

      const spaceLeft = svgWidth - textWidth; // Calculate how much free space there is 
      const textGapWidthPx = spaceLeft / (LABEL_NUM_LETTERS - 1); // Calculate the individual letters gap

      setTextGapWidth(textGapWidthPx / pixelToViewBoxRatio); // Convert to viewBox value and set the state
    }
  }, []);

  const letterEls = LOGO_LABEL.split("").map((letter, i) => (
    <tspan key={`tspan-${i}`} dx={i === 0 ? 0 : textGapWidth}>{letter}</tspan>
  ));

  // Can't use the same size for the y viewBox value and the fontSize because the <text> applies additional vertical spacing 
  return (
    <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100" className={cn("w-full", className)}>
      {/* "CONTROLIFY" Text */}
      {/* centering vertically with y=60% because using capital letters */}
      <text
        ref={textRef}
        x="50%"
        textAnchor="middle"
        y="60%"
        dy="0.25em" // Using this to center across the y axis since dominantBaseline="middle" doesn't work on iOS
        fontSize="80"
        fill={color}
        className="font-inter font-medium"
      >
        {letterEls}
      </text>

      {/* Gold Coin replacing the second "O" */}
      {/* Placing is a bit odd but there was no better way since svg-s can't be rendered inside <text> or <tspan> */}
      <svg x="377" y="12" height="80" width="80" viewBox="0 0 291.764 291.764">
        <path fill="#EFC75E" d="M145.882,0c80.573,0,145.882,65.319,145.882,145.882s-65.31,145.882-145.882,145.882   S0,226.446,0,145.882S65.31,0,145.882,0z" />
        <path fill="#CC9933" d="M145.882,27.353c-65.465,0-118.529,53.065-118.529,118.529s53.065,118.529,118.529,118.529   s118.529-53.065,118.529-118.529S211.347,27.353,145.882,27.353z M145.882,246.176c-55.39,0-100.294-44.904-100.294-100.294   S90.493,45.588,145.882,45.588s100.294,44.904,100.294,100.294S201.281,246.176,145.882,246.176z M158.009,138.269   c-5.452-2.289-25.493-5.452-25.493-14.214c0-6.464,7.495-8.334,11.99-8.334c4.094,0,8.999,1.295,11.589,3.875   c1.641,1.577,2.316,2.726,2.854,4.313c0.684,1.869,1.094,3.875,3.684,3.875h13.357c3.136,0,3.957-0.574,3.957-4.021   c0-14.789-11.589-23.122-24.809-25.994V86.28c0-2.58-0.821-4.167-3.957-4.167h-10.64c-3.136,0-3.957,1.577-3.957,4.167v11.051   c-14.178,2.726-26.031,11.634-26.031,27.718c0,18.235,12.683,23.979,26.441,28.566c11.589,3.884,23.724,4.021,23.724,12.063   s-5.99,9.765-13.357,9.765c-5.051,0-10.631-1.304-13.366-4.741c-1.769-2.152-2.453-4.021-2.58-5.89   c-0.274-3.592-1.769-4.021-4.914-4.021H113.28c-3.136,0-3.957,0.729-3.957,4.021c0,16.366,13.093,26.286,27.262,29.441v11.206   c0,2.58,0.821,4.167,3.957,4.167h10.64c3.136,0,3.957-1.586,3.957-4.167v-10.905c16.084-2.453,27.125-12.209,27.125-29.441   C182.28,145.591,167.829,141.424,158.009,138.269z" />
      </svg>
    </svg>
  )
}
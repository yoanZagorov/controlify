import { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Customized } from 'recharts';
import { Needle } from './components/Needle';

export default function FinancialScoreGaugeChart({ financialScore, size = "m" }) {
  const RED = "#CC0000";
  const YELLOW = "#FFC107";
  const GREEN = "#008000";
  const NAVY = "#002B5B";

  // Need to use dynamic calculating to be able to draw the needle
  const chartRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (chartRef.current) {
        const { width, height } = chartRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const cx = dimensions.width / 2;
  const cy = dimensions.height * 0.75; // Centers the half-circle
  const outerRadius =
    size === "s" ? 75
      : size === "m" ? 100
        : 125;
  const innerRadius = outerRadius * 0.5; // Defines the thickness of the chart
  const value = financialScore;

  const data = [
    { name: "Poor", value: 33.33, color: RED },
    { name: "Stable", value: 33.33, color: YELLOW },
    { name: "Excellent", value: 33.33, color: GREEN }
  ];

  // Need to return it like this or else it doesn't work
  function CustomizedNeedle() {
    return (
      <Needle
        value={value}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        color={NAVY}
      />
    )
  }

  return (
    <ResponsiveContainer ref={chartRef} className="w-full h-full">
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          isAnimationActive={false} // To do: investigate the rendering issues
        >
          {data.map((section, index) => (
            <Cell key={`cell-${index}`} fill={section.color} />
          ))}
        </Pie>

        <Customized component={CustomizedNeedle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

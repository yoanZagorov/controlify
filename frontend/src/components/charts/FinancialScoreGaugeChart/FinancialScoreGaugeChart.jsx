import { useEffect, useRef, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Customized } from 'recharts'

import { COLORS } from '#/constants'

import { Needle } from './components/Needle'

export default function FinancialScoreGaugeChart({
  financialScore,
  size = 'm',
}) {
  // Need to use dynamic calculations to be able to draw the needle
  const chartRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      if (chartRef.current) {
        const { width, height } = chartRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateSize()

    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const cx = dimensions.width / 2
  const cy = dimensions.height * 0.75 // Centers the half-circle
  const outerRadius = size === 's' ? 75 : size === 'm' ? 100 : 125
  const innerRadius = outerRadius * 0.5 // Defines the thickness of the chart
  const value = financialScore

  const data = [
    { name: 'Poor', value: 33.33, color: COLORS.THEME.RED.DARK },
    { name: 'Stable', value: 33.33, color: COLORS.THEME.GOLDENROD },
    { name: 'Excellent', value: 33.33, color: COLORS.THEME.GREEN.DARK },
  ]

  // Need to return it like this (through an intermediary component) or else it doesn't work
  function CustomizedNeedle() {
    return (
      <Needle
        value={value}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        color={COLORS.THEME.NAVY}
      />
    )
  }

  return (
    <ResponsiveContainer ref={chartRef}>
      <PieChart>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          isAnimationActive={false} // To do: Investigate why the animation doesn't work
        >
          {data.map((section, index) => (
            <Cell key={`cell-${index}`} fill={section.color} />
          ))}
        </Pie>

        <Customized component={CustomizedNeedle} />
      </PieChart>
    </ResponsiveContainer>
  )
}

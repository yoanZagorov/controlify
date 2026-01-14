import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { COLORS } from '#/constants'

import { CustomXAxisTick } from '../line-charts/BalanceOverTimeLineChart/components/CustomXAxisTick'
import { CustomYAxisTick } from '../line-charts/BalanceOverTimeLineChart/components/CustomYAxisTick'
import { CustomTooltip } from './components/CustomTooltip'

export default function WaterfallChart({ data, currency }) {
  const customCells = data.map((day, index) => {
    return (
      <Cell
        key={index}
        fill={
          day.presentationKey === 'Total'
            ? COLORS.THEME.NAVY
            : day.balanceChange < 0
              ? COLORS.THEME.RED.DARK
              : COLORS.THEME.GREEN.DARK
        }
        data-actionable={true}
      />
    )
  })

  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={{ top: 10, left: 10, right: 15 }}>
        {' '}
        {/* Margin is essential, or else the labels on the x and y axis don't render correctly */}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="presentationKey" tick={<CustomXAxisTick />} />
        <YAxis tick={<CustomYAxisTick currency={currency} />} />
        <Tooltip content={<CustomTooltip currency={currency} />} />
        <Bar
          dataKey="prevDayBalance"
          stackId="a"
          fill="transparent"
          isAnimationActive={false}
        />
        <Bar
          dataKey="balanceChange"
          stackId="a"
          isAnimationActive={false}
          data-actionable={true}
        >
          {customCells}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

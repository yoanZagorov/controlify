import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CustomLabel } from './components/CustomLabel'
import { CustomTooltip } from './components/CustomTooltip'

export default function ExpensesVsIncomeVerticalBarChart({ currency, data }) {
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        layout="vertical"
        barCategoryGap={10}
        barSize={35}
        margin={{ top: 70, bottom: 50 }}
      >
        {' '}
        {/* Need margin to control the barGap */}
        <Bar dataKey="amount" label={<CustomLabel />} />
        <XAxis type="number" hide={true} />
        <YAxis type="category" hide={true} />
        <Tooltip
          content={<CustomTooltip currency={currency} />}
          cursor={false}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

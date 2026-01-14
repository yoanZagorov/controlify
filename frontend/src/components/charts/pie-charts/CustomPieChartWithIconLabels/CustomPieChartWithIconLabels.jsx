import { Legend, Pie, PieChart, ResponsiveContainer } from 'recharts'

import { CustomLegend } from '../components/CustomLegend'
import { CustomIconLabel } from './components/CustomIconLabel'
import { CustomLabelLine } from './components/CustomLabelLine'

export default function CustomPieChartWithIconLabels({
  entity,
  size = 'm',
  data,
}) {
  const radiiSizes = {
    s: 55,
    m: 65,
    l: 75,
  }

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          outerRadius={radiiSizes[size]}
          label={<CustomIconLabel entity={entity} size={size} />}
          labelLine={<CustomLabelLine size={size} />}
        />
        <Legend
          wrapperStyle={{
            width: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
          }} // center the legend
          content={<CustomLegend entity={entity} />}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

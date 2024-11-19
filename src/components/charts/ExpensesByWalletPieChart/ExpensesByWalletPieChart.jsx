import { Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CustomPieChartLabel } from "../CustomPieChartLabel";
import { CustomPieChartLabelLine } from "../CustomPieChartLabelLine";
import { CustomLegend } from "../CustomLegend";

export default function ExpensesByWalletPieChart({ data, showChartLabel = false }) {
  return (
    <ResponsiveContainer className="w-full h-full">
      <PieChart>
        <Pie
          data={data}
          dataKey="expenses"
          outerRadius={75}
          label={<CustomPieChartLabel showChartLabel={showChartLabel} />}
          labelLine={showChartLabel && <CustomPieChartLabelLine />}
        />
        <Legend
          wrapperStyle={{ width: "100%", left: "50%", transform: "translateX(-50%)" }}
          content={<CustomLegend />}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

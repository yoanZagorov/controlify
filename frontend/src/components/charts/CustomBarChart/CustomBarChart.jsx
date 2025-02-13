import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomLabel } from "./components/CustomLabel";
import { CustomTooltip } from "./components/CustomTooltip";

export default function CustomBarChart({ currency, data }) {
  return (
    <ResponsiveContainer className="w-full h-full">
      <BarChart data={data} layout="vertical" barCategoryGap={10} margin={{ top: 70, right: 0, left: 0, bottom: 50 }} >
        <Bar dataKey="amount" label={<CustomLabel />} barSize={35} />
        <XAxis type="number" hide={true} domain={[0, "dataMax"]} />
        <YAxis type="category" hide={true} />
        <Tooltip content={<CustomTooltip currency={currency} />} cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  )
}

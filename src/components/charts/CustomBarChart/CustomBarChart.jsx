import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomLabel } from "./components/CustomLabel";
import { CustomTooltip } from "./components/CustomTooltip";

export default function CustomBarChart({ data, currency }) {
  console.log(data);

  // margin={{ top: 100, right: 100, left: 100, bottom: 100 }}

  return (
    <ResponsiveContainer className="w-full h-full">
      <BarChart data={data} layout="vertical" barCategoryGap="25%" margin={{ top: 10, right: 0, left: 0, bottom: 0 }} >
        <Bar dataKey="amount" label={<CustomLabel />} barSize={35} />
        <XAxis type="number" hide={true} domain={[0, "dataMax"]} />
        <YAxis type="category" hide={true} />
        <Tooltip content={<CustomTooltip currency={currency} />} cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  )
}

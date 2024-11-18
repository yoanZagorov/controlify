import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomizedXAxisTick } from "./components/CustomizedXAxisTick";
import { CustomizedYAxisTick } from "./components/CustomizedYAxisTick";

export default function BalanceLineChart({ data }) {
  return (
    <ResponsiveContainer className="mt-4 w-full min-h-48 ml:min-h-56 p-2 ml:p-4 rounded-lg text-xs text-navy bg-gray-light">
      <LineChart data={data} margin={{ top: 15, right: 5, bottom: 10, left: 40 }}>
        <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
        <XAxis dataKey="presentationKey" tick={<CustomizedXAxisTick />} />
        <YAxis width={30} tick={<CustomizedYAxisTick />} className="fill-navy" />
        <Tooltip />
        <Line type="monotone" dataKey="balance" stroke="#002B5B" dot={false} />
      </LineChart >
    </ResponsiveContainer >
  )
}

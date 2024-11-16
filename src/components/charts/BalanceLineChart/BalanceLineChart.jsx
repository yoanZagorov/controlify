import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function BalanceLineChart({ data }) {
  console.log(data);
  return (
    <LineChart
      width={500}
      height={300}
      data={data}

    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      {/* <Tooltip />
        <Legend /> */}
      <Line type="monotone" dataKey="balance" stroke="#002B5B" />
    </LineChart>
  )
}

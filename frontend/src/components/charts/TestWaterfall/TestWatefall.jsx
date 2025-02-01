import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const data = [
  {
    name: "01/2020",
    uv: 2400, // uv is the part of the graph we want to show
    pv: 0 // pv is the floating part (transparent)
  },
  {
    name: "02/2020",
    uv: -400,
    pv: 2400 // to get this pv, we use 01/2020's uv + pv
  },
  {
    name: "03/2020",
    uv: -400,
    pv: 2000 // use 02/2020's uv + pv, and so forth
  },
  {
    name: "04/2020",
    uv: 800,
    pv: 1600
  },
  {
    name: "05/2020",
    uv: 900,
    pv: 2400
  },
  {
    name: "06/2020",
    uv: -500,
    pv: 3300
  },
  {
    name: "07/2020",
    uv: 900,
    pv: 2800
  },
  {
    name: "Total",
    uv: 3700,
    pv: 0
  }
];

function TestWaterfall() {
  return (
    <BarChart
      width={650}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {/* <Legend /> */}
      <Bar dataKey="pv" stackId="a" fill="transparent" />
      <Bar dataKey="uv" stackId="a" fill="#82ca9d">
        {data.map((item, index) => {
          if (item.uv < 0) {
            return <Cell key={index} fill="#B22222" />;
          }
          if (item.name === "Total") {
            return <Cell key={index} fill="#0000CD" />;
          }
          return <Cell key={index} fill="#228B22" />;
        })}
      </Bar>
    </BarChart>
  );
}

export default TestWaterfall;

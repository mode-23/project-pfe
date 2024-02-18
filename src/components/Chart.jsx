import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const data = [
    {
      name: "Sunday",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Monday",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Tuesday",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Wednesday",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Thursday",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Friday",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Saturday",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className="chart" style={{ height: "43svh" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec9b50" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ec9b50" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e27a2f" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#e27a2f" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid
            strokeDasharray="4 8"
            opacity={".4"}
            horizontal={true}
            vertical={false}
          />
          {/* <Tooltip /> */}
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#ec9b50"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#e27a2f"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <h4>{label}</h4>
        {payload.map((item, index) => (
          <div className="label" key={index}>
            <span style={{ backgroundColor: item.color }}>{item.dataKey}</span>{" "}
            {item.value}
          </div>
        ))}
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
};
export default Chart;

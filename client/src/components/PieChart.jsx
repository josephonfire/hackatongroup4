import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  Instagram: "#e1306c",
  Facebook: "#1877f2",
  TikTok: "#FFD600",
  LinkedIn: "#0077b5",
  X: "#5edc1f",
};

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#23263a",
          color: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px #0002",
          padding: 12,
          fontSize: 14,
          fontFamily: "Inter",
          border: "1px solid #333",
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 6 }}>
          {payload[0].name}
        </div>
        <div style={{ color: "#69bec4", fontWeight: 600 }}>
          Revenue: ${payload[0].value.toLocaleString()}
        </div>
      </div>
    );
  }
  return null;
}

export default function PieChartComponent({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.name] || `hsl(${index * 60}, 70%, 60%)`}
              stroke="#23263a"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          wrapperStyle={{
            paddingTop: 12,
            color: "#69bec4",
            fontWeight: 600,
            fontSize: 11,
            fontFamily: "Inter",
          }}
          verticalAlign="bottom"
          align="center"
          layout="horizontal"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

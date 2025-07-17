import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Dot,
} from "recharts";

const COLORS = {
  Instagram: "#e1306c",
  Facebook: "#1877f2",
  TikTok: "#FFD600",
  LinkedIn: "#0077b5",
  X: "#5edc1f",
};

function CustomTooltip({ active, payload, label, whiteBg }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: whiteBg ? "#fff" : "#23263a",
        color: whiteBg ? "#23263a" : "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px #0002",
        padding: 12,
        fontSize: 14,
        fontFamily: "Inter",
        border: whiteBg ? "1px solid #e0e0e0" : "1px solid #333",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map((entry) => (
        <div
          key={entry.dataKey}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 2,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: entry.color,
              display: "inline-block",
            }}
          />
          <span>{entry.name}:</span>
          <span style={{ fontWeight: 600 }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function ModernLineChart({ data, whiteBg, height = 180 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
        <CartesianGrid
          stroke={whiteBg ? "#e0e0e0" : "#333"}
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          dataKey="day"
          tick={{
            fill: whiteBg ? "#23263a" : "#fff",
            fontWeight: 500,
            fontSize: 11,
            fontFamily: "Inter",
          }}
          interval={data.length > 15 ? Math.floor(data.length / 10) : 0}
        />
        <YAxis
          tick={{
            fill: whiteBg ? "#23263a" : "#fff",
            fontWeight: 500,
            fontSize: 11,
            fontFamily: "Inter",
          }}
        />
        <Tooltip content={<CustomTooltip whiteBg={whiteBg} />} />
        <Legend
          iconType="circle"
          wrapperStyle={{
            paddingTop: 4,
            color: whiteBg ? "#23263a" : "#fff",
            fontWeight: 600,
            fontSize: 11,
            fontFamily: "Inter",
          }}
        />
        <Line
          type="monotone"
          dataKey="Instagram"
          stroke={COLORS.Instagram}
          strokeWidth={2.2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="Facebook"
          stroke={COLORS.Facebook}
          strokeWidth={2.2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="TikTok"
          stroke={COLORS.TikTok}
          strokeWidth={2.2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="LinkedIn"
          stroke={COLORS.LinkedIn}
          strokeWidth={2.2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="X"
          stroke={COLORS.X}
          strokeWidth={2.2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

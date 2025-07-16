import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

const COLORS = {
  Instagram: '#e1306c',
  Facebook: '#1877f2',
  TikTok: '#010101',
  LinkedIn: '#0077b5',
  X: '#5edc1f',
};

function CustomTooltip({ active, payload, label, whiteBg }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: whiteBg ? '#fff' : '#23263a',
      color: whiteBg ? '#23263a' : '#fff',
      borderRadius: 8,
      boxShadow: '0 2px 8px #0002',
      padding: 12,
      fontSize: 14,
      border: whiteBg ? '1px solid #e0e0e0' : '1px solid #333',
    }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map((entry) => (
        <div key={entry.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: entry.color, display: 'inline-block' }} />
          <span>{entry.name}:</span>
          <span style={{ fontWeight: 600 }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function ModernAreaChart({ data, whiteBg }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="ig" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#e1306c" stopOpacity={0.7}/>
            <stop offset="95%" stopColor="#e1306c" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="fb" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1877f2" stopOpacity={0.7}/>
            <stop offset="95%" stopColor="#1877f2" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="tt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#010101" stopOpacity={0.7}/>
            <stop offset="95%" stopColor="#010101" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="li" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0077b5" stopOpacity={0.7}/>
            <stop offset="95%" stopColor="#0077b5" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="x" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5edc1f" stopOpacity={0.7}/>
            <stop offset="95%" stopColor="#5edc1f" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid stroke={whiteBg ? '#e0e0e0' : '#333'} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="dia" tick={{ fill: whiteBg ? '#23263a' : '#fff', fontWeight: 500 }} />
        <YAxis tick={{ fill: whiteBg ? '#23263a' : '#fff', fontWeight: 500 }} />
        <Tooltip content={<CustomTooltip whiteBg={whiteBg} />} />
        <Legend iconType="circle" wrapperStyle={{ paddingTop: 8, color: whiteBg ? '#23263a' : '#fff', fontWeight: 600 }} />
        <Area type="monotone" dataKey="Instagram" stroke="#e1306c" fill="url(#ig)" strokeWidth={2.5} />
        <Area type="monotone" dataKey="Facebook" stroke="#1877f2" fill="url(#fb)" strokeWidth={2.5} />
        <Area type="monotone" dataKey="TikTok" stroke="#010101" fill="url(#tt)" strokeWidth={2.5} />
        <Area type="monotone" dataKey="LinkedIn" stroke="#0077b5" fill="url(#li)" strokeWidth={2.5} />
        <Area type="monotone" dataKey="X" stroke="#5edc1f" fill="url(#x)" strokeWidth={2.5} />
      </AreaChart>
    </ResponsiveContainer>
  );
} 
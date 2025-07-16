import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AreaChartComponent({ data }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E1306C" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#E1306C" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorFacebook" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1877F3" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#1877F3" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorTikTok" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#25F4EE" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#25F4EE" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorLinkedIn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0A66C2" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#0A66C2" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorX" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#000" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#000" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dia" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="Instagram" stroke="#E1306C" fillOpacity={1} fill="url(#colorInstagram)" />
        <Area type="monotone" dataKey="Facebook" stroke="#1877F3" fillOpacity={1} fill="url(#colorFacebook)" />
        <Area type="monotone" dataKey="TikTok" stroke="#25F4EE" fillOpacity={1} fill="url(#colorTikTok)" />
        <Area type="monotone" dataKey="LinkedIn" stroke="#0A66C2" fillOpacity={1} fill="url(#colorLinkedIn)" />
        <Area type="monotone" dataKey="X" stroke="#000" fillOpacity={1} fill="url(#colorX)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

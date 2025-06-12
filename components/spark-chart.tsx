"use client"

import { Area, AreaChart, ResponsiveContainer } from "recharts"

interface SparkAreaChartProps {
  data: any[];
  dataKey: string;
}

export function SparkAreaChart({ data, dataKey }: SparkAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="spark-color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="currentColor" stopOpacity={0.4} />
            <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="currentColor"
          fillOpacity={1}
          fill="url(#spark-color)"
          className="fill-primary"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
} 
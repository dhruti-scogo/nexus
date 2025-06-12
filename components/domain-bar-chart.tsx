"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface DomainChartProps {
  data: { url: string; [key: string]: any }[];
  dataKey: string;
  name: string;
}

export function DomainBarChart({ data, dataKey, name }: DomainChartProps) {
  const formattedData = data.map(item => {
    try {
      const url = new URL(item.url);
      return {
        ...item,
        name: url.hostname.replace(/^www\./, ''),
      }
    } catch (error) {
      return {
        ...item,
        name: item.url,
      }
    }
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={formattedData} layout="vertical">
        <XAxis type="number" hide />
        <YAxis
          dataKey="name"
          type="category"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={120}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {name}
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].payload.name}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Value
                      </span>
                      <span className="font-bold">
                        {payload[0].value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          }}
        />
        <Bar
          dataKey={dataKey}
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
} 
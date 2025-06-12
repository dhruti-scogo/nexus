"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts"

interface ComparisonAreaChartProps {
    data: {
        current: number;
        previous: number;
        labels: {
            current: string;
            previous: string;
        }
    }
}

export function ComparisonAreaChart({ data }: ComparisonAreaChartProps) {
    const chartData = [
        { name: data.labels.previous, value: data.previous },
        { name: data.labels.current, value: data.current },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={chartData}
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <defs>
                    <linearGradient id="compare-color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="currentColor" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Tooltip
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <div className="grid grid-cols-1 gap-1 text-center">
                                        <span className="font-bold">
                                            {payload[0].value}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {payload[0].payload.name}
                                        </span>
                                    </div>
                                </div>
                            );
                        }

                        return null;
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="currentColor"
                    fillOpacity={1}
                    fill="url(#compare-color)"
                    className="fill-primary"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
} 
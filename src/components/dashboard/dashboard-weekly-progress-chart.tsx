"use client"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "#/components/ui/chart"
import { Bar, BarChart, XAxis } from "recharts"

const chartConfig: ChartConfig = {
  learn: { label: "Games", color: "#60a5fa" },
  games: { label: "Learn", color: "#2563eb" },
}

const chartData = [
  { weekday: "Mon", learn: 186, games: 80 },
  { weekday: "Tue", learn: 305, games: 200 },
  { weekday: "Wed", learn: 237, games: 120 },
  { weekday: "Thu", learn: 73, games: 190 },
  { weekday: "Fri", learn: 209, games: 130 },
  { weekday: "Sat", learn: 214, games: 140 },
  { weekday: "Sun", learn: 32, games: 11 },
]

export default function DashboardWeeklyProgressChart() {
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="weekday"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="learn"
          fill="var(--color-learn)"
          radius={4}
          maxBarSize={20}
        />
        <Bar
          dataKey="games"
          fill="var(--color-games)"
          radius={4}
          maxBarSize={20}
        />
      </BarChart>
    </ChartContainer>
  )
}

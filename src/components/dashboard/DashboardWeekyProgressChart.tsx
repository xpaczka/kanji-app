"use client"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from "#/components/ui/chart"
import { Bar, BarChart, XAxis } from "recharts"

type ChartData = {
  weekday: string
  learn: number
  games: number
}

type DashboardWeeklyProgressChartProps = {
  data: ChartData[]
}

export default function DashboardWeeklyProgressChart({
  data
}: DashboardWeeklyProgressChartProps) {
  const chartConfig: ChartConfig = {
    learn: { label: "Games", color: "#60a5fa" },
    games: { label: "Learn", color: "#2563eb" }
  }

  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart accessibilityLayer data={data}>
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

'use client'

import { useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { TrendingUp } from 'lucide-react'
import { CalendarDateRangePicker } from './date-range-picker'

export const description = 'An interactive line chart'

const reportData = [
  { month: 'Janeiro', reports: 220 },
  { month: 'Fevereiro', reports: 320 },
  { month: 'Março', reports: 250 },
  { month: 'Abril', reports: 400 },
  { month: 'Maio', reports: 350 },
  { month: 'Junho', reports: 500 },
  { month: 'Julho', reports: 450 },
  { month: 'Agosto', reports: 600 },
  { month: 'Setembro', reports: 550 },
  { month: 'Outubro', reports: 700 },
  { month: 'Novembro', reports: 650 },
  { month: 'Dezembro', reports: 800 },
]

const reports = [
  { date: '2024-04-01', andamento: 10, finalizado: 10 },
  { date: '2024-04-02', andamento: 50, finalizado: 30 },
  { date: '2024-04-03', andamento: 50, finalizado: 40 },
  { date: '2024-04-04', andamento: 60, finalizado: 40 },
  { date: '2024-04-05', andamento: 70, finalizado: 40 },
  { date: '2024-04-06', andamento: 80, finalizado: 50 },
  { date: '2024-04-07', andamento: 80, finalizado: 50 },
  { date: '2024-04-08', andamento: 80, finalizado: 50 },
  { date: '2024-04-09', andamento: 80, finalizado: 50 },
  { date: '2024-04-10', andamento: 80, finalizado: 60 },
  { date: '2024-04-11', andamento: 70, finalizado: 60 },
  { date: '2024-04-12', andamento: 70, finalizado: 60 },
  { date: '2024-04-13', andamento: 70, finalizado: 60 },
  { date: '2024-04-14', andamento: 70, finalizado: 60 },
  { date: '2024-04-15', andamento: 70, finalizado: 60 },
  { date: '2024-04-16', andamento: 70, finalizado: 60 },
  { date: '2024-04-17', andamento: 70, finalizado: 60 },
]

const chartConfig = {
  views: {
    label: 'Page Views',
  },
  andamento: {
    label: 'Andamento',
    color: 'hsl(var(--chart-1))',
  },
  finalizado: {
    label: 'Finalizado',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

const reportConfig = {
  reports: {
    label: 'Reports',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function Component() {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>('andamento')

  const total = useMemo(
    () => ({
      andamento: reports.reduce((acc, curr) => acc + curr.andamento, 0),
      finalizado: reports.reduce((acc, curr) => acc + curr.finalizado, 0),
    }),
    [],
  )

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" dir="rtl">
        <Card dir="ltr">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Analistas Totais
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card dir="ltr">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
            <CardTitle className="text-sm font-medium">
              Relatórios Finalizados
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">80</div>
            <p className="text-xs text-muted-foreground">
              +50 desde a última hora
            </p>
          </CardContent>
        </Card>
        <Card dir="ltr">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Relatórios Em Andamentos
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">
              +10 desde a última hora
            </p>
          </CardContent>
        </Card>
        <Card dir="ltr">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
            <CardTitle className="text-sm font-medium">
              Relatórios Criados
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              +201 desde a última hora
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>Gráfico de Linhas - Interativo</CardTitle>
              <CardDescription>
                Mostrando o total de relatorios em dias
              </CardDescription>
            </div>
            <div className="flex">
              {['andamento', 'finalizado'].map((key) => {
                const chart = key as keyof typeof chartConfig
                return (
                  <button
                    key={chart}
                    data-active={activeChart === chart}
                    className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    onClick={() => setActiveChart(chart)}
                  >
                    <span className="text-xs text-muted-foreground">
                      {chartConfig[chart].label}
                    </span>
                    <span className="text-lg font-bold leading-none sm:text-3xl">
                      {total[key as keyof typeof total].toLocaleString()}
                    </span>
                  </button>
                )
              })}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <LineChart
                accessibilityLayer
                data={reports}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString('pt-BR', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="views"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString('pt-BR', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      }}
                    />
                  }
                />
                <Line
                  dataKey={activeChart}
                  type="monotone"
                  stroke={`var(--color-${activeChart})`}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Line Chart</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={reportConfig}>
              <LineChart
                accessibilityLayer
                data={reportData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    return value.slice(0, 3)
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="reports"
                  type="natural"
                  stroke="var(--color-reports)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

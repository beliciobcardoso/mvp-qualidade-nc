'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { FileStack, NotebookPen, NotebookText, TrendingUp, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
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

export interface HomeProps {
  DataReports: {
    created: number
    inProgress: number
    finished: number
    analyst: number
  }
}

export function Dashboard({ DataReports }: HomeProps) {
  const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>('andamento')

  const total = useMemo(
    () => ({
      andamento: reports.reduce((acc, curr) => acc + curr.andamento, 0),
      finalizado: reports.reduce((acc, curr) => acc + curr.finalizado, 0),
    }),
    [],
  )

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-end space-y-2 pt-2">
        <CalendarDateRangePicker />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" dir="rtl">
        <Card dir="ltr">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analistas Totais</CardTitle>
            <Users className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DataReports.analyst}</div>
          </CardContent>
        </Card>
        <Card dir="ltr">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatórios Finalizados</CardTitle>
            <NotebookText className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DataReports.finished}</div>
          </CardContent>
        </Card>
        <Card dir="ltr">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatórios Em Andamentos</CardTitle>
            <NotebookPen className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DataReports.inProgress}</div>
          </CardContent>
        </Card>
        <Card dir="ltr">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatórios Criados</CardTitle>
            <FileStack className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DataReports.created}</div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>Gráfico de Linhas - Interativo</CardTitle>
              <CardDescription>Mostrando o total de relatorios em dias</CardDescription>
            </div>
            <div className="flex gap-2">
              {['andamento', 'finalizado'].map((key) => {
                const chart = key as keyof typeof chartConfig
                return (
                  <Button
                    variant={'ghost'}
                    size={'lg'}
                    key={chart}
                    data-active={activeChart === chart}
                    className="flex flex-1 flex-col justify-center h-20 my-4 gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    onClick={() => setActiveChart(chart)}
                  >
                    <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
                    <span className="text-lg font-bold leading-none sm:text-3xl">
                      {total[key as keyof typeof total].toLocaleString()}
                    </span>
                  </Button>
                )
              })}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
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
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line dataKey="reports" type="natural" stroke="var(--color-reports)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

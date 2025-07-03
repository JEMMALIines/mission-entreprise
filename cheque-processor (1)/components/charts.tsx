"use client"
import { Card, CardContent } from "@/components/ui/card"
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface LineChartProps {
  data: any[]
  title: string
  xAxisKey: string
  series: {
    key: string
    name: string
    color: string
  }[]
}

export function LineChart({ data, title, xAxisKey, series }: LineChartProps) {
  return (
    <Card className="w-full h-full">
      <CardContent className="p-0">
        <div className="p-4">
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              {series.map((s) => (
                <Line key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color} activeDot={{ r: 8 }} />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

interface BarChartProps {
  data: any[]
  title: string
  xAxisKey: string
  yAxisKey: string
  color: string
}

export function BarChart({ data, title, xAxisKey, yAxisKey, color }: BarChartProps) {
  return (
    <Card className="w-full h-full">
      <CardContent className="p-0">
        <div className="p-4">
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={yAxisKey} fill={color} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

interface PieChartProps {
  data: any[]
  title: string
  colors: string[]
}

export function PieChart({ data, title, colors }: PieChartProps) {
  return (
    <Card className="w-full h-full">
      <CardContent className="p-0">
        <div className="p-4">
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

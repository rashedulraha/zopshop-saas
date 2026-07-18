"use client";

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = [
  "hsl(var(--primary))",
  "#06b6d4",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
];

// Generic Tooltip Style to maintain flat UI
const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  borderColor: "hsl(var(--border))",
  borderRadius: "6px",
  boxShadow: "none",
  color: "hsl(var(--foreground))",
  fontSize: "12px",
  padding: "8px 12px",
};

const axisStyle = {
  fill: "hsl(var(--muted-foreground))",
  fontSize: 12,
  fontFamily: "inherit",
};

// 1. Line Chart Widget (Sales Trend, Customer Growth)
export function LineChartWidget({
  title,
  subtitle,
  data,
  dataKey,
  stroke = "hsl(var(--primary))",
}: any) {
  return (
    <div className="p-5 sm:p-6 border border-border bg-card rounded-md flex flex-col h-full">
      <div className="mb-6 flex flex-col gap-1">
        <h3 className="text-base font-semibold text-foreground tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex-1 min-h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
              opacity={0.5}
            />
            <XAxis
              dataKey="name"
              tick={axisStyle}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              tick={axisStyle}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                value > 1000 ? `${(value / 1000).toFixed(1)}k` : value
              }
            />
            <Tooltip
              contentStyle={tooltipStyle}
              itemStyle={{
                color: "hsl(var(--foreground))",
                fontSize: "13px",
                fontWeight: 500,
              }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={stroke}
              strokeWidth={2}
              dot={{ r: 4, fill: "hsl(var(--card))", strokeWidth: 2 }}
              activeDot={{
                r: 6,
                fill: stroke,
                stroke: "hsl(var(--card))",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 2. Area Chart Widget (Purchase Trend, Inventory Value)
export function AreaChartWidget({
  title,
  subtitle,
  data,
  dataKey,
  fill = "hsl(var(--primary))",
}: any) {
  return (
    <div className="p-5 sm:p-6 border border-border bg-card rounded-md flex flex-col h-full">
      <div className="mb-6 flex flex-col gap-1">
        <h3 className="text-base font-semibold text-foreground tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex-1 min-h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id={`color${dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={fill} stopOpacity={0.3} />
                <stop offset="95%" stopColor={fill} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
              opacity={0.5}
            />
            <XAxis
              dataKey="name"
              tick={axisStyle}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              tick={axisStyle}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                value > 1000 ? `${(value / 1000).toFixed(1)}k` : value
              }
            />
            <Tooltip
              contentStyle={tooltipStyle}
              itemStyle={{
                color: "hsl(var(--foreground))",
                fontSize: "13px",
                fontWeight: 500,
              }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={fill}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#color${dataKey})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 3. Bar Chart Widget (Monthly Revenue, Profit Analysis, Best Selling)
export function BarChartWidget({
  title,
  subtitle,
  data,
  dataKeys = ["total"],
  colors = [COLORS[0]],
  formatter,
}: any) {
  return (
    <div className="p-5 sm:p-6 border border-border bg-card rounded-md flex flex-col h-full">
      <div className="mb-6 flex flex-col gap-1">
        <h3 className="text-base font-semibold text-foreground tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex-1 min-h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
              opacity={0.5}
            />
            <XAxis
              dataKey="name"
              tick={axisStyle}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              tick={axisStyle}
              tickLine={false}
              axisLine={false}
              tickFormatter={
                formatter ||
                ((value) =>
                  value > 1000 ? `${(value / 1000).toFixed(1)}k` : value)
              }
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted))" }}
              contentStyle={tooltipStyle}
              itemStyle={{
                color: "hsl(var(--foreground))",
                fontSize: "13px",
                fontWeight: 500,
              }}
            />
            {dataKeys.length > 1 && (
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "10px",
                  color: "hsl(var(--muted-foreground))",
                }}
                iconType="circle"
              />
            )}
            {dataKeys.map((key: string, i: number) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[i % colors.length]}
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 4. Pie/Donut Chart Widget (Expense Analysis, Sales by Brand)
export function DonutChartWidget({
  title,
  subtitle,
  data,
  dataKey = "value",
  nameKey = "name",
}: any) {
  return (
    <div className="p-5 sm:p-6 border border-border bg-card rounded-md flex flex-col h-full">
      <div className="mb-6 flex flex-col gap-1">
        <h3 className="text-base font-semibold text-foreground tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex-1 min-h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Tooltip
              contentStyle={tooltipStyle}
              itemStyle={{
                color: "hsl(var(--foreground))",
                fontSize: "13px",
                fontWeight: 500,
              }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={2}
              dataKey={dataKey}
              nameKey={nameKey}
              stroke="hsl(var(--card))"
              strokeWidth={2}
            >
              {data.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                fontSize: "12px",
                color: "hsl(var(--muted-foreground))",
                marginTop: "10px",
              }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

"use client"

import React from "react"

import { useState } from "react"
import { Activity, Heart, Moon, Footprints, TrendingUp, Cloud } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, LineChart, Line, Tooltip } from "recharts"
import { SyncStatus } from "../sync-status"
import { weeklyStepsData, weeklyHeartRateData, weeklySleepData, dailySummary } from "@/lib/health-data"
import { cn } from "@/lib/utils"

type TimeRange = "day" | "week" | "month"
type MetricType = "steps" | "heart" | "sleep"

export function DashboardScreen() {
  const [timeRange, setTimeRange] = useState<TimeRange>("week")
  const [activeMetric, setActiveMetric] = useState<MetricType>("steps")

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Health Dashboard</h1>
          <p className="text-sm text-muted-foreground">Track your daily progress</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-primary bg-primary/10 px-3 py-1.5 rounded-full">
          <Cloud className="w-3.5 h-3.5" />
          <span className="font-medium">Institution-Shareable</span>
        </div>
      </header>

      {/* Time Range Selector */}
      <div className="flex gap-2 p-1 bg-muted rounded-xl">
        {(["day", "week", "month"] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
              timeRange === range
                ? "bg-card text-card-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-3 gap-3">
        <MetricButton
          icon={Footprints}
          label="Steps"
          value={dailySummary.steps.toLocaleString()}
          active={activeMetric === "steps"}
          onClick={() => setActiveMetric("steps")}
          color="primary"
        />
        <MetricButton
          icon={Heart}
          label="Heart Rate"
          value={`${dailySummary.heartRate} bpm`}
          active={activeMetric === "heart"}
          onClick={() => setActiveMetric("heart")}
          color="rose"
        />
        <MetricButton
          icon={Moon}
          label="Sleep"
          value={`${dailySummary.sleep} hrs`}
          active={activeMetric === "sleep"}
          onClick={() => setActiveMetric("sleep")}
          color="indigo"
        />
      </div>

      {/* Main Chart */}
      <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-card-foreground">
            {activeMetric === "steps" && "Steps Overview"}
            {activeMetric === "heart" && "Heart Rate Trends"}
            {activeMetric === "sleep" && "Sleep Analysis"}
          </h2>
          <SyncStatus status="synced" label="Synced" compact />
        </div>
        
        <div className="h-48">
          {activeMetric === "steps" && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyStepsData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value: number) => [`${value.toLocaleString()} steps`, 'Steps']}
                />
                <Bar 
                  dataKey="steps" 
                  fill="hsl(var(--primary))" 
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
          
          {activeMetric === "heart" && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyHeartRateData}>
                <defs>
                  <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value: number, name: string) => [
                    `${value} bpm`,
                    name === 'avg' ? 'Average' : name === 'max' ? 'Max' : 'Min'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="max" 
                  stroke="transparent" 
                  fill="url(#heartGradient)"
                />
                <Line 
                  type="monotone" 
                  dataKey="avg" 
                  stroke="#f43f5e" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="min" 
                  stroke="#f43f5e" 
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  dot={false}
                  opacity={0.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
          
          {activeMetric === "sleep" && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklySleepData}>
                <defs>
                  <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis hide domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value: number, name: string) => [
                    name === 'hours' ? `${value} hours` : `${value}%`,
                    name === 'hours' ? 'Sleep Duration' : 'Sleep Quality'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  fill="url(#sleepGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {activeMetric === "steps" && (
          <>
            <StatCard 
              label="Weekly Average" 
              value="8,533" 
              unit="steps"
              trend="+8%"
              trendUp
            />
            <StatCard 
              label="Best Day" 
              value="11,234" 
              unit="steps"
              sublabel="Saturday"
            />
            <StatCard 
              label="Weekly Total" 
              value="59,730" 
              unit="steps"
            />
            <StatCard 
              label="Goal Reached" 
              value="5" 
              unit="days"
              sublabel="of 7 days"
            />
          </>
        )}
        
        {activeMetric === "heart" && (
          <>
            <StatCard 
              label="Resting HR" 
              value="62" 
              unit="bpm"
              trend="-2"
              trendUp
            />
            <StatCard 
              label="Max HR" 
              value="112" 
              unit="bpm"
              sublabel="During exercise"
            />
            <StatCard 
              label="Avg HRV" 
              value="45" 
              unit="ms"
              trend="+5%"
              trendUp
            />
            <StatCard 
              label="Recovery" 
              value="Good" 
              sublabel="Based on HRV"
            />
          </>
        )}
        
        {activeMetric === "sleep" && (
          <>
            <StatCard 
              label="Avg Duration" 
              value="7.5" 
              unit="hrs"
              trend="+12%"
              trendUp
            />
            <StatCard 
              label="Avg Quality" 
              value="81" 
              unit="%"
              sublabel="Score"
            />
            <StatCard 
              label="Deep Sleep" 
              value="1.8" 
              unit="hrs"
              sublabel="24% of total"
            />
            <StatCard 
              label="Best Night" 
              value="8.5" 
              unit="hrs"
              sublabel="Saturday"
            />
          </>
        )}
      </div>

      {/* Correlation Insight */}
      <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-card-foreground">Correlation Insight</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {activeMetric === "steps" && "Days with 8000+ steps show 15% better sleep quality. Keep moving!"}
              {activeMetric === "heart" && "Your resting heart rate drops by 3 bpm on days following good sleep."}
              {activeMetric === "sleep" && "Sleep quality improves 20% when you reach your daily step goal."}
            </p>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-20" />
    </div>
  )
}

function MetricButton({
  icon: Icon,
  label,
  value,
  active,
  onClick,
  color,
}: {
  icon: React.ElementType
  label: string
  value: string
  active: boolean
  onClick: () => void
  color: "primary" | "rose" | "indigo"
}) {
  const colorClasses = {
    primary: {
      bg: active ? "bg-primary/10" : "bg-card",
      icon: "text-primary",
      ring: "ring-primary/20",
    },
    rose: {
      bg: active ? "bg-rose-50" : "bg-card",
      icon: "text-rose-500",
      ring: "ring-rose-200",
    },
    indigo: {
      bg: active ? "bg-indigo-50" : "bg-card",
      icon: "text-indigo-500",
      ring: "ring-indigo-200",
    },
  }

  const classes = colorClasses[color]

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all",
        classes.bg,
        active 
          ? `ring-2 ${classes.ring} border-transparent shadow-sm` 
          : "border-border/50 hover:border-border"
      )}
    >
      <Icon className={cn("w-5 h-5", classes.icon)} />
      <div className="text-center">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-card-foreground">{value}</p>
      </div>
    </button>
  )
}

function StatCard({
  label,
  value,
  unit,
  trend,
  trendUp,
  sublabel,
}: {
  label: string
  value: string
  unit?: string
  trend?: string
  trendUp?: boolean
  sublabel?: string
}) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border/50">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-xl font-semibold text-card-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {trend && (
        <span className={cn(
          "text-xs font-medium",
          trendUp ? "text-emerald-600" : "text-rose-600"
        )}>
          {trend}
        </span>
      )}
      {sublabel && (
        <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
      )}
    </div>
  )
}

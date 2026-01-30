"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Activity, Heart, Moon, TestTube, ChevronRight, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts"
import { monthlyTrends, insights } from "@/lib/health-data"
import { cn } from "@/lib/utils"

type CategoryFilter = "all" | "activity" | "sleep" | "heart" | "labs"

export function InsightsScreen() {
  const [category, setCategory] = useState<CategoryFilter>("all")

  const filteredInsights = category === "all" 
    ? insights 
    : insights.filter(i => i.category === category)

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold text-foreground">Insights & Trends</h1>
        <p className="text-sm text-muted-foreground">Your health patterns over time</p>
      </header>

      {/* Health Score Trend */}
      <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-card-foreground">Health Score Trend</h2>
            <p className="text-sm text-muted-foreground">Last 6 months</p>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
            <ArrowUpRight className="w-4 h-4" />
            +9 points
          </div>
        </div>
        
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTrends}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis hide domain={[70, 95]} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number) => [`${value}`, 'Health Score']}
              />
              <Area 
                type="monotone" 
                dataKey="healthScore" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                fill="url(#scoreGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
          <TrendItem label="Steps" value="8.4k" trend="+17%" up />
          <TrendItem label="Sleep" value="7.2h" trend="+6%" up />
          <TrendItem label="HRV" value="45ms" trend="+5%" up />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {[
          { id: "all" as const, label: "All", icon: null },
          { id: "activity" as const, label: "Activity", icon: Activity },
          { id: "sleep" as const, label: "Sleep", icon: Moon },
          { id: "heart" as const, label: "Heart", icon: Heart },
          { id: "labs" as const, label: "Labs", icon: TestTube },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              category === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground border border-border"
            )}
          >
            {cat.icon && <cat.icon className="w-4 h-4" />}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Insights List */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Personalized Insights</h2>
        
        <div className="space-y-3">
          {filteredInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>

      {/* Correlations */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Discovered Correlations</h2>
        
        <div className="space-y-3">
          <CorrelationCard
            factor1={{ label: "Daily Steps", value: "> 8,000" }}
            factor2={{ label: "Sleep Quality", value: "+15%" }}
            correlation="positive"
            description="Higher step counts correlate with better sleep quality"
          />
          <CorrelationCard
            factor1={{ label: "Sleep Duration", value: "> 7 hrs" }}
            factor2={{ label: "Resting HR", value: "-3 bpm" }}
            correlation="positive"
            description="Better sleep leads to lower resting heart rate"
          />
          <CorrelationCard
            factor1={{ label: "Late Meals", value: "After 8pm" }}
            factor2={{ label: "Sleep Score", value: "-12%" }}
            correlation="negative"
            description="Eating late impacts your sleep quality"
          />
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-card-foreground">January Summary</h2>
          <span className="text-sm text-muted-foreground">31 days tracked</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary">87</p>
            <p className="text-sm text-muted-foreground">Avg Health Score</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-emerald-600">26</p>
            <p className="text-sm text-muted-foreground">Goals Achieved</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-card-foreground">260K</p>
            <p className="text-sm text-muted-foreground">Total Steps</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-card-foreground">7.4</p>
            <p className="text-sm text-muted-foreground">Avg Sleep (hrs)</p>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-20" />
    </div>
  )
}

function TrendItem({ 
  label, 
  value, 
  trend, 
  up 
}: { 
  label: string
  value: string
  trend: string
  up?: boolean 
}) {
  return (
    <div className="text-center">
      <p className="text-lg font-semibold text-card-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn(
        "text-xs font-medium mt-1",
        up ? "text-emerald-600" : "text-rose-600"
      )}>
        {trend}
      </p>
    </div>
  )
}

function InsightCard({ insight }: { insight: typeof insights[0] }) {
  const icons = {
    activity: Activity,
    sleep: Moon,
    heart: Heart,
    labs: TestTube,
  }
  
  const Icon = icons[insight.category as keyof typeof icons] || Activity

  return (
    <div className={cn(
      "p-4 rounded-2xl border transition-all",
      insight.type === "positive" && "bg-emerald-50/50 border-emerald-200/50",
      insight.type === "attention" && "bg-amber-50/50 border-amber-200/50",
      insight.type === "neutral" && "bg-card border-border/50"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "p-2 rounded-xl",
          insight.type === "positive" && "bg-emerald-100",
          insight.type === "attention" && "bg-amber-100",
          insight.type === "neutral" && "bg-muted"
        )}>
          <Icon className={cn(
            "w-5 h-5",
            insight.type === "positive" && "text-emerald-600",
            insight.type === "attention" && "text-amber-600",
            insight.type === "neutral" && "text-muted-foreground"
          )} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className={cn(
              "font-medium",
              insight.type === "positive" && "text-emerald-700",
              insight.type === "attention" && "text-amber-700",
              insight.type === "neutral" && "text-card-foreground"
            )}>
              {insight.title}
            </h3>
            <span className={cn(
              "px-2 py-1 rounded-lg text-xs font-semibold",
              insight.type === "positive" && "bg-emerald-100 text-emerald-700",
              insight.type === "attention" && "bg-amber-100 text-amber-700",
              insight.type === "neutral" && "bg-muted text-muted-foreground"
            )}>
              {insight.metric}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {insight.description}
          </p>
        </div>
      </div>
    </div>
  )
}

function CorrelationCard({
  factor1,
  factor2,
  correlation,
  description,
}: {
  factor1: { label: string; value: string }
  factor2: { label: string; value: string }
  correlation: "positive" | "negative"
  description: string
}) {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 p-3 rounded-xl bg-muted/50 text-center">
          <p className="text-xs text-muted-foreground">{factor1.label}</p>
          <p className="text-sm font-semibold text-card-foreground">{factor1.value}</p>
        </div>
        
        <div className={cn(
          "p-2 rounded-full",
          correlation === "positive" ? "bg-emerald-100" : "bg-rose-100"
        )}>
          {correlation === "positive" ? (
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-rose-600" />
          )}
        </div>
        
        <div className="flex-1 p-3 rounded-xl bg-muted/50 text-center">
          <p className="text-xs text-muted-foreground">{factor2.label}</p>
          <p className="text-sm font-semibold text-card-foreground">{factor2.value}</p>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">{description}</p>
    </div>
  )
}

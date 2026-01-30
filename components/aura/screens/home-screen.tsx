"use client"

import React from "react"

import { Activity, Droplets, Moon, Flame, Footprints, Heart, ChevronRight, Bell } from "lucide-react"
import { HealthCard } from "../health-card"
import { HealthScoreRing } from "../health-score-ring"
import { SyncStatus } from "../sync-status"
import { dailySummary, userData, insights } from "@/lib/health-data"
import { cn } from "@/lib/utils"

interface HomeScreenProps {
  onNavigate: (tab: string) => void
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Good morning,</p>
          <h1 className="text-2xl font-semibold text-foreground">{userData.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-full bg-card shadow-sm border border-border/50 hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
            {userData.name.charAt(0)}
          </div>
        </div>
      </header>

      {/* Sync Status Banner */}
      <SyncStatus status={userData.pulseConnectStatus} />

      {/* Health Score Card */}
      <div className="bg-card rounded-3xl p-6 shadow-sm border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">Today&apos;s Health</h2>
            <p className="text-sm text-muted-foreground">{dailySummary.date}</p>
          </div>
          <button 
            onClick={() => onNavigate("dashboard")}
            className="flex items-center gap-1 text-sm text-primary font-medium hover:underline"
          >
            Details <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <HealthScoreRing score={dailySummary.healthScore} />
          
          <div className="flex-1 ml-6 space-y-3">
            <QuickStat 
              icon={Footprints} 
              label="Steps" 
              value={dailySummary.steps.toLocaleString()} 
              goal={dailySummary.stepsGoal.toLocaleString()}
              progress={(dailySummary.steps / dailySummary.stepsGoal) * 100}
            />
            <QuickStat 
              icon={Heart} 
              label="Heart Rate" 
              value={`${dailySummary.heartRate}`}
              unit="bpm"
            />
            <QuickStat 
              icon={Moon} 
              label="Sleep" 
              value={`${dailySummary.sleep}`}
              unit="hrs"
              goal={`${dailySummary.sleepGoal}`}
              progress={(dailySummary.sleep / dailySummary.sleepGoal) * 100}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <HealthCard
          title="Calories"
          value={dailySummary.calories.toLocaleString()}
          unit="kcal"
          icon={Flame}
          progress={(dailySummary.calories / dailySummary.caloriesGoal) * 100}
          subtitle={`of ${dailySummary.caloriesGoal.toLocaleString()} goal`}
          onClick={() => onNavigate("dashboard")}
        />
        <HealthCard
          title="Water"
          value={dailySummary.water}
          unit="glasses"
          icon={Droplets}
          progress={(dailySummary.water / dailySummary.waterGoal) * 100}
          subtitle={`of ${dailySummary.waterGoal} goal`}
          iconColor="text-sky-500"
          onClick={() => onNavigate("dashboard")}
        />
        <HealthCard
          title="Active Minutes"
          value={dailySummary.activeMinutes}
          unit="min"
          icon={Activity}
          progress={(dailySummary.activeMinutes / dailySummary.activeMinutesGoal) * 100}
          subtitle={`of ${dailySummary.activeMinutesGoal} goal`}
          trend="up"
          trendValue="15%"
          iconColor="text-amber-500"
          onClick={() => onNavigate("dashboard")}
        />
        <HealthCard
          title="Heart Rate"
          value={dailySummary.heartRate}
          unit="bpm"
          icon={Heart}
          subtitle={`${dailySummary.heartRateRange.min}-${dailySummary.heartRateRange.max} range`}
          trend="neutral"
          trendValue="stable"
          iconColor="text-rose-500"
          onClick={() => onNavigate("dashboard")}
        />
      </div>

      {/* Insights Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Today&apos;s Insights</h2>
          <button 
            onClick={() => onNavigate("insights")}
            className="text-sm text-primary font-medium hover:underline"
          >
            See all
          </button>
        </div>
        
        <div className="space-y-3">
          {insights.slice(0, 2).map((insight) => (
            <InsightCard key={insight.id} insight={insight} onClick={() => onNavigate("insights")} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate("scan")}
            className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                <rect x="7" y="7" width="10" height="10" rx="1" />
              </svg>
            </div>
            <span className="text-xs font-medium text-foreground">Scan Report</span>
          </button>
          <button 
            onClick={() => onNavigate("chat")}
            className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-foreground">Ask AI</span>
          </button>
          <button 
            onClick={() => onNavigate("permissions")}
            className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-muted-foreground/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <span className="text-xs font-medium text-foreground">Permissions</span>
          </button>
        </div>
      </div>

      {/* Spacer for bottom nav */}
      <div className="h-20" />
    </div>
  )
}

function QuickStat({ 
  icon: Icon, 
  label, 
  value, 
  unit, 
  goal, 
  progress 
}: { 
  icon: React.ElementType
  label: string
  value: string
  unit?: string
  goal?: string
  progress?: number 
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <div className="flex-1">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-muted-foreground">{label}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-medium text-card-foreground">{value}</span>
            {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
            {goal && <span className="text-xs text-muted-foreground">/ {goal}</span>}
          </div>
        </div>
        {progress !== undefined && (
          <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function InsightCard({ 
  insight, 
  onClick 
}: { 
  insight: typeof insights[0]
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-2xl border transition-all duration-200 hover:shadow-md",
        insight.type === "positive" && "bg-emerald-50/50 border-emerald-200/50",
        insight.type === "attention" && "bg-amber-50/50 border-amber-200/50",
        insight.type === "neutral" && "bg-card border-border/50"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className={cn(
            "font-medium text-sm",
            insight.type === "positive" && "text-emerald-700",
            insight.type === "attention" && "text-amber-700",
            insight.type === "neutral" && "text-card-foreground"
          )}>
            {insight.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {insight.description}
          </p>
        </div>
        <div className={cn(
          "px-2 py-1 rounded-lg text-xs font-semibold",
          insight.type === "positive" && "bg-emerald-100 text-emerald-700",
          insight.type === "attention" && "bg-amber-100 text-amber-700",
          insight.type === "neutral" && "bg-muted text-muted-foreground"
        )}>
          {insight.metric}
        </div>
      </div>
    </button>
  )
}

"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface HealthCardProps {
  title: string
  value: string | number
  unit?: string
  subtitle?: string
  icon: LucideIcon
  progress?: number
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
  iconColor?: string
  onClick?: () => void
}

export function HealthCard({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  progress,
  trend,
  trendValue,
  className,
  iconColor = "text-primary",
  onClick,
}: HealthCardProps) {
  return (
    <div 
      className={cn(
        "bg-card rounded-2xl p-4 shadow-sm border border-border/50 transition-all duration-200",
        onClick && "cursor-pointer hover:shadow-md hover:border-primary/20 active:scale-[0.98]",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2 rounded-xl bg-primary/10", iconColor.replace("text-", "bg-").replace("primary", "primary/10"))}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
        {trend && trendValue && (
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend === "up" && "bg-emerald-50 text-emerald-600",
            trend === "down" && "bg-rose-50 text-rose-600",
            trend === "neutral" && "bg-muted text-muted-foreground"
          )}>
            {trend === "up" && "+"}{trendValue}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold text-card-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>

      {progress !== undefined && (
        <div className="mt-3">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { cn } from "@/lib/utils"

interface HealthScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
  className?: string
}

export function HealthScoreRing({ 
  score, 
  size = 140, 
  strokeWidth = 12,
  className 
}: HealthScoreRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (score / 100) * circumference

  const getScoreColor = (score: number) => {
    if (score >= 80) return "stroke-primary"
    if (score >= 60) return "stroke-amber-500"
    return "stroke-rose-500"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs Attention"
  }

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-muted"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={cn("transition-all duration-1000 ease-out", getScoreColor(score))}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-card-foreground">{score}</span>
        <span className="text-xs text-muted-foreground">{getScoreLabel(score)}</span>
      </div>
    </div>
  )
}

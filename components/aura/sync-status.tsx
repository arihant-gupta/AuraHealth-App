"use client"

import { Cloud, CloudOff, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

type SyncStatus = "synced" | "pending" | "offline"

interface SyncStatusProps {
  status: SyncStatus
  label?: string
  compact?: boolean
  className?: string
}

export function SyncStatus({ status, label, compact = false, className }: SyncStatusProps) {
  const statusConfig = {
    synced: {
      icon: Cloud,
      text: label || "Synced with PulseConnect",
      bgColor: "bg-primary/10",
      textColor: "text-primary",
      iconColor: "text-primary",
    },
    pending: {
      icon: RefreshCw,
      text: label || "Syncing...",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      iconColor: "text-amber-600",
    },
    offline: {
      icon: CloudOff,
      text: label || "Offline",
      bgColor: "bg-muted",
      textColor: "text-muted-foreground",
      iconColor: "text-muted-foreground",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  if (compact) {
    return (
      <div 
        className={cn(
          "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
          config.bgColor,
          config.textColor,
          className
        )}
      >
        <Icon className={cn("w-3 h-3", config.iconColor, status === "pending" && "animate-spin")} />
        <span>{config.text}</span>
      </div>
    )
  }

  return (
    <div 
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl text-sm",
        config.bgColor,
        config.textColor,
        className
      )}
    >
      <Icon className={cn("w-4 h-4", config.iconColor, status === "pending" && "animate-spin")} />
      <span className="font-medium">{config.text}</span>
    </div>
  )
}

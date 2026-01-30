"use client"

import { useState } from "react"
import { Shield, Building2, Stethoscope, TestTube, Check, X, Clock, ChevronRight, Plus, Cloud, Lock, Eye, Calendar } from "lucide-react"
import { permissions } from "@/lib/health-data"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"

type Permission = typeof permissions[0]

export function PermissionsScreen() {
  const [activePermissions, setActivePermissions] = useState<Record<number, boolean>>(
    Object.fromEntries(permissions.map(p => [p.id, p.status === "active"]))
  )

  const togglePermission = (id: number) => {
    setActivePermissions(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const getIcon = (type: string) => {
    if (type.includes("Portal")) return Building2
    if (type.includes("Physician") || type.includes("Doctor")) return Stethoscope
    if (type.includes("Lab")) return TestTube
    return Shield
  }

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold text-foreground">Data Sharing</h1>
        <p className="text-sm text-muted-foreground">Control who can access your health data</p>
      </header>

      {/* Quick Status */}
      <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Cloud className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-card-foreground">PulseConnect Sync Active</h2>
            <p className="text-sm text-muted-foreground">Your data is available to authorized institutions</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
            <Check className="w-3 h-3" />
            Synced
          </div>
        </div>
      </div>

      {/* Data Types Overview */}
      <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
        <h3 className="font-medium text-card-foreground mb-3">Data Being Shared</h3>
        <div className="grid grid-cols-2 gap-2">
          {["Lab Results", "Vitals", "Medications", "Activity", "Sleep", "Heart Rate"].map((dataType) => (
            <div 
              key={dataType}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm text-card-foreground">{dataType}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Permissions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Active Permissions</h2>
          <button className="flex items-center gap-1 text-sm text-primary font-medium hover:underline">
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>

        <div className="space-y-3">
          {permissions.map((permission) => {
            const Icon = getIcon(permission.type)
            const isActive = activePermissions[permission.id]
            
            return (
              <div 
                key={permission.id}
                className={cn(
                  "bg-card rounded-2xl p-4 shadow-sm border transition-all",
                  isActive ? "border-primary/20" : "border-border/50 opacity-60"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-xl",
                      isActive ? "bg-primary/10" : "bg-muted"
                    )}>
                      <Icon className={cn(
                        "w-5 h-5",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <h3 className="font-medium text-card-foreground">{permission.institution}</h3>
                      <p className="text-sm text-muted-foreground">{permission.type}</p>
                    </div>
                  </div>
                  <Switch
                    checked={isActive}
                    onCheckedChange={() => togglePermission(permission.id)}
                  />
                </div>

                {/* Access Details */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{permission.accessLevel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Expires: {permission.expiresDate}</span>
                  </div>
                </div>

                {/* Data Types */}
                <div className="flex flex-wrap gap-2">
                  {permission.dataTypes.map((dataType, idx) => (
                    <span 
                      key={idx}
                      className={cn(
                        "text-xs px-2 py-1 rounded-lg",
                        isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {dataType}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                  <button className="flex-1 text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                    Edit Access
                  </button>
                  <div className="w-px bg-border" />
                  <button className="flex-1 text-sm text-rose-600 hover:text-rose-700 transition-colors py-2">
                    Revoke
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Privacy Info */}
      <div className="bg-muted/50 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <h3 className="font-medium text-card-foreground">Your Data, Your Control</h3>
            <p className="text-sm text-muted-foreground mt-1">
              All data sharing is encrypted end-to-end. You can revoke access at any time, 
              and institutions can only see data you explicitly grant access to.
            </p>
          </div>
        </div>
      </div>

      {/* Access Log */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Recent Access Log</h2>
        
        <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
          {[
            { institution: "PulseConnect", action: "Viewed lab results", time: "2 hours ago" },
            { institution: "Dr. Emily Chen", action: "Accessed vitals data", time: "Yesterday" },
            { institution: "PulseConnect", action: "Synced activity data", time: "2 days ago" },
          ].map((log, index) => (
            <div 
              key={index}
              className={cn(
                "px-4 py-3 flex items-center justify-between",
                index !== 2 && "border-b border-border"
              )}
            >
              <div>
                <p className="text-sm font-medium text-card-foreground">{log.institution}</p>
                <p className="text-xs text-muted-foreground">{log.action}</p>
              </div>
              <span className="text-xs text-muted-foreground">{log.time}</span>
            </div>
          ))}
        </div>
        
        <button className="w-full py-2 text-sm text-primary font-medium hover:underline">
          View Full Access History
        </button>
      </div>

      {/* Spacer */}
      <div className="h-20" />
    </div>
  )
}

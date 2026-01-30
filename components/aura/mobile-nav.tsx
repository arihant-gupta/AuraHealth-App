"use client"

import { Home, LayoutDashboard, Scan, TrendingUp, MessageCircle, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "scan", label: "Scan", icon: Scan },
  { id: "insights", label: "Insights", icon: TrendingUp },
  { id: "chat", label: "AI Chat", icon: MessageCircle },
  { id: "permissions", label: "Access", icon: Shield },
]

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[56px]",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "scale-110")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

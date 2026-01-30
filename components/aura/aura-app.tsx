"use client"

import { useState } from "react"
import { MobileNav } from "./mobile-nav"
import { HomeScreen } from "./screens/home-screen"
import { DashboardScreen } from "./screens/dashboard-screen"
import { ScanScreen } from "./screens/scan-screen"
import { InsightsScreen } from "./screens/insights-screen"
import { ChatScreen } from "./screens/chat-screen"
import { PermissionsScreen } from "./screens/permissions-screen"

export function AuraApp() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="max-w-md mx-auto">
        {activeTab === "home" && <HomeScreen onNavigate={setActiveTab} />}
        {activeTab === "dashboard" && <DashboardScreen />}
        {activeTab === "scan" && <ScanScreen />}
        {activeTab === "insights" && <InsightsScreen />}
        {activeTab === "chat" && <ChatScreen />}
        {activeTab === "permissions" && <PermissionsScreen />}
      </main>

      {/* Bottom Navigation */}
      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

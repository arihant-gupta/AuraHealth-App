"use client"

import { useState } from "react"
import { Camera, Upload, FileText, CheckCircle2, AlertCircle, Cloud, ArrowRight, X, Loader2 } from "lucide-react"
import { SyncStatus } from "../sync-status"
import { sampleScannedReport, recentLabResults } from "@/lib/health-data"
import { cn } from "@/lib/utils"

type ScanState = "idle" | "scanning" | "processing" | "complete"

export function ScanScreen() {
  const [scanState, setScanState] = useState<ScanState>("idle")
  const [showResults, setShowResults] = useState(false)

  const handleScan = () => {
    setScanState("scanning")
    setTimeout(() => {
      setScanState("processing")
      setTimeout(() => {
        setScanState("complete")
        setShowResults(true)
      }, 2000)
    }, 1500)
  }

  const resetScan = () => {
    setScanState("idle")
    setShowResults(false)
  }

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold text-foreground">Magic Scan</h1>
        <p className="text-sm text-muted-foreground">Scan prescriptions or lab reports instantly</p>
      </header>

      {/* Scan Area */}
      {!showResults && (
        <div className="space-y-4">
          <div 
            className={cn(
              "relative aspect-[4/3] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden",
              scanState === "idle" && "border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 cursor-pointer",
              scanState !== "idle" && "border-primary bg-primary/10"
            )}
            onClick={scanState === "idle" ? handleScan : undefined}
          >
            {scanState === "idle" && (
              <>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <p className="text-foreground font-medium">Tap to scan document</p>
                <p className="text-sm text-muted-foreground mt-1">or upload from gallery</p>
              </>
            )}
            
            {scanState === "scanning" && (
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <p className="text-foreground font-medium mt-4">Scanning document...</p>
              </div>
            )}
            
            {scanState === "processing" && (
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <p className="text-foreground font-medium mt-4">Extracting values with OCR...</p>
                <p className="text-sm text-muted-foreground mt-1">Analyzing lab results</p>
              </div>
            )}
            
            {scanState === "complete" && (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <p className="text-foreground font-medium mt-4">Scan complete!</p>
                <p className="text-sm text-muted-foreground mt-1">8 values extracted</p>
              </div>
            )}
            
            {/* Scan line animation */}
            {(scanState === "scanning") && (
              <div className="absolute inset-x-4 top-0 bottom-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-x-0 h-0.5 bg-primary animate-scan-line" />
              </div>
            )}
          </div>

          {/* Upload Option */}
          <div className="flex gap-3">
            <button 
              onClick={handleScan}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <Camera className="w-5 h-5" />
              Take Photo
            </button>
            <button 
              onClick={handleScan}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              <Upload className="w-5 h-5" />
              Upload
            </button>
          </div>
        </div>
      )}

      {/* Scan Results */}
      {showResults && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Result Header */}
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-card-foreground">{sampleScannedReport.reportType}</h2>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{sampleScannedReport.labName}</p>
                <p className="text-xs text-muted-foreground">{sampleScannedReport.date}</p>
              </div>
              <button 
                onClick={resetScan}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            {/* Sync Status */}
            <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Auto-synced to PulseConnect</span>
              </div>
              <Cloud className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Extracted Values */}
          <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <h3 className="font-medium text-card-foreground">Extracted Values</h3>
              <p className="text-xs text-muted-foreground">{sampleScannedReport.values.length} parameters detected</p>
            </div>
            
            <div className="divide-y divide-border">
              {sampleScannedReport.values.map((item, index) => (
                <div key={index} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Range: {item.range} {item.unit}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-card-foreground">{item.value}</span>
                      <span className="text-sm text-muted-foreground">{item.unit}</span>
                    </div>
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      item.status === "normal" && "bg-emerald-50 text-emerald-600",
                      item.status === "elevated" && "bg-amber-50 text-amber-600",
                      item.status === "low" && "bg-rose-50 text-rose-600"
                    )}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              View Trends
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={resetScan}
              className="py-3 px-5 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              Scan Another
            </button>
          </div>
        </div>
      )}

      {/* Recent Scans */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Recent Reports</h2>
        
        <div className="space-y-3">
          {recentLabResults.map((report) => (
            <div 
              key={report.id}
              className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-xl",
                    report.status === "normal" && "bg-emerald-50",
                    report.status === "attention" && "bg-amber-50"
                  )}>
                    <FileText className={cn(
                      "w-5 h-5",
                      report.status === "normal" && "text-emerald-600",
                      report.status === "attention" && "text-amber-600"
                    )} />
                  </div>
                  <div>
                    <h3 className="font-medium text-card-foreground">{report.name}</h3>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                </div>
                <SyncStatus status={report.syncStatus} compact />
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {report.values.slice(0, 3).map((value, idx) => (
                  <span 
                    key={idx}
                    className={cn(
                      "text-xs px-2 py-1 rounded-lg",
                      value.status === "normal" && "bg-emerald-50 text-emerald-700",
                      value.status === "elevated" && "bg-amber-50 text-amber-700"
                    )}
                  >
                    {value.name}: {value.value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="h-20" />
    </div>
  )
}

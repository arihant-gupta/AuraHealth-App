// Dummy health data for AuraHealth
export const userData = {
  name: "Sarah",
  avatar: "/avatar.jpg",
  lastSync: new Date().toISOString(),
  pulseConnectStatus: "synced" as const,
}

export const dailySummary = {
  date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
  healthScore: 87,
  steps: 8432,
  stepsGoal: 10000,
  heartRate: 72,
  heartRateRange: { min: 58, max: 95 },
  sleep: 7.2,
  sleepGoal: 8,
  calories: 1840,
  caloriesGoal: 2200,
  water: 6,
  waterGoal: 8,
  activeMinutes: 45,
  activeMinutesGoal: 60,
}

export const recentLabResults = [
  {
    id: 1,
    name: "Complete Blood Count",
    date: "Jan 28, 2026",
    status: "normal" as const,
    syncStatus: "synced" as const,
    values: [
      { name: "Hemoglobin", value: "14.2", unit: "g/dL", range: "13.5-17.5", status: "normal" as const },
      { name: "WBC", value: "6.8", unit: "K/uL", range: "4.5-11.0", status: "normal" as const },
      { name: "Platelets", value: "245", unit: "K/uL", range: "150-400", status: "normal" as const },
    ]
  },
  {
    id: 2,
    name: "Lipid Panel",
    date: "Jan 15, 2026",
    status: "attention" as const,
    syncStatus: "synced" as const,
    values: [
      { name: "Total Cholesterol", value: "218", unit: "mg/dL", range: "<200", status: "elevated" as const },
      { name: "HDL", value: "58", unit: "mg/dL", range: ">40", status: "normal" as const },
      { name: "LDL", value: "142", unit: "mg/dL", range: "<100", status: "elevated" as const },
      { name: "Triglycerides", value: "95", unit: "mg/dL", range: "<150", status: "normal" as const },
    ]
  },
  {
    id: 3,
    name: "Metabolic Panel",
    date: "Jan 15, 2026",
    status: "normal" as const,
    syncStatus: "synced" as const,
    values: [
      { name: "Glucose", value: "92", unit: "mg/dL", range: "70-100", status: "normal" as const },
      { name: "Creatinine", value: "0.9", unit: "mg/dL", range: "0.7-1.3", status: "normal" as const },
      { name: "eGFR", value: "98", unit: "mL/min", range: ">60", status: "normal" as const },
    ]
  },
]

export const weeklyStepsData = [
  { day: "Mon", steps: 9234 },
  { day: "Tue", steps: 7821 },
  { day: "Wed", steps: 10542 },
  { day: "Thu", steps: 6789 },
  { day: "Fri", steps: 8432 },
  { day: "Sat", steps: 11234 },
  { day: "Sun", steps: 5678 },
]

export const weeklyHeartRateData = [
  { day: "Mon", avg: 68, min: 55, max: 92 },
  { day: "Tue", avg: 71, min: 58, max: 98 },
  { day: "Wed", avg: 74, min: 60, max: 105 },
  { day: "Thu", avg: 69, min: 54, max: 88 },
  { day: "Fri", avg: 72, min: 58, max: 95 },
  { day: "Sat", avg: 76, min: 62, max: 112 },
  { day: "Sun", avg: 65, min: 52, max: 82 },
]

export const weeklySleepData = [
  { day: "Mon", hours: 7.5, quality: 85 },
  { day: "Tue", hours: 6.8, quality: 72 },
  { day: "Wed", hours: 8.2, quality: 91 },
  { day: "Thu", hours: 6.5, quality: 68 },
  { day: "Fri", hours: 7.2, quality: 78 },
  { day: "Sat", hours: 8.5, quality: 94 },
  { day: "Sun", hours: 7.8, quality: 82 },
]

export const monthlyTrends = [
  { month: "Aug", healthScore: 78, steps: 7200, sleep: 6.8 },
  { month: "Sep", healthScore: 81, steps: 7800, sleep: 7.0 },
  { month: "Oct", healthScore: 79, steps: 7500, sleep: 6.9 },
  { month: "Nov", healthScore: 83, steps: 8200, sleep: 7.2 },
  { month: "Dec", healthScore: 85, steps: 8100, sleep: 7.4 },
  { month: "Jan", healthScore: 87, steps: 8400, sleep: 7.2 },
]

export const insights = [
  {
    id: 1,
    type: "positive" as const,
    title: "Great Sleep Pattern",
    description: "Your sleep quality has improved 12% this month. Keep maintaining your consistent bedtime.",
    metric: "+12%",
    category: "sleep",
  },
  {
    id: 2,
    type: "attention" as const,
    title: "Cholesterol Alert",
    description: "Your LDL cholesterol is slightly elevated. Consider reducing saturated fat intake.",
    metric: "142 mg/dL",
    category: "labs",
  },
  {
    id: 3,
    type: "positive" as const,
    title: "Activity Goal Streak",
    description: "You've hit your step goal 5 days in a row! Amazing consistency.",
    metric: "5 days",
    category: "activity",
  },
  {
    id: 4,
    type: "neutral" as const,
    title: "Heart Rate Variability",
    description: "Your HRV has been stable this week, indicating good recovery.",
    metric: "45ms",
    category: "heart",
  },
]

export const permissions = [
  {
    id: 1,
    institution: "PulseConnect",
    type: "Healthcare Portal",
    accessLevel: "Full Access",
    grantedDate: "Dec 15, 2025",
    expiresDate: "Dec 15, 2026",
    status: "active" as const,
    dataTypes: ["Lab Results", "Vitals", "Medications", "Activity"],
  },
  {
    id: 2,
    institution: "Dr. Emily Chen",
    type: "Primary Care Physician",
    accessLevel: "Full Access",
    grantedDate: "Jan 10, 2026",
    expiresDate: "Jul 10, 2026",
    status: "active" as const,
    dataTypes: ["Lab Results", "Vitals", "Medications"],
  },
  {
    id: 3,
    institution: "CityHealth Lab",
    type: "Diagnostic Lab",
    accessLevel: "Limited Access",
    grantedDate: "Jan 20, 2026",
    expiresDate: "Feb 20, 2026",
    status: "active" as const,
    dataTypes: ["Lab Results"],
  },
]

export const chatHistory = [
  {
    id: 1,
    role: "assistant" as const,
    content: "Hello! I'm your Health Sensei. I can help explain medical terms, lab results, and health concepts in simple language. What would you like to know?",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    role: "user" as const,
    content: "What does LDL cholesterol mean?",
    timestamp: new Date(Date.now() - 3500000).toISOString(),
  },
  {
    id: 3,
    role: "assistant" as const,
    content: "LDL stands for Low-Density Lipoprotein, often called \"bad\" cholesterol. Think of it as tiny delivery trucks that carry cholesterol through your blood. When there's too much LDL, it can stick to the walls of your arteries, building up over time like plaque in a pipe. This buildup can narrow your arteries and increase the risk of heart disease.\n\nYour recent result of 142 mg/dL is slightly above the ideal level (<100 mg/dL). Simple changes like eating more fiber, reducing saturated fats, and regular exercise can help lower it.\n\n*Note: This is educational information only. Please consult your healthcare provider for personalized medical advice.*",
    timestamp: new Date(Date.now() - 3400000).toISOString(),
  },
]

export const sampleScannedReport = {
  reportType: "Complete Blood Count",
  labName: "CityHealth Diagnostics",
  date: "January 28, 2026",
  patientName: "Sarah Johnson",
  values: [
    { name: "Hemoglobin", value: "14.2", unit: "g/dL", range: "13.5-17.5", status: "normal" as const },
    { name: "Hematocrit", value: "42.1", unit: "%", range: "38-50", status: "normal" as const },
    { name: "RBC Count", value: "4.8", unit: "M/uL", range: "4.5-5.5", status: "normal" as const },
    { name: "WBC Count", value: "6.8", unit: "K/uL", range: "4.5-11.0", status: "normal" as const },
    { name: "Platelets", value: "245", unit: "K/uL", range: "150-400", status: "normal" as const },
    { name: "MCV", value: "88", unit: "fL", range: "80-100", status: "normal" as const },
    { name: "MCH", value: "29.6", unit: "pg", range: "27-33", status: "normal" as const },
    { name: "MCHC", value: "33.7", unit: "g/dL", range: "32-36", status: "normal" as const },
  ],
  syncStatus: "synced" as const,
}

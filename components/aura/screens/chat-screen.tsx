"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Mic, Book, Clock, ChevronRight, AlertCircle } from "lucide-react"
import { chatHistory } from "@/lib/health-data"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const quickQuestions = [
  "What does my cholesterol level mean?",
  "How can I improve my sleep?",
  "What is HRV and why does it matter?",
  "Tips for lowering blood pressure",
]

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(chatHistory)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateResponse(messageText)
      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateResponse = (question: string): string => {
    const lowercaseQ = question.toLowerCase()
    
    if (lowercaseQ.includes("cholesterol")) {
      return "Cholesterol is a waxy substance your body needs to build cells. There are two main types:\n\n**LDL (Low-Density Lipoprotein)** - Often called \"bad\" cholesterol. High levels can lead to plaque buildup in arteries.\n\n**HDL (High-Density Lipoprotein)** - Known as \"good\" cholesterol. It helps remove other forms of cholesterol from your bloodstream.\n\nYour recent lipid panel shows LDL at 142 mg/dL, which is slightly elevated. Simple lifestyle changes like reducing saturated fats, exercising regularly, and eating more fiber can help.\n\n*Note: This is educational information only. Please consult your healthcare provider for personalized advice.*"
    }
    
    if (lowercaseQ.includes("sleep")) {
      return "Based on your sleep data, here are personalized tips to improve your sleep quality:\n\n1. **Consistency is key** - Your best sleep nights are when you go to bed at the same time.\n\n2. **Activity matters** - Days when you hit 8,000+ steps show 15% better sleep quality.\n\n3. **Wind down routine** - Try avoiding screens 1 hour before bed.\n\n4. **Temperature** - Keep your bedroom cool (65-68°F is ideal).\n\n5. **Limit late meals** - Your data shows eating after 8pm reduces your sleep score by 12%.\n\nYour average sleep of 7.2 hours is good! Focus on quality improvements.\n\n*Note: This is educational information only. Please consult your healthcare provider for personalized advice.*"
    }
    
    if (lowercaseQ.includes("hrv") || lowercaseQ.includes("heart rate variability")) {
      return "**Heart Rate Variability (HRV)** is the variation in time between each heartbeat. Contrary to what you might think, a higher HRV is actually a good sign!\n\n**Why it matters:**\n- Higher HRV indicates your body is adaptable and resilient\n- It reflects your autonomic nervous system health\n- It's a marker of recovery and overall fitness\n\n**Your HRV (45ms)** is within a healthy range. Factors that can improve HRV:\n- Quality sleep\n- Regular exercise\n- Stress management\n- Proper hydration\n\n*Note: This is educational information only. Please consult your healthcare provider for personalized advice.*"
    }
    
    if (lowercaseQ.includes("blood pressure")) {
      return "Blood pressure measures the force of blood against your artery walls. It's recorded as two numbers:\n\n**Systolic (top number)** - Pressure when heart beats\n**Diastolic (bottom number)** - Pressure between beats\n\n**Tips for maintaining healthy blood pressure:**\n\n1. **DASH Diet** - Rich in fruits, vegetables, whole grains\n2. **Reduce sodium** - Aim for less than 2,300mg daily\n3. **Regular exercise** - 150 minutes moderate activity weekly\n4. **Limit alcohol** - Moderation is key\n5. **Manage stress** - Meditation, deep breathing\n6. **Maintain healthy weight**\n\n*Note: This is educational information only. Please consult your healthcare provider for personalized advice.*"
    }
    
    return "I'm here to help explain health concepts in simple terms! I can provide educational information about:\n\n- Lab results and what they mean\n- Fitness metrics like steps, heart rate, and sleep\n- General wellness topics\n- Medical terminology explanations\n\nFeel free to ask me anything about your health data or general health topics. Remember, I provide educational information only and cannot diagnose conditions or replace professional medical advice.\n\n*Always consult your healthcare provider for personalized medical guidance.*"
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <header className="px-4 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Health Sensei</h1>
            <p className="text-xs text-muted-foreground">Your AI health educator</p>
          </div>
        </div>
      </header>

      {/* Disclaimer */}
      <div className="px-4 py-2 bg-amber-50 border-b border-amber-100">
        <div className="flex items-center gap-2 text-amber-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p className="text-xs">Educational only. Not medical advice. Consult your doctor for health decisions.</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3",
                message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border border-border rounded-bl-md"
              )}
            >
              {message.role === "assistant" && (
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary">Health Sensei</span>
                </div>
              )}
              <div className={cn(
                "text-sm whitespace-pre-wrap",
                message.role === "user" ? "text-primary-foreground" : "text-card-foreground"
              )}>
                {message.content.split('\n').map((line, i) => {
                  // Handle bold text
                  const parts = line.split(/(\*\*.*?\*\*)/g)
                  return (
                    <p key={i} className={i > 0 ? "mt-2" : ""}>
                      {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={j}>{part.slice(2, -2)}</strong>
                        }
                        // Handle italic (notes)
                        if (part.startsWith('*') && part.endsWith('*')) {
                          return <em key={j} className="text-muted-foreground">{part.slice(1, -1)}</em>
                        }
                        return <span key={j}>{part}</span>
                      })}
                    </p>
                  )
                })}
              </div>
              <p className={cn(
                "text-xs mt-2",
                message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 3 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSend(question)}
                className="px-3 py-1.5 text-xs font-medium bg-card border border-border rounded-full hover:bg-muted transition-colors text-foreground"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 bg-card border-t border-border">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about your health..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
              <Mic className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className={cn(
              "p-3 rounded-full transition-all",
              input.trim() && !isTyping
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

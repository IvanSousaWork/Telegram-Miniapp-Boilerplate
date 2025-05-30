"use client"

import type React from "react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"

interface FeatureCardProps {
  title: string
  description: string
  status: "available" | "unavailable" | "loading" | "warning"
  onTest?: () => void
  children?: React.ReactNode
  icon?: React.ReactNode
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, status, onTest, children, icon }) => {
  const statusVariant = {
    available: "success" as const,
    unavailable: "error" as const,
    loading: "warning" as const,
    warning: "warning" as const,
  }

  const statusText = {
    available: "✅ Available",
    unavailable: "❌ Not Available",
    loading: "⏳ Loading...",
    warning: "⚠️ Action Required",
  }

  const statusColors = {
    available: "from-green-500 to-emerald-600",
    unavailable: "from-red-500 to-pink-600",
    loading: "from-yellow-500 to-orange-600",
    warning: "from-orange-500 to-red-600",
  }

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="h-full">
      <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              {icon && (
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${statusColors[status]} flex items-center justify-center text-white shadow-lg`}
                >
                  {icon}
                </div>
              )}
              <div className="flex-1">
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription className="mt-1 leading-relaxed">{description}</CardDescription>
              </div>
            </div>
            <Badge variant={statusVariant[status]} className="ml-3 flex-shrink-0">
              {statusText[status]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {children}
          {onTest && (
            <Button
              onClick={onTest}
              disabled={status === "unavailable"}
              loading={status === "loading"}
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/25"
            >
              {status === "loading" ? "Testing..." : status === "warning" ? "🔓 Enable Feature" : "🧪 Test Feature"}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

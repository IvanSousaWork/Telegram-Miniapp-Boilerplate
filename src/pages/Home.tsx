"use client"

import type React from "react"
import { UserInfo } from "@/components/UserInfo"
import { HapticButton } from "@/components/HapticButton"
import { MainButton } from "@/components/MainButton"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { useTelegram } from "@/hooks/useTelegram"
import { usePopups } from "@/hooks/usePopups"
import { useHapticFeedback } from "@/hooks/useHapticFeedback"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"


export const Home: React.FC = () => {
  const navigate = useNavigate()
  const { webApp, platform, version } = useTelegram()
  const { showAlert, showConfirm } = usePopups()
  const haptic = useHapticFeedback()

  const handleSendData = () => {
    if (webApp) {
      webApp.sendData(JSON.stringify({ action: "home_button_clicked", timestamp: Date.now() }))
      haptic.notificationSuccess()
    }
  }

  const handleShowAlert = async () => {
    haptic.impactLight()
    await showAlert("Hello from Telegram WebApp! 🚀")
  }

  const handleShowConfirm = async () => {
    haptic.impactMedium()
    const confirmed = await showConfirm("Do you want to explore advanced features?")
    if (confirmed) {
      haptic.notificationSuccess()
      navigate("/features")
    } else {
      haptic.notificationError()
    }
  }

  const features = [
    {
      title: "Advanced Features",
      description: "Explore all Telegram WebApp capabilities",
      icon: "🚀",
      path: "/features",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Motion Sensors",
      description: "Test gyroscope, accelerometer, and orientation",
      icon: "📱",
      path: "/sensors",
      gradient: "from-green-500 to-teal-600",
    },
    {
      title: "API Documentation",
      description: "Complete reference for all methods",
      icon: "📚",
      path: "/documentation",
      gradient: "from-orange-500 to-red-600",
    },
  ]

  const quickActions = [
    {
      title: "Show Alert",
      description: "Display native alert dialog",
      icon: "💬",
      action: handleShowAlert,
      haptic: "light" as const,
    },
    {
      title: "Show Confirm",
      description: "Display confirmation dialog",
      icon: "❓",
      action: handleShowConfirm,
      haptic: "medium" as const,
    },
    {
      title: "Send Data",
      description: "Send data to bot",
      icon: "📤",
      action: handleSendData,
      haptic: "heavy" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-6"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-lg mb-4">
            <span className="text-2xl">🚀</span>
            <div className="text-left">
              <h1 className="text-xl font-bold">Telegram Mini App</h1>
              <p className="text-blue-100 text-sm">Complete WebApp Boilerplate</p>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            {platform && (
              <Badge variant="info" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                📱 {platform}
              </Badge>
            )}
            {version && (
              <Badge variant="success" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                🔖 v{version}
              </Badge>
            )}
          </div>
        </motion.div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <UserInfo />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                Quick Actions
              </CardTitle>
              <CardDescription>Test basic WebApp functionality</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <HapticButton
                    onClick={action.action}
                    hapticType={action.haptic}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-4 px-6 shadow-lg shadow-blue-500/25 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{action.icon}</span>
                      <div className="text-left">
                        <div className="font-medium">{action.title}</div>
                        <div className="text-blue-100 text-sm">{action.description}</div>
                      </div>
                    </div>
                  </HapticButton>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-xl">🎯</span>
            Explore Features
          </h2>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                onClick={() => {
                  haptic.impactLight()
                  navigate(feature.path)
                }}
                className="cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{feature.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
                    </div>
                    <svg
                      className="w-6 h-6 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Button (dk why its main button, dont look cool tho)*/}
        <MainButton
          text="🎯 Main Action"
          onClick={() => {
            haptic.notificationSuccess()
            showAlert("Main button clicked! This demonstrates the Telegram main button.")
          }}
        />
      </div>
    </div>
  )
}

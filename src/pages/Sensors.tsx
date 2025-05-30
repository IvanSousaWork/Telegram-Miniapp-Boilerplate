"use client"

import type React from "react"
import { BackButton } from "@/components/BackButton"
import { FeatureCard } from "@/components/FeatureCard"
import { SensorDisplay } from "@/components/SensorDisplay"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { useNavigate } from "react-router-dom"
import { useGyroscope } from "@/hooks/useGyroscope"
import { useAccelerometer } from "@/hooks/useAccelerometer"
import { useDeviceOrientation } from "@/hooks/useDeviceOrientation"
import { useHapticFeedback } from "@/hooks/useHapticFeedback"
import { motion } from "framer-motion"

// so tg is doing great with sensors, like it, really good

export const Sensors: React.FC = () => {
  const navigate = useNavigate()
  const haptic = useHapticFeedback()
  const gyroscope = useGyroscope()
  const accelerometer = useAccelerometer()
  const orientation = useDeviceOrientation()

  const handleGyroscopeTest = async () => {
    haptic.impactMedium()
    if (gyroscope.isStarted) {
      await gyroscope.stop()
    } else {
      await gyroscope.start({ refresh_rate: 100 })
    }
  }

  const handleAccelerometerTest = async () => {
    haptic.impactMedium()
    if (accelerometer.isStarted) {
      await accelerometer.stop()
    } else {
      await accelerometer.start({ refresh_rate: 100 })
    }
  }

  const handleOrientationTest = async () => {
    haptic.impactMedium()
    if (orientation.isStarted) {
      await orientation.stop()
    } else {
      await orientation.start({ refresh_rate: 100, need_absolute: true })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <BackButton onBack={() => navigate("/features")} />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-4 rounded-2xl shadow-lg mb-4">
            <span className="text-2xl">📱</span>
            <div className="text-left">
              <h1 className="text-2xl font-bold">Motion Sensors</h1>
              <p className="text-green-100 text-sm">Test device motion and orientation sensors</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Gyroscope (hell yaa)*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FeatureCard
              title="Gyroscope"
              description="Measures device rotation rate around three axes"
              status={gyroscope.isAvailable ? (gyroscope.loading ? "loading" : "available") : "unavailable"}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              }
            >
              <SensorDisplay title="Rotation Rate (rad/s)" data={gyroscope.data} isActive={gyroscope.isStarted} />
              <Button
                onClick={handleGyroscopeTest}
                disabled={!gyroscope.isAvailable || gyroscope.loading}
                loading={gyroscope.loading}
                variant={gyroscope.isStarted ? "destructive" : "primary"}
                className="w-full mt-4 rounded-xl"
              >
                {gyroscope.isStarted ? "🛑 Stop Gyroscope" : "▶️ Start Gyroscope"}
              </Button>
            </FeatureCard>
          </motion.div>

          {/* Accelerometer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FeatureCard
              title="Accelerometer"
              description="Measures device acceleration including gravity"
              status={accelerometer.isAvailable ? (accelerometer.loading ? "loading" : "available") : "unavailable"}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            >
              <SensorDisplay title="Acceleration (m/s²)" data={accelerometer.data} isActive={accelerometer.isStarted} />
              <Button
                onClick={handleAccelerometerTest}
                disabled={!accelerometer.isAvailable || accelerometer.loading}
                loading={accelerometer.loading}
                variant={accelerometer.isStarted ? "destructive" : "primary"}
                className="w-full mt-4 rounded-xl"
              >
                {accelerometer.isStarted ? "🛑 Stop Accelerometer" : "▶️ Start Accelerometer"}
              </Button>
            </FeatureCard>
          </motion.div>

          {/* Device Orientation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FeatureCard
              title="Device Orientation"
              description="Measures device orientation in 3D space"
              status={orientation.isAvailable ? (orientation.loading ? "loading" : "available") : "unavailable"}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              }
            >
              <SensorDisplay title="Orientation (degrees)" data={orientation.data} isActive={orientation.isStarted} />
              <Button
                onClick={handleOrientationTest}
                disabled={!orientation.isAvailable || orientation.loading}
                loading={orientation.loading}
                variant={orientation.isStarted ? "destructive" : "primary"}
                className="w-full mt-4 rounded-xl"
              >
                {orientation.isStarted ? "🛑 Stop Orientation" : "▶️ Start Orientation"}
              </Button>
            </FeatureCard>
          </motion.div>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                <span className="text-xl">📱</span>
                Sensor Information
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">🔄</span>
                  <span>
                    <strong>Gyroscope:</strong> Measures rotation rate around X, Y, Z axes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">⚡</span>
                  <span>
                    <strong>Accelerometer:</strong> Measures acceleration including gravity
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">🧭</span>
                  <span>
                    <strong>Orientation:</strong> Alpha (Z-axis), Beta (X-axis), Gamma (Y-axis)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">🔐</span>
                  <span>Sensors require user permission and device support</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

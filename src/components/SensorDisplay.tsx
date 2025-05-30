"use client"

import type React from "react"
import { Badge } from "@/components/ui/Badge"
import { motion } from "framer-motion"

interface SensorDisplayProps {
  title: string
  data: { x: number; y: number; z: number } | { alpha: number; beta: number; gamma: number; absolute: boolean }
  isActive: boolean
}

export const SensorDisplay: React.FC<SensorDisplayProps> = ({ title, data, isActive }) => {
  const isGyroData = "x" in data
  const isOrientationData = "alpha" in data

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl p-6 mt-4 border border-gray-200 dark:border-gray-600"
    >
      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="text-lg">📊</span>
        {title}
      </h4>
      <div className="grid grid-cols-3 gap-4 text-sm">
        {isGyroData && (
          <>
            <motion.div
              className="text-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              animate={isActive ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="text-blue-600 dark:text-blue-400 font-medium mb-1">X-Axis</div>
              <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">
                {isActive ? data.x.toFixed(2) : "0.00"}
              </div>
            </motion.div>
            <motion.div
              className="text-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              animate={isActive ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
            >
              <div className="text-green-600 dark:text-green-400 font-medium mb-1">Y-Axis</div>
              <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">
                {isActive ? data.y.toFixed(2) : "0.00"}
              </div>
            </motion.div>
            <motion.div
              className="text-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              animate={isActive ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
            >
              <div className="text-purple-600 dark:text-purple-400 font-medium mb-1">Z-Axis</div>
              <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">
                {isActive ? data.z.toFixed(2) : "0.00"}
              </div>
            </motion.div>
          </>
        )}
        {isOrientationData && (
          <>
            <motion.div
              className="text-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              animate={isActive ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="text-blue-600 dark:text-blue-400 font-medium mb-1">Alpha</div>
              <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">
                {isActive ? data.alpha.toFixed(1) + "°" : "0.0°"}
              </div>
            </motion.div>
            <motion.div
              className="text-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              animate={isActive ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
            >
              <div className="text-green-600 dark:text-green-400 font-medium mb-1">Beta</div>
              <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">
                {isActive ? data.beta.toFixed(1) + "°" : "0.0°"}
              </div>
            </motion.div>
            <motion.div
              className="text-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              animate={isActive ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
            >
              <div className="text-purple-600 dark:text-purple-400 font-medium mb-1">Gamma</div>
              <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">
                {isActive ? data.gamma.toFixed(1) + "°" : "0.0°"}
              </div>
            </motion.div>
          </>
        )}
      </div>
      {isOrientationData && (
        <div className="mt-4 text-center">
          <Badge variant={data.absolute ? "success" : "warning"} className="text-sm">
            {data.absolute ? "🧭 Absolute" : "📱 Relative"}
          </Badge>
        </div>
      )}
      {!isActive && (
        <div className="mt-4 text-center">
          <Badge variant="default" className="text-sm">
            ⏸️ Sensor Inactive
          </Badge>
        </div>
      )}
    </motion.div>
  )
}

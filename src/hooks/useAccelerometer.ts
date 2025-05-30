"use client"

import { useState, useCallback, useEffect } from "react"
import { useTelegram } from "./useTelegram"
import type { AccelerometerParams } from "@/types/telegram"

/**
 * hook for Telegram WebApp Accelerometer
 */
export const useAccelerometer = () => {
  const { webApp } = useTelegram()
  const [isStarted, setIsStarted] = useState(false)
  const [data, setData] = useState({ x: 0, y: 0, z: 0 })
  const [loading, setLoading] = useState(false)

  const start = useCallback(
    async (params?: AccelerometerParams): Promise<boolean> => {
      if (!webApp?.Accelerometer) return false

      setLoading(true)
      return new Promise((resolve) => {
        webApp.Accelerometer.start(params, (started) => {
          setLoading(false)
          setIsStarted(started)
          resolve(started)
        })
      })
    },
    [webApp],
  )

  const stop = useCallback(async (): Promise<void> => {
    if (!webApp?.Accelerometer) return

    setLoading(true)
    return new Promise((resolve) => {
      webApp.Accelerometer.stop(() => {
        setLoading(false)
        setIsStarted(false)
        setData({ x: 0, y: 0, z: 0 })
        resolve()
      })
    })
  }, [webApp])

  useEffect(() => {
    if (!webApp?.Accelerometer || !isStarted) return

    const interval = setInterval(() => {
      setData({
        x: webApp.Accelerometer.x,
        y: webApp.Accelerometer.y,
        z: webApp.Accelerometer.z,
      })
    }, 100)

    return () => clearInterval(interval)
  }, [webApp, isStarted])

  return {
    start,
    stop,
    data,
    isStarted,
    loading,
    isAvailable: !!webApp?.Accelerometer,
  }
}

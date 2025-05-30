"use client"

import { useState, useCallback, useEffect } from "react"
import { useTelegram } from "./useTelegram"
import type { GyroscopeParams } from "@/types/telegram"

/**
 * hook for Telegram WebApp Gyroscope
 */
export const useGyroscope = () => {
  const { webApp } = useTelegram()
  const [isStarted, setIsStarted] = useState(false)
  const [data, setData] = useState({ x: 0, y: 0, z: 0 })
  const [loading, setLoading] = useState(false)

  const start = useCallback(
    async (params?: GyroscopeParams): Promise<boolean> => {
      if (!webApp?.Gyroscope) return false

      setLoading(true)
      return new Promise((resolve) => {
        webApp.Gyroscope.start(params, (started) => {
          setLoading(false)
          setIsStarted(started)
          resolve(started)
        })
      })
    },
    [webApp],
  )

  const stop = useCallback(async (): Promise<void> => {
    if (!webApp?.Gyroscope) return

    setLoading(true)
    return new Promise((resolve) => {
      webApp.Gyroscope.stop(() => {
        setLoading(false)
        setIsStarted(false)
        setData({ x: 0, y: 0, z: 0 })
        resolve()
      })
    })
  }, [webApp])

  useEffect(() => {
    if (!webApp?.Gyroscope || !isStarted) return

    const interval = setInterval(() => {
      setData({
        x: webApp.Gyroscope.x,
        y: webApp.Gyroscope.y,
        z: webApp.Gyroscope.z,
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
    isAvailable: !!webApp?.Gyroscope,
  }
}

"use client"

import { useState, useCallback, useEffect } from "react"
import { useTelegram } from "./useTelegram"
import type { DeviceOrientationParams } from "@/types/telegram"

/**
 * hook for Telegram WebApp Device Orientation
 */
export const useDeviceOrientation = () => {
  const { webApp } = useTelegram()
  const [isStarted, setIsStarted] = useState(false)
  const [data, setData] = useState({ alpha: 0, beta: 0, gamma: 0, absolute: false })
  const [loading, setLoading] = useState(false)

  const start = useCallback(
    async (params?: DeviceOrientationParams): Promise<boolean> => {
      if (!webApp?.DeviceOrientation) return false

      setLoading(true)
      return new Promise((resolve) => {
        webApp.DeviceOrientation.start(params, (started) => {
          setLoading(false)
          setIsStarted(started)
          resolve(started)
        })
      })
    },
    [webApp],
  )

  const stop = useCallback(async (): Promise<void> => {
    if (!webApp?.DeviceOrientation) return

    setLoading(true)
    return new Promise((resolve) => {
      webApp.DeviceOrientation.stop(() => {
        setLoading(false)
        setIsStarted(false)
        setData({ alpha: 0, beta: 0, gamma: 0, absolute: false })
        resolve()
      })
    })
  }, [webApp])

  useEffect(() => {
    if (!webApp?.DeviceOrientation || !isStarted) return

    const interval = setInterval(() => {
      setData({
        alpha: webApp.DeviceOrientation.alpha,
        beta: webApp.DeviceOrientation.beta,
        gamma: webApp.DeviceOrientation.gamma,
        absolute: webApp.DeviceOrientation.absolute,
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
    isAvailable: !!webApp?.DeviceOrientation,
  }
}

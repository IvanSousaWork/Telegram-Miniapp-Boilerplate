"use client"

import { useState, useCallback } from "react"
import { useTelegram } from "./useTelegram"
import type { HomeScreenStatus } from "@/types/telegram"

/**
 * hook for Telegram WebApp Home Screen
 */
export const useHomeScreen = () => {
  const { webApp } = useTelegram()
  const [status, setStatus] = useState<HomeScreenStatus>("unknown")
  const [loading, setLoading] = useState(false)

  const addToHomeScreen = useCallback(() => {
    if (webApp?.addToHomeScreen) {
      webApp.addToHomeScreen()
    }
  }, [webApp])

  const checkStatus = useCallback(async (): Promise<HomeScreenStatus> => {
    if (!webApp?.checkHomeScreenStatus) return "unsupported"

    setLoading(true)
    return new Promise((resolve) => {
      webApp.checkHomeScreenStatus((homeScreenStatus) => {
        setLoading(false)
        setStatus(homeScreenStatus)
        resolve(homeScreenStatus)
      })
    })
  }, [webApp])

  return {
    addToHomeScreen,
    checkStatus,
    status,
    loading,
    isAvailable: !!(webApp?.addToHomeScreen && webApp?.checkHomeScreenStatus),
  }
}

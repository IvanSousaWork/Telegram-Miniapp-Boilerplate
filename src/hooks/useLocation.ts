"use client"

import { useState, useCallback } from "react"
import { useTelegram } from "./useTelegram"
import type { LocationData } from "@/types/telegram"

/**
 * hook for Telegram WebApp Location
 */
export const useLocation = () => {
  const { webApp } = useTelegram()
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState<LocationData | null>(null)

  const getLocation = useCallback(async (): Promise<LocationData | null> => {
    if (!webApp?.LocationManager) return null

    setLoading(true)
    return new Promise((resolve) => {
      webApp.LocationManager.getLocation((locationData) => {
        setLoading(false)
        setLocation(locationData || null)
        resolve(locationData || null)
      })
    })
  }, [webApp])

  const requestLocation = useCallback(async (): Promise<LocationData | null> => {
    if (!webApp?.requestLocation) return null

    setLoading(true)
    return new Promise((resolve) => {
      webApp.requestLocation((locationData) => {
        setLoading(false)
        setLocation(locationData || null)
        resolve(locationData || null)
      })
    })
  }, [webApp])

  return {
    getLocation,
    requestLocation,
    location,
    loading,
    isAvailable: !!webApp?.LocationManager,
    openSettings: () => webApp?.LocationManager?.openSettings(),
  }
}

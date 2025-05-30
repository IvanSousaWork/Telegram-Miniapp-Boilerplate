"use client"

import { useState, useCallback, useEffect } from "react"
import { useTelegram } from "./useTelegram"

/**
 * hook for Telegram WebApp Fullscreen
 */
export const useFullscreen = () => {
  const { webApp } = useTelegram()
  const [isFullscreen, setIsFullscreen] = useState(false)

  const requestFullscreen = useCallback(() => {
    if (webApp?.requestFullscreen) {
      webApp.requestFullscreen()
      setIsFullscreen(true)
    }
  }, [webApp])

  const exitFullscreen = useCallback(() => {
    if (webApp?.exitFullscreen) {
      webApp.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [webApp])

  useEffect(() => {
    if (webApp) {
      setIsFullscreen(webApp.isFullscreen || false)
    }
  }, [webApp])

  return {
    requestFullscreen,
    exitFullscreen,
    isFullscreen,
    isAvailable: !!(webApp?.requestFullscreen && webApp?.exitFullscreen),
  }
}

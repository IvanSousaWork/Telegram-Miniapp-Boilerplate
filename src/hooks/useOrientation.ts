"use client"

import { useState, useCallback, useEffect } from "react"
import { useTelegram } from "./useTelegram"

/**
 * hook for Telegram WebApp Orientation
 */
export const useOrientation = () => {
  const { webApp } = useTelegram()
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")
  const [isLocked, setIsLocked] = useState(false)

  const lockOrientation = useCallback(() => {
    if (webApp?.lockOrientation) {
      webApp.lockOrientation()
      setIsLocked(true)
    }
  }, [webApp])

  const unlockOrientation = useCallback(() => {
    if (webApp?.unlockOrientation) {
      webApp.unlockOrientation()
      setIsLocked(false)
    }
  }, [webApp])

  useEffect(() => {
    if (webApp) {
      setOrientation(webApp.orientation || "portrait")
    }
  }, [webApp])

  return {
    lockOrientation,
    unlockOrientation,
    orientation,
    isLocked,
    isAvailable: !!(webApp?.lockOrientation && webApp?.unlockOrientation),
  }
}

"use client"

import { useEffect, useCallback } from "react"
import { useTelegram } from "./useTelegram"

/**
 * hook for managing Telegram WebApp Back Button
 */
export const useBackButton = (onBack?: () => void) => {
  const { webApp } = useTelegram()

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack()
    }
  }, [onBack])

  useEffect(() => {
    if (!webApp?.BackButton) return

    if (onBack) {
      webApp.BackButton.onClick(handleBack)
      webApp.BackButton.show()
    } else {
      webApp.BackButton.hide()
    }

    return () => {
      webApp.BackButton.offClick(handleBack)
      webApp.BackButton.hide()
    }
  }, [webApp, handleBack, onBack])

  return {
    show: () => webApp?.BackButton.show(),
    hide: () => webApp?.BackButton.hide(),
    isVisible: webApp?.BackButton.isVisible || false,
  }
}

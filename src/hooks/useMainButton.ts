"use client"

import { useEffect, useCallback } from "react"
import { useTelegram } from "./useTelegram"
import type { MainButtonParams } from "@/types/telegram"

/**
 * hook for managing Telegram WebApp Main Button
 */
export const useMainButton = (text?: string, onClick?: () => void, params?: MainButtonParams) => {
  const { webApp } = useTelegram()

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick()
    }
  }, [onClick])

  useEffect(() => {
    if (!webApp?.MainButton) return

    // Set button parameters
    if (text) {
      webApp.MainButton.setText(text)
    }

    if (params) {
      webApp.MainButton.setParams(params)
    }

    // Set click handler
    if (onClick) {
      webApp.MainButton.onClick(handleClick)
      webApp.MainButton.show()
    } else {
      webApp.MainButton.hide()
    }

    return () => {
      webApp.MainButton.offClick(handleClick)
      webApp.MainButton.hide()
    }
  }, [webApp, text, handleClick, onClick, params])

  return {
    setText: (text: string) => webApp?.MainButton.setText(text),
    show: () => webApp?.MainButton.show(),
    hide: () => webApp?.MainButton.hide(),
    enable: () => webApp?.MainButton.enable(),
    disable: () => webApp?.MainButton.disable(),
    showProgress: () => webApp?.MainButton.showProgress(),
    hideProgress: () => webApp?.MainButton.hideProgress(),
    setParams: (params: MainButtonParams) => webApp?.MainButton.setParams(params),
    isVisible: webApp?.MainButton.isVisible || false,
    isActive: webApp?.MainButton.isActive || false,
  }
}

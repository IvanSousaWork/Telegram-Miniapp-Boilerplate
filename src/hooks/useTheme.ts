"use client"

import { useEffect, useState } from "react"
import { useTelegram } from "./useTelegram"

/**
 * hook for Telegram WebApp Theme management
 */
export const useTheme = () => {
  const { webApp, colorScheme, themeParams } = useTelegram()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(colorScheme === "dark")
  }, [colorScheme])

  const setHeaderColor = (color: string) => {
    webApp?.setHeaderColor(color)
  }

  const setBackgroundColor = (color: string) => {
    webApp?.setBackgroundColor(color)
  }

  // helper function to get CSS variables from theme params
  const getCSSVariables = (): Record<string, string> => {
    if (!themeParams) return {}

    return {
      "--tg-bg-color": themeParams.bg_color || "#ffffff",
      "--tg-text-color": themeParams.text_color || "#000000",
      "--tg-hint-color": themeParams.hint_color || "#999999",
      "--tg-link-color": themeParams.link_color || "#2481cc",
      "--tg-button-color": themeParams.button_color || "#2481cc",
      "--tg-button-text-color": themeParams.button_text_color || "#ffffff",
      "--tg-secondary-bg-color": themeParams.secondary_bg_color || "#f1f1f1",
    }
  }

  return {
    isDark,
    colorScheme,
    themeParams,
    setHeaderColor,
    setBackgroundColor,
    cssVariables: getCSSVariables(),
  }
}

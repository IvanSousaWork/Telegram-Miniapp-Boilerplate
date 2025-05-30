"use client"

import { useState, useCallback } from "react"
import { useTelegram } from "./useTelegram"

/**
 * hook for Telegram WebApp Clipboard access
 */
export const useClipboard = () => {
  const { webApp } = useTelegram()
  const [loading, setLoading] = useState(false)

  const readText = useCallback(async (): Promise<string | null> => {
    if (!webApp) return null

    setLoading(true)
    return new Promise((resolve) => {
      webApp.readTextFromClipboard((text) => {
        setLoading(false)
        resolve(text || null)
      })
    })
  }, [webApp])

  return {
    readText,
    loading,
  }
}

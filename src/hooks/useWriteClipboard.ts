"use client"

import { useState, useCallback } from "react"
import { useTelegram } from "./useTelegram"

/**
 * hook for Telegram WebApp Write Clipboard
 */
export const useWriteClipboard = () => {
  const { webApp } = useTelegram()
  const [loading, setLoading] = useState(false)

  const writeText = useCallback(
    async (text: string): Promise<boolean> => {
      if (!webApp?.writeTextToClipboard) return false

      setLoading(true)
      return new Promise((resolve) => {
        webApp.writeTextToClipboard(text, (success) => {
          setLoading(false)
          resolve(success)
        })
      })
    },
    [webApp],
  )

  return {
    writeText,
    loading,
    isAvailable: !!webApp?.writeTextToClipboard,
  }
}

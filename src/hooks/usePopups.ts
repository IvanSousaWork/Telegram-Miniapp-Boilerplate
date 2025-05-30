"use client"

import { useCallback } from "react"
import { useTelegram } from "./useTelegram"
import type { PopupParams } from "@/types/telegram"

/**
 * hook for Telegram WebApp Popups and Alerts
 */
export const usePopups = () => {
  const { webApp } = useTelegram()

  const showAlert = useCallback(
    async (message: string): Promise<void> => {
      if (!webApp) return

      return new Promise((resolve) => {
        webApp.showAlert(message, () => resolve())
      })
    },
    [webApp],
  )

  const showConfirm = useCallback(
    async (message: string): Promise<boolean> => {
      if (!webApp) return false

      return new Promise((resolve) => {
        webApp.showConfirm(message, (confirmed) => resolve(confirmed))
      })
    },
    [webApp],
  )

  const showPopup = useCallback(
    async (params: PopupParams): Promise<string | undefined> => {
      if (!webApp) return undefined

      return new Promise((resolve) => {
        webApp.showPopup(params, (buttonId) => resolve(buttonId))
      })
    },
    [webApp],
  )

  return {
    showAlert,
    showConfirm,
    showPopup,
  }
}

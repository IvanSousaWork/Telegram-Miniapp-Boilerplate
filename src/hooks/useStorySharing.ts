"use client"

import { useCallback } from "react"
import { useTelegram } from "./useTelegram"
import type { ShareStoryParams } from "@/types/telegram"

/**
 * hook for Telegram WebApp Story Sharing
 */
export const useStorySharing = () => {
  const { webApp } = useTelegram()

  const shareToStory = useCallback(
    (mediaUrl: string, params?: ShareStoryParams) => {
      if (webApp?.shareToStory) {
        webApp.shareToStory(mediaUrl, params)
      }
    },
    [webApp],
  )

  return {
    shareToStory,
    isAvailable: !!webApp?.shareToStory,
  }
}

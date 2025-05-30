"use client"

import { useEffect, useState } from "react"
import type { TelegramWebApp, WebAppUser } from "@/types/telegram"

/**
 * main hook for Telegram WebApp integration
 * provides access to all Telegram WebApp features
 */
export const useTelegram = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)
  const [user, setUser] = useState<WebAppUser | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      setWebApp(tg)
      setUser(tg.initDataUnsafe?.user || null)

      // initialize the app
      tg.ready()
      tg.expand()

      setIsReady(true)
    }
  }, [])

  return {
    webApp,
    user,
    isReady,
    // quick access to common properties
    platform: webApp?.platform,
    version: webApp?.version,
    colorScheme: webApp?.colorScheme,
    themeParams: webApp?.themeParams,
    initData: webApp?.initData,
    initDataUnsafe: webApp?.initDataUnsafe,
  }
}

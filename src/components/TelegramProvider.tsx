"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { TelegramWebApp, WebAppUser } from "@/types/telegram"

interface TelegramContextType {
  webApp: TelegramWebApp | null
  user: WebAppUser | null
  isReady: boolean
}

const TelegramContext = createContext<TelegramContextType>({
  webApp: null,
  user: null,
  isReady: false,
})

export const useTelegramContext = () => useContext(TelegramContext)

interface TelegramProviderProps {
  children: React.ReactNode
}

/**
 * provider component for Telegram WebApp context
 * initializes the WebApp and provides global access to Telegram features
 */
export const TelegramProvider: React.FC<TelegramProviderProps> = ({ children }) => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)
  const [user, setUser] = useState<WebAppUser | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      // initialize WebApp
      tg.ready()
      tg.expand()

      // set theme
      document.documentElement.style.setProperty("--tg-bg-color", tg.themeParams.bg_color || "#ffffff")
      document.documentElement.style.setProperty("--tg-text-color", tg.themeParams.text_color || "#000000")

      setWebApp(tg)
      setUser(tg.initDataUnsafe?.user || null)
      setIsReady(true)
    } else {
      // development mode - simulate Telegram environment
      console.warn("Telegram WebApp not detected. Running in development mode.")
      setIsReady(true)
    }
  }, [])

  return <TelegramContext.Provider value={{ webApp, user, isReady }}>{children}</TelegramContext.Provider>
}

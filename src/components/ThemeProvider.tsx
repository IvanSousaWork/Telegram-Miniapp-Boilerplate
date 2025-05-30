"use client"

import type React from "react"
import { useEffect } from "react"
import { useTheme } from "@/hooks/useTheme"

interface ThemeProviderProps {
  children: React.ReactNode
}

/**
 * provider component for Telegram theme integration
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { isDark, cssVariables } = useTheme()

  useEffect(() => {
    // apply theme class to document
    document.documentElement.classList.toggle("dark", isDark)

    // apply CSS variables
    Object.entries(cssVariables).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value)
    })
  }, [isDark, cssVariables])

  return <>{children}</>
}

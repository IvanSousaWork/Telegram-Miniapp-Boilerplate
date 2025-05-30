import type React from "react"
import { useMainButton } from "@/hooks/useMainButton"
import type { MainButtonParams } from "@/types/telegram"

interface MainButtonProps {
  text: string
  onClick?: () => void
  params?: MainButtonParams
  show?: boolean
}

/**
 * component wrapper for Telegram WebApp Main Button
 */
export const MainButton: React.FC<MainButtonProps> = ({ text, onClick, params, show = true }) => {
  useMainButton(show ? text : undefined, show ? onClick : undefined, params)

  // this component doesn't render anything - it just manages the Telegram main button
  return null
}

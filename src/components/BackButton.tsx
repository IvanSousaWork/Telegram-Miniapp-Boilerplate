import type React from "react"
import { useBackButton } from "@/hooks/useBackButton"

interface BackButtonProps {
  onBack?: () => void
  show?: boolean
}

/**
 * component wrapper for Telegram WebApp Back Button
 */
export const BackButton: React.FC<BackButtonProps> = ({ onBack, show = true }) => {
  useBackButton(show ? onBack : undefined)

  // this component doesn't render anything - it just manages the Telegram back button
  return null
}

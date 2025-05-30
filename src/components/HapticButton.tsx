"use client"

import type React from "react"
import { useHapticFeedback } from "@/hooks/useHapticFeedback"

interface HapticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  hapticType?: "light" | "medium" | "heavy" | "rigid" | "soft"
  className?: string
  disabled?: boolean
}

/**
 * button component with haptic feedback
 */
export const HapticButton: React.FC<HapticButtonProps> = ({
  children,
  onClick,
  hapticType = "medium",
  className = "",
  disabled = false,
}) => {
  const haptic = useHapticFeedback()

  const handleClick = () => {
    if (disabled) return

    // Trigger haptic feedback
    switch (hapticType) {
      case "light":
        haptic.impactLight()
        break
      case "medium":
        haptic.impactMedium()
        break
      case "heavy":
        haptic.impactHeavy()
        break
      case "rigid":
        haptic.impactRigid()
        break
      case "soft":
        haptic.impactSoft()
        break
    }

    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg font-medium transition-colors
        ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
        }
        ${className}
      `}
    >
      {children}
    </button>
  )
}

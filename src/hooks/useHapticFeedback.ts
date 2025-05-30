import { useTelegram } from "./useTelegram"

/**
 * hook for Telegram WebApp Haptic Feedback
 */
export const useHapticFeedback = () => {
  const { webApp } = useTelegram()

  return {
    // Impact feedback for button presses
    impactLight: () => webApp?.HapticFeedback.impactOccurred("light"),
    impactMedium: () => webApp?.HapticFeedback.impactOccurred("medium"),
    impactHeavy: () => webApp?.HapticFeedback.impactOccurred("heavy"),
    impactRigid: () => webApp?.HapticFeedback.impactOccurred("rigid"),
    impactSoft: () => webApp?.HapticFeedback.impactOccurred("soft"),

    // Notification feedback for status updates
    notificationError: () => webApp?.HapticFeedback.notificationOccurred("error"),
    notificationSuccess: () => webApp?.HapticFeedback.notificationOccurred("success"),
    notificationWarning: () => webApp?.HapticFeedback.notificationOccurred("warning"),

    // Selection feedback for UI interactions
    selectionChanged: () => webApp?.HapticFeedback.selectionChanged(),
  }
}

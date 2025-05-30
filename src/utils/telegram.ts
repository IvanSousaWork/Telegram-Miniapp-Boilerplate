/**
 * Utility functions for Telegram WebApp
 */

/**
 * Check if the app is running inside Telegram
 */
export const isTelegramWebApp = (): boolean => {
  return typeof window !== "undefined" && !!window.Telegram?.WebApp
}

/**
 * Get Telegram WebApp instance
 */
export const getTelegramWebApp = () => {
  return window.Telegram?.WebApp || null
}

/**
 * Validate Telegram WebApp init data
 */
export const validateInitData = (initData: string): boolean => {
  // Basic validation - in production, implement proper hash validation
  return initData.length > 0
}

/**
 * Parse start parameter from init data
 */
export const getStartParam = (): string | null => {
  const webApp = getTelegramWebApp()
  return webApp?.initDataUnsafe?.start_param || null
}

/**
 * Check if user is premium
 */
export const isUserPremium = (): boolean => {
  const webApp = getTelegramWebApp()
  return webApp?.initDataUnsafe?.user?.is_premium || false
}

/**
 * Get user language code
 */
export const getUserLanguage = (): string => {
  const webApp = getTelegramWebApp()
  return webApp?.initDataUnsafe?.user?.language_code || "en"
}

/**
 * Format user display name
 */
export const getUserDisplayName = (): string => {
  const webApp = getTelegramWebApp()
  const user = webApp?.initDataUnsafe?.user

  if (!user) return "User"

  if (user.username) return `@${user.username}`
  if (user.last_name) return `${user.first_name} ${user.last_name}`
  return user.first_name
}

/**
 * Check if feature is available in current version
 */
export const isFeatureAvailable = (minVersion: string): boolean => {
  const webApp = getTelegramWebApp()
  return webApp?.isVersionAtLeast(minVersion) || false
}

/**
 * Get user photo URL
 */
export const getUserPhotoUrl = (): string | null => {
  const webApp = getTelegramWebApp()
    return webApp?.initDataUnsafe?.user?.photo_url || null
  }
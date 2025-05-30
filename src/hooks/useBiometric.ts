"use client"

import { useState, useCallback, useEffect } from "react"
import { useTelegram } from "./useTelegram"

/**
 * hook for Telegram WebApp Biometric Authentication
 */
// dk bozo not working 
export const useBiometric = () => {
  const { webApp } = useTelegram()
  const [loading, setLoading] = useState(false)
  const [accessRequested, setAccessRequested] = useState(false)

  // auto-request access when biometric is available but access not granted
  useEffect(() => {
    if (
      webApp?.BiometricManager?.isBiometricAvailable &&
      !webApp?.BiometricManager?.isAccessGranted &&
      !accessRequested
    ) {
      setAccessRequested(true)
      requestAccess("Enable biometric authentication for enhanced security")
    }
  }, [webApp?.BiometricManager, accessRequested])

  const requestAccess = useCallback(
    async (reason?: string): Promise<boolean> => {
      if (!webApp?.BiometricManager) return false

      setLoading(true)
      return new Promise((resolve) => {
        webApp.BiometricManager.requestAccess(
          { reason: reason || "Enable biometric authentication for secure access" },
          (granted) => {
            setLoading(false)
            setAccessRequested(true)
            resolve(granted)
          },
        )
      })
    },
    [webApp],
  )

  const authenticate = useCallback(
    async (reason?: string): Promise<{ success: boolean; token?: string }> => {
      if (!webApp?.BiometricManager) return { success: false }

      // Auto-request access if not granted
      if (!webApp.BiometricManager.isAccessGranted) {
        const accessGranted = await requestAccess(reason)
        if (!accessGranted) {
          return { success: false }
        }
      }

      setLoading(true)
      return new Promise((resolve) => {
        webApp.BiometricManager.authenticate({ reason: reason || "Authenticate to continue" }, (success, token) => {
          setLoading(false)
          resolve({ success, token })
        })
      })
    },
    [webApp, requestAccess],
  )

  const updateToken = useCallback(
    async (token: string): Promise<boolean> => {
      if (!webApp?.BiometricManager) return false

      setLoading(true)
      return new Promise((resolve) => {
        webApp.BiometricManager.updateBiometricToken(token, (updated) => {
          setLoading(false)
          resolve(updated)
        })
      })
    },
    [webApp],
  )

  const getStatus = useCallback(() => {
    if (!webApp?.BiometricManager) return "unavailable"
    if (!webApp.BiometricManager.isBiometricAvailable) return "unavailable"
    if (!webApp.BiometricManager.isAccessGranted) return "access_needed"
    return "ready"
  }, [webApp?.BiometricManager])

  return {
    requestAccess,
    authenticate,
    updateToken,
    openSettings: () => webApp?.BiometricManager?.openSettings(),
    loading,
    isAvailable: webApp?.BiometricManager?.isBiometricAvailable || false,
    isAccessGranted: webApp?.BiometricManager?.isAccessGranted || false,
    biometricType: webApp?.BiometricManager?.biometricType,
    deviceId: webApp?.BiometricManager?.deviceId,
    status: getStatus(),
  }
}

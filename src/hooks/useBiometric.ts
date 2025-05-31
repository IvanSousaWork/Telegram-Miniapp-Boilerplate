"use client"

import { useState, useCallback, useEffect } from "react"
import { useTelegram } from "./useTelegram"

/**
 * hook for Telegram WebApp Biometric Authentication
 */
export const useBiometric = () => {
  const { webApp } = useTelegram()
  const [loading, setLoading] = useState(false)
  const [isInited, setIsInited] = useState(false)

  // initialize BiometricManager when webApp is available
  useEffect(() => {
    if (webApp?.BiometricManager && !isInited) {
      setLoading(true)
      webApp.BiometricManager.init(() => {
        setIsInited(true)
        setLoading(false)
        console.log("BiometricManager initialized successfully")

        
        if (
          webApp.BiometricManager.isBiometricAvailable &&
          !webApp.BiometricManager.isAccessGranted &&
          !webApp.BiometricManager.isAccessRequested
        ) {
          
          setTimeout(() => {
            requestAccess("Enable biometric authentication for enhanced security")
          }, 500)
        }
      })
    }
  }, [webApp?.BiometricManager, isInited])

  const requestAccess = useCallback(
    async (reason?: string): Promise<boolean> => {
      if (!webApp?.BiometricManager || !isInited) {
        console.warn("BiometricManager not initialized")
        return false
      }

      if (!webApp.BiometricManager.isBiometricAvailable) {
        console.warn("Biometric not available on this device")
        return false
      }

      setLoading(true)

      return new Promise((resolve) => {
        webApp.BiometricManager.requestAccess(
          { reason: reason || "Enable biometric authentication for secure access" },
          (granted) => {
            setLoading(false)
            console.log("Biometric access request result:", granted)
            resolve(granted)
          },
        )
      })
    },
    [webApp, isInited],
  )

  const authenticate = useCallback(
    async (reason?: string): Promise<{ success: boolean; token?: string }> => {
      if (!webApp?.BiometricManager || !isInited) {
        console.warn("BiometricManager not initialized")
        return { success: false }
      }

      if (!webApp.BiometricManager.isBiometricAvailable) {
        console.warn("Biometric not available on this device")
        return { success: false }
      }

      
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
          console.log("Biometric authentication result:", { success, token: token ? "***" : undefined })
          resolve({ success, token })
        })
      })
    },
    [webApp, isInited, requestAccess],
  )

  const updateToken = useCallback(
    async (token: string): Promise<boolean> => {
      if (!webApp?.BiometricManager || !isInited) {
        console.warn("BiometricManager not initialized")
        return false
      }

      setLoading(true)
      return new Promise((resolve) => {
        webApp.BiometricManager.updateBiometricToken(token, (updated) => {
          setLoading(false)
          console.log("Biometric token update result:", updated)
          resolve(updated)
        })
      })
    },
    [webApp, isInited],
  )

  const openSettings = useCallback(() => {
    if (!webApp?.BiometricManager || !isInited) {
      console.warn("BiometricManager not initialized")
      return
    }
    webApp.BiometricManager.openSettings()
  }, [webApp, isInited])

  const getStatus = useCallback(() => {
    if (!webApp?.BiometricManager) return "unavailable"
    if (!isInited) return "initializing"
    if (!webApp.BiometricManager.isBiometricAvailable) return "unavailable"
    if (!webApp.BiometricManager.isAccessGranted) return "access_needed"
    return "ready"
  }, [webApp?.BiometricManager, isInited])

  const getBiometricInfo = useCallback(() => {
    if (!webApp?.BiometricManager || !isInited) {
      return {
        isBiometricAvailable: false,
        biometricType: undefined,
        isAccessRequested: false,
        isAccessGranted: false,
        isBiometricTokenSaved: false,
        deviceId: undefined,
      }
    }

    return {
      isBiometricAvailable: webApp.BiometricManager.isBiometricAvailable,
      biometricType: webApp.BiometricManager.biometricType,
      isAccessRequested: webApp.BiometricManager.isAccessRequested,
      isAccessGranted: webApp.BiometricManager.isAccessGranted,
      isBiometricTokenSaved: webApp.BiometricManager.isBiometricTokenSaved,
      deviceId: webApp.BiometricManager.deviceId,
    }
  }, [webApp?.BiometricManager, isInited])

  const biometricInfo = getBiometricInfo()

  return {
    
    requestAccess,
    authenticate,
    updateToken,
    openSettings,

    
    loading,
    isInited,
    status: getStatus(),

    
    ...biometricInfo,

   
    isAvailable: biometricInfo.isBiometricAvailable,
    biometricType: biometricInfo.biometricType,
    deviceId: biometricInfo.deviceId,
  }
}

"use client"

import { useState, useCallback, useEffect } from "react"
import { useTelegram } from "./useTelegram"
import type { LocationData } from "@/types/telegram"

type LocationStatus = "initializing" | "unavailable" | "access_needed" | "ready"


export const useLocation = () => {
  const { webApp } = useTelegram()
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState<LocationData | null>(null)
  const [isInited, setIsInited] = useState(false)
  const [isLocationAvailable, setIsLocationAvailable] = useState(false)
  const [isAccessRequested, setIsAccessRequested] = useState(false)
  const [isAccessGranted, setIsAccessGranted] = useState(false)
  const [status, setStatus] = useState<LocationStatus>("initializing")

  
  useEffect(() => {
    const initLocationManager = () => {
      if (!webApp?.LocationManager) {
        console.log("LocationManager not available")
        setStatus("unavailable")
        return
      }

      console.log("Initializing LocationManager...")

      try {
        webApp.LocationManager.init(() => {
          console.log("LocationManager initialized")
          setIsInited(true)

          
          const manager = webApp.LocationManager
          setIsLocationAvailable(manager.isLocationAvailable || false)
          setIsAccessRequested(manager.isAccessRequested || false)
          setIsAccessGranted(manager.isAccessGranted || false)

          
          if (!manager.isLocationAvailable) {
            setStatus("unavailable")
          } else if (!manager.isAccessGranted) {
            setStatus("access_needed")
          } else {
            setStatus("ready")
          }

          console.log("LocationManager status:", {
            isInited: true,
            isLocationAvailable: manager.isLocationAvailable,
            isAccessRequested: manager.isAccessRequested,
            isAccessGranted: manager.isAccessGranted,
          })
        })
      } catch (error) {
        console.error("Failed to initialize LocationManager:", error)
        setStatus("unavailable")
      }
    }

    if (webApp) {
      initLocationManager()
    }
  }, [webApp])

  const getLocation = useCallback(async (): Promise<LocationData | null> => {
    if (!webApp?.LocationManager || !isInited) {
      console.log("LocationManager not available or not initialized")
      return null
    }

    if (status === "unavailable") {
      console.log("Location services not available")
      return null
    }

    if (status === "access_needed") {
      console.log("Location access not granted")
      return null
    }

    setLoading(true)
    return new Promise((resolve) => {
      try {
        webApp.LocationManager.getLocation((locationData) => {
          setLoading(false)
          console.log("Location data received:", locationData)

          if (locationData) {
            setLocation(locationData)
            resolve(locationData)
          } else {
            console.log("Location access denied or failed")
            
            setIsAccessGranted(false)
            setStatus("access_needed")
            resolve(null)
          }
        })
      } catch (error) {
        console.error("Error getting location:", error)
        setLoading(false)
        resolve(null)
      }
    })
  }, [webApp, isInited, status])

  const requestLocation = useCallback(async (): Promise<LocationData | null> => {
    if (!webApp?.LocationManager || !isInited) {
      console.log("LocationManager not available or not initialized")
      return null
    }

    if (status === "unavailable") {
      console.log("Location services not available")
      return null
    }

    
    setLoading(true)
    return new Promise((resolve) => {
      try {
        webApp.LocationManager.getLocation((locationData) => {
          setLoading(false)
          console.log("Location request result:", locationData)

          if (locationData) {
            setLocation(locationData)
            setIsAccessGranted(true)
            setIsAccessRequested(true)
            setStatus("ready")
            resolve(locationData)
          } else {
            console.log("Location access denied")
            setIsAccessRequested(true)
            setIsAccessGranted(false)
            setStatus("access_needed")
            resolve(null)
          }
        })
      } catch (error) {
        console.error("Error requesting location:", error)
        setLoading(false)
        resolve(null)
      }
    })
  }, [webApp, isInited, status])

  const openSettings = useCallback(() => {
    if (!webApp?.LocationManager || !isInited) {
      console.log("LocationManager not available or not initialized")
      return
    }

    try {
      webApp.LocationManager.openSettings()
      console.log("Opened location settings")
    } catch (error) {
      console.error("Error opening location settings:", error)
    }
  }, [webApp, isInited])

  return {
    
    location,
    loading,

    
    status,
    isInited,
    isLocationAvailable,
    isAccessRequested,
    isAccessGranted,

    
    getLocation,
    requestLocation,
    openSettings,

    
    isAvailable: isLocationAvailable,
  }
}

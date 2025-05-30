"use client"

import { useState, useCallback } from "react"
import { useTelegram } from "./useTelegram"

/**
 * hook for Telegram WebApp QR Scanner
 */
export const useQRScanner = () => {
  const { webApp } = useTelegram()
  const [isScanning, setIsScanning] = useState(false)

  const scanQR = useCallback(
    async (text?: string): Promise<string | null> => {
      if (!webApp) return null

      setIsScanning(true)
      return new Promise((resolve) => {
        webApp.showScanQrPopup({ text }, (scannedText) => {
          setIsScanning(false)
          resolve(scannedText || null)
        })
      })
    },
    [webApp],
  )

  const closeScan = useCallback(() => {
    if (webApp) {
      webApp.closeScanQrPopup()
      setIsScanning(false)
    }
  }, [webApp])

  return {
    scanQR,
    closeScan,
    isScanning,
  }
}

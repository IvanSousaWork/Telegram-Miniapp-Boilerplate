"use client"

import type React from "react"
import { useState } from "react"
import { BackButton } from "@/components/BackButton"
import { FeatureCard } from "@/components/FeatureCard"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent } from "@/components/ui/Card"
import { useNavigate } from "react-router-dom"
import { useCloudStorage } from "@/hooks/useCloudStorage"
import { useBiometric } from "@/hooks/useBiometric"
import { useQRScanner } from "@/hooks/useQRScanner"
import { useClipboard } from "@/hooks/useClipboard"
import { useWriteClipboard } from "@/hooks/useWriteClipboard"
import { useLocation } from "@/hooks/useLocation"
import { useFullscreen } from "@/hooks/useFullscreen"
import { useOrientation } from "@/hooks/useOrientation"
import { useHomeScreen } from "@/hooks/useHomeScreen"
import { useStorySharing } from "@/hooks/useStorySharing"
import { usePopups } from "@/hooks/usePopups"
import { useHapticFeedback } from "@/hooks/useHapticFeedback"
import { motion } from "framer-motion"


export const Features: React.FC = () => {
  const navigate = useNavigate()
  const haptic = useHapticFeedback()
  const { setItem, getItem, loading: storageLoading } = useCloudStorage()
  const {
    requestAccess,
    authenticate,
    isAccessGranted,
    status: biometricStatus,
    biometricType,
    loading: biometricLoading,
  } = useBiometric()
  const { scanQR, isScanning } = useQRScanner()
  const { readText, loading: clipboardLoading } = useClipboard()
  const { writeText, loading: writeClipboardLoading } = useWriteClipboard()
  const { requestLocation, location, loading: locationLoading } = useLocation()
  const { requestFullscreen, exitFullscreen, isFullscreen } = useFullscreen()
  const { lockOrientation, unlockOrientation, orientation, isLocked } = useOrientation()
  const { addToHomeScreen, checkStatus, status: homeScreenStatus } = useHomeScreen()
  const { shareToStory } = useStorySharing()
  const { showAlert } = usePopups()

  const [storageValue, setStorageValue] = useState("")
  const [qrResult, setQrResult] = useState("")
  const [clipboardText, setClipboardText] = useState("")

  const handleCloudStorage = async () => {
    haptic.impactMedium()
    try {
      await setItem("test_key", "Hello from cloud!")
      const value = await getItem("test_key")
      setStorageValue(value || "No value found")
      await showAlert(`Cloud storage value: ${value}`)
      haptic.notificationSuccess()
    } catch (error) {
      haptic.notificationError()
      await showAlert("Cloud storage error")
    }
  }

  const handleBiometric = async () => {
    haptic.impactMedium()

    if (biometricStatus === "unavailable") {
      await showAlert("Biometric authentication is not available on this device")
      return
    }

    if (biometricStatus === "access_needed") {
      try {
        const accessGranted = await requestAccess("Enable biometric authentication for secure access")
        if (accessGranted) {
          haptic.notificationSuccess()
          await showAlert("Biometric access granted! You can now authenticate.")
        } else {
          await showAlert("Biometric access denied. You can enable it later in settings.")
        }
        return
      } catch (error) {
        haptic.notificationError()
        await showAlert("Error requesting biometric access")
        return
      }
    }

    try {
      const result = await authenticate("Authenticate to test biometric functionality")
      if (result.success) {
        haptic.notificationSuccess()
        await showAlert(
          `Authentication successful! ${result.token ? `Token: ${result.token.substring(0, 20)}...` : ""}`,
        )
      } else {
        haptic.notificationError()
        await showAlert("Authentication failed or was cancelled")
      }
    } catch (error) {
      haptic.notificationError()
      await showAlert("Biometric authentication error")
    }
  }

  const handleQRScan = async () => {
    haptic.impactLight()
    try {
      const result = await scanQR("Scan any QR code")
      if (result) {
        setQrResult(result)
        haptic.notificationSuccess()
        await showAlert(`QR Code scanned: ${result}`)
      }
    } catch (error) {
      haptic.notificationError()
      await showAlert("QR scan error")
    }
  }

  const handleReadClipboard = async () => {
    haptic.impactLight()
    try {
      const text = await readText()
      if (text) {
        setClipboardText(text)
        haptic.notificationSuccess()
        await showAlert(`Clipboard content: ${text}`)
      } else {
        await showAlert("No text in clipboard")
      }
    } catch (error) {
      haptic.notificationError()
      await showAlert("Clipboard access error")
    }
  }

  const handleWriteClipboard = async () => {
    haptic.impactLight()
    try {
      const success = await writeText("Hello from Telegram WebApp!")
      haptic.notificationSuccess()
      await showAlert(success ? "Text copied to clipboard!" : "Failed to copy text")
    } catch (error) {
      haptic.notificationError()
      await showAlert("Clipboard write error")
    }
  }

  const handleLocation = async () => {
    haptic.impactMedium()
    try {
      const loc = await requestLocation()
      if (loc) {
        haptic.notificationSuccess()
        await showAlert(`Location: ${loc.latitude}, ${loc.longitude}`)
      } else {
        await showAlert("Location access denied")
      }
    } catch (error) {
      haptic.notificationError()
      await showAlert("Location error")
    }
  }

  const handleFullscreen = () => {
    haptic.impactMedium()
    if (isFullscreen) {
      exitFullscreen()
    } else {
      requestFullscreen()
    }
  }

  const handleOrientation = () => {
    haptic.impactLight()
    if (isLocked) {
      unlockOrientation()
    } else {
      lockOrientation()
    }
  }

  const handleHomeScreen = async () => {
    haptic.impactMedium()
    await checkStatus()
    if (homeScreenStatus === "missed") {
      addToHomeScreen()
    } else {
      await showAlert(`Home screen status: ${homeScreenStatus}`)
    }
  }

  const handleStoryShare = () => {
    haptic.impactLight()
    shareToStory("https://picsum.photos/400/600", {
      text: "Shared from Telegram WebApp!",
      widget_link: {
        url: "https://t.me/TMWA_BOT",
        name: "Open App",
      },
    })
  }

  const getBiometricFeatureStatus = (): "available" | "unavailable" | "loading" | "warning" => {
    if (biometricLoading) return "loading"
    if (biometricStatus === "unavailable") return "unavailable"
    if (biometricStatus === "access_needed") return "warning"
    return "available"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <BackButton onBack={() => navigate("/")} />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-4 rounded-2xl shadow-lg mb-4">
            <span className="text-2xl">🎯</span>
            <div className="text-left">
              <h1 className="text-2xl font-bold">Advanced Features</h1>
              <p className="text-purple-100 text-sm">Explore all Telegram WebApp capabilities</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Cloud Storage (but why?) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FeatureCard
              title="Cloud Storage"
              description="Store data in Telegram's cloud storage"
              status={storageLoading ? "loading" : "available"}
              onTest={handleCloudStorage}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              }
            >
              {storageValue && (
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Stored:</strong> {storageValue}
                  </p>
                </div>
              )}
            </FeatureCard>
          </motion.div>

          {/* Biometric Authentication (cooked not working)*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FeatureCard
              title="Biometric Auth"
              description="Authenticate using fingerprint or face recognition"
              status={getBiometricFeatureStatus()}
              onTest={handleBiometric}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              }
            >
              <div className="mt-3 space-y-2">
                <Badge
                  variant={
                    biometricStatus === "ready"
                      ? "success"
                      : biometricStatus === "access_needed"
                        ? "warning"
                        : "default"
                  }
                >
                  {biometricStatus === "ready"
                    ? "🔐 Ready"
                    : biometricStatus === "access_needed"
                      ? "🔓 Access Required"
                      : biometricStatus === "unavailable"
                        ? "❌ Not Available"
                        : "⏳ Checking..."}
                </Badge>

                {biometricType && (
                  <Badge variant="info">
                    {biometricType === "face" ? "👤" : "👆"} {biometricType}
                  </Badge>
                )}

                {isAccessGranted && <Badge variant="success">✅ Access Granted</Badge>}

                {biometricStatus === "access_needed" && (
                  <div className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                    Tap to enable biometric authentication
                  </div>
                )}

                {biometricStatus === "unavailable" && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Biometric authentication not supported
                  </div>
                )}
              </div>
            </FeatureCard>
          </motion.div>

          {/* QR Scanner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FeatureCard
              title="QR Scanner"
              description="Scan QR codes using device camera"
              status={isScanning ? "loading" : "available"}
              onTest={handleQRScan}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
              }
            >
              {qrResult && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <strong>Last scan:</strong> {qrResult}
                  </p>
                </div>
              )}
            </FeatureCard>
          </motion.div>

          {/* Read Clipboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FeatureCard
              title="Read Clipboard"
              description="Read text from device clipboard"
              status={clipboardLoading ? "loading" : "available"}
              onTest={handleReadClipboard}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              }
            >
              {clipboardText && (
                <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    <strong>Clipboard:</strong> {clipboardText}
                  </p>
                </div>
              )}
            </FeatureCard>
          </motion.div>

          {/* Write Clipboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <FeatureCard
              title="Write Clipboard"
              description="Write text to device clipboard"
              status={writeClipboardLoading ? "loading" : "available"}
              onTest={handleWriteClipboard}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              }
            />
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <FeatureCard
              title="Location"
              description="Get device location coordinates"
              status={locationLoading ? "loading" : "available"}
              onTest={handleLocation}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
            >
              {location && (
                <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    <strong>Lat:</strong> {location.latitude.toFixed(6)}
                    <br />
                    <strong>Lng:</strong> {location.longitude.toFixed(6)}
                  </p>
                </div>
              )}
            </FeatureCard>
          </motion.div>

          {/* Fullscreen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <FeatureCard
              title="Fullscreen"
              description="Toggle fullscreen mode"
              status="available"
              onTest={handleFullscreen}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              }
            >
              <Badge variant={isFullscreen ? "success" : "default"} className="mt-3">
                {isFullscreen ? "🔳 Fullscreen Active" : "🔲 Normal Mode"}
              </Badge>
            </FeatureCard>
          </motion.div>

          {/* Orientation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <FeatureCard
              title="Orientation Lock"
              description="Lock device orientation"
              status="available"
              onTest={handleOrientation}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              }
            >
              <div className="mt-3 space-y-2">
                <Badge variant={isLocked ? "warning" : "default"}>{isLocked ? "🔒 Locked" : "🔓 Unlocked"}</Badge>
                <Badge variant="info">📱 {orientation}</Badge>
              </div>
            </FeatureCard>
          </motion.div>

          {/* Home Screen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <FeatureCard
              title="Add to Home Screen"
              description="Add app to device home screen"
              status="available"
              onTest={handleHomeScreen}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0H8v0z"
                  />
                </svg>
              }
            >
              <Badge variant="info" className="mt-3">
                📲 Status: {homeScreenStatus}
              </Badge>
            </FeatureCard>
          </motion.div>

          {/* Story Sharing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <FeatureCard
              title="Share to Story"
              description="Share content to Telegram Stories"
              status="available"
              onTest={handleStoryShare}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              }
            />
          </motion.div>
        </div>

        {/* Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="grid gap-4 md:grid-cols-2"
        >
          <Card
            onClick={() => {
              haptic.impactLight()
              navigate("/sensors")
            }}
            className="cursor-pointer bg-gradient-to-r from-green-500 to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <div className="font-semibold text-lg">Motion Sensors</div>
                  <div className="text-green-100 text-sm">Gyroscope, Accelerometer, Orientation</div>
                </div>
                <svg className="w-6 h-6 text-white/80 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card
            onClick={() => {
              haptic.impactLight()
              navigate("/documentation")
            }}
            className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <div className="font-semibold text-lg">API Documentation</div>
                  <div className="text-orange-100 text-sm">Complete method reference</div>
                </div>
                <svg className="w-6 h-6 text-white/80 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import { useState, useCallback } from "react"

export const useWriteClipboard = () => {
  const [loading, setLoading] = useState(false)

  const writeText = useCallback(async (text: string): Promise<boolean> => {
  
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      console.log("Clipboard write API not available")

      
      try {
        return await fallbackCopyText(text)
      } catch (error) {
        console.error("Fallback copy failed:", error)
        return false
      }
    }

    if (!text || text.trim() === "") {
      console.log("No text provided to write to clipboard")
      return false
    }

    setLoading(true)
    try {
      await navigator.clipboard.writeText(text)
      console.log("Clipboard write successful")
      setLoading(false)
      return true
    } catch (error) {
      console.error("Error writing to clipboard:", error)
      setLoading(false)

      
      try {
        const success = await fallbackCopyText(text)
        return success
      } catch (fallbackError) {
        console.error("Fallback copy failed:", fallbackError)
        return false
      }
    }
  }, [])


  const fallbackCopyText = async (text: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        const successful = document.execCommand("copy")
        document.body.removeChild(textArea)
        console.log("Fallback copy result:", successful ? "success" : "failed")
        resolve(successful)
      } catch (err) {
        document.body.removeChild(textArea)
        console.error("Fallback copy error:", err)
        resolve(false)
      }
    })
  }

  const isAvailable = !!(navigator.clipboard && navigator.clipboard.writeText) || !!document.execCommand

  return {
    writeText,
    loading,
    isAvailable,
  }
}

"use client"

import { useState, useCallback } from "react"

export const useClipboard = () => {
  const [loading, setLoading] = useState(false)

  const readText = useCallback(async (useFallback = true): Promise<string | null> => {
    
    if (navigator.clipboard && navigator.clipboard.readText) {
      setLoading(true)
      try {
        const text = await navigator.clipboard.readText()
        console.log("Clipboard read result:", text ? "text found" : "no text")
        setLoading(false)
        return text || null
      } catch (error) {
        console.error("Error reading clipboard:", error)
        
        if (error instanceof Error) {
          if (error.name === "NotAllowedError") {
            console.log("Clipboard read permission denied")
          } else if (error.name === "NotFoundError") {
            console.log("No text found in clipboard")
          }
        }
        
        
        if (useFallback) {
          return useFallbackMethod()
        }
        
        setLoading(false)
        return null
      }
    } 
    
    
    if (useFallback) {
      console.log("Clipboard API not available, using fallback")
      return useFallbackMethod()
    }
    
    console.log("Clipboard read API not available")
    return null
  }, [])
  
  
  const useFallbackMethod = useCallback((): string | null => {
    setLoading(true)
    try {
      
      const result = prompt("Please paste text from clipboard:")
      setLoading(false)
      return result || null
    } catch (error) {
      console.error("Error with fallback clipboard method:", error)
      setLoading(false)
      return null
    }
  }, [])

  
  const isAvailable = !!(
    (navigator.clipboard && navigator.clipboard.readText) || 
    typeof prompt === 'function'
  )

  return {
    readText,
    loading,
    isAvailable,
  }
}

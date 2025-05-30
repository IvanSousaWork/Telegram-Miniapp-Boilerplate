"use client"

import { useState, useCallback } from "react"
import { useTelegram } from "./useTelegram"

/**
 * hook for Telegram WebApp Cloud Storage
 */
export const useCloudStorage = () => {
  const { webApp } = useTelegram()
  const [loading, setLoading] = useState(false)

  const setItem = useCallback(
    async (key: string, value: string): Promise<boolean> => {
      if (!webApp?.CloudStorage) return false

      setLoading(true)
      return new Promise((resolve) => {
        webApp.CloudStorage.setItem(key, value, (error) => {
          setLoading(false)
          resolve(!error)
        })
      })
    },
    [webApp],
  )

  const getItem = useCallback(
    async (key: string): Promise<string | null> => {
      if (!webApp?.CloudStorage) return null

      setLoading(true)
      return new Promise((resolve) => {
        webApp.CloudStorage.getItem(key, (error, value) => {
          setLoading(false)
          resolve(error ? null : value || null)
        })
      })
    },
    [webApp],
  )

  const getItems = useCallback(
    async (keys: string[]): Promise<Record<string, string> | null> => {
      if (!webApp?.CloudStorage) return null

      setLoading(true)
      return new Promise((resolve) => {
        webApp.CloudStorage.getItems(keys, (error, values) => {
          setLoading(false)
          resolve(error ? null : values || null)
        })
      })
    },
    [webApp],
  )

  const removeItem = useCallback(
    async (key: string): Promise<boolean> => {
      if (!webApp?.CloudStorage) return false

      setLoading(true)
      return new Promise((resolve) => {
        webApp.CloudStorage.removeItem(key, (error) => {
          setLoading(false)
          resolve(!error)
        })
      })
    },
    [webApp],
  )

  const getKeys = useCallback(async (): Promise<string[] | null> => {
    if (!webApp?.CloudStorage) return null

    setLoading(true)
    return new Promise((resolve) => {
      webApp.CloudStorage.getKeys((error, keys) => {
        setLoading(false)
        resolve(error ? null : keys || null)
      })
    })
  }, [webApp])

  return {
    setItem,
    getItem,
    getItems,
    removeItem,
    getKeys,
    loading,
  }
}

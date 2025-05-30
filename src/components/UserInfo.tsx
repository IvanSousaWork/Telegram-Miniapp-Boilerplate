import type React from "react"
import { useTelegram } from "@/hooks/useTelegram"

/**
 * component to display Telegram user information with premium indicator
 */
export const UserInfo: React.FC = () => {
  const { user, isReady } = useTelegram()

  if (!isReady) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-4 animate-pulse">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-32" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-24" />
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-2">👤</div>
          <p>No user data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center space-x-4">
        <div className="relative">
          {user.photo_url ? (
            <img
              src={user.photo_url || "/placeholder.svg"}
              alt="User avatar"
              className="w-16 h-16 rounded-full border-2 border-blue-200 dark:border-blue-600"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
              {user.first_name?.charAt(0) || "?"}
            </div>
          )}
          {user.is_premium && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">⭐</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {user.is_premium && <span className="text-lg">⭐</span>}
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
              {user.first_name} {user.last_name}
            </h3>
          </div>
          {user.username && <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">@{user.username}</p>}
          <div className="flex items-center gap-3 mt-2">
            {user.is_premium && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-orange-300 border border-yellow-200 dark:border-yellow-800">
                ⭐ Premium
              </span>
            )}
            {user.language_code && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                🌐 {user.language_code.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

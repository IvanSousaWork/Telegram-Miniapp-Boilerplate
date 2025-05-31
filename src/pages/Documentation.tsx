"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { BackButton } from "@/components/BackButton"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"
import { useTelegram } from "@/hooks/useTelegram"
import { motion, AnimatePresence } from "framer-motion"

interface MethodInfo {
  name: string
  description: string
  parameters?: string
  returnType?: string
  example: string
  version: string
  category: string
}

const methods: MethodInfo[] = [
  {
    name: "ready()",
    description: "Notifies the Telegram app that the Mini App is ready to be displayed",
    returnType: "void",
    example: "webApp.ready()",
    version: "6.0",
    category: "Initialization",
  },
  {
    name: "expand()",
    description: "Expands the Mini App to the maximum available height",
    returnType: "void",
    example: "webApp.expand()",
    version: "6.0",
    category: "UI Control",
  },
  {
    name: "close()",
    description: "Closes the Mini App",
    returnType: "void",
    example: "webApp.close()",
    version: "6.0",
    category: "UI Control",
  },
  {
    name: "sendData(data)",
    description: "Sends data to the bot",
    parameters: "data: string",
    returnType: "void",
    example: 'webApp.sendData(JSON.stringify({action: "button_clicked"}))',
    version: "6.0",
    category: "Communication",
  },
  {
    name: "showAlert(message)",
    description: "Shows a native alert with the given message",
    parameters: "message: string, callback?: () => void",
    returnType: "void",
    example: 'webApp.showAlert("Hello World!")',
    version: "6.2",
    category: "UI Feedback",
  },
  {
    name: "showConfirm(message)",
    description: "Shows a native confirm dialog",
    parameters: "message: string, callback?: (confirmed: boolean) => void",
    returnType: "void",
    example: 'webApp.showConfirm("Are you sure?")',
    version: "6.2",
    category: "UI Feedback",
  },
  {
    name: "showPopup(params)",
    description: "Shows a popup with custom buttons",
    parameters: "params: PopupParams, callback?: (button_id?: string) => void",
    returnType: "void",
    example: "webApp.showPopup({title: 'Title', message: 'Message', buttons: [...]})",
    version: "6.2",
    category: "UI Feedback",
  },
  {
    name: "showScanQrPopup(params)",
    description: "Shows QR code scanner",
    parameters: "params: ScanQrPopupParams, callback?: (text: string) => void",
    returnType: "void",
    example: 'webApp.showScanQrPopup({text: "Scan QR code"})',
    version: "6.4",
    category: "Device Features",
  },
  {
    name: "readTextFromClipboard()",
    description: "Reads text from the clipboard",
    parameters: "callback?: (text: string) => void",
    returnType: "void",
    example: "webApp.readTextFromClipboard((text) => console.log(text))",
    version: "6.4",
    category: "Device Features",
  },
  {
    name: "writeTextToClipboard(text)",
    description: "Writes text to the clipboard",
    parameters: "text: string, callback?: (success: boolean) => void",
    returnType: "void",
    example: 'webApp.writeTextToClipboard("Hello World!")',
    version: "6.9",
    category: "Device Features",
  },
  {
    name: "requestLocation()",
    description: "Requests user's location",
    parameters: "callback?: (location: LocationData) => void",
    returnType: "void",
    example: "webApp.requestLocation((location) => console.log(location))",
    version: "6.9",
    category: "Device Features",
  },
  {
    name: "requestFullscreen()",
    description: "Requests fullscreen mode",
    returnType: "void",
    example: "webApp.requestFullscreen()",
    version: "8.0",
    category: "UI Control",
  },
  {
    name: "exitFullscreen()",
    description: "Exits fullscreen mode",
    returnType: "void",
    example: "webApp.exitFullscreen()",
    version: "8.0",
    category: "UI Control",
  },
  {
    name: "lockOrientation()",
    description: "Locks the device orientation",
    returnType: "void",
    example: "webApp.lockOrientation()",
    version: "8.0",
    category: "Device Features",
  },
  {
    name: "addToHomeScreen()",
    description: "Prompts user to add the Mini App to home screen",
    returnType: "void",
    example: "webApp.addToHomeScreen()",
    version: "8.0",
    category: "Installation",
  },
  {
    name: "shareToStory(media_url)",
    description: "Shares media to Telegram Stories",
    parameters: "media_url: string, params?: ShareStoryParams",
    returnType: "void",
    example: 'webApp.shareToStory("https://example.com/image.jpg")',
    version: "8.0",
    category: "Social",
  },
]

const categories = [
  "All",
  "Initialization",
  "UI Control",
  "Communication",
  "UI Feedback",
  "Device Features",
  "Installation",
  "Social",
]

const categoryIcons = {
  All: "📚",
  Initialization: "🚀",
  "UI Control": "🎛️",
  Communication: "💬",
  "UI Feedback": "🔔",
  "Device Features": "📱",
  Installation: "📲",
  Social: "🌐",
}

// skeleton loading component
const MethodSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full animate-pulse" />
      </div>
      <div className="flex gap-2 ml-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16 animate-pulse" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-12 animate-pulse" />
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
      <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
    </div>
  </motion.div>
)


export const Documentation: React.FC = () => {
  const navigate = useNavigate()
  const { webApp, version } = useTelegram()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const filteredMethods = methods.filter((method) => {
    const matchesCategory = selectedCategory === "All" || method.category === selectedCategory
    const matchesSearch =
      method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const isMethodAvailable = (methodVersion: string) => {
    if (!webApp || !version) return false
    return webApp.isVersionAtLeast(methodVersion)
  }

  const getCategoryCount = (category: string) => {
    if (category === "All") return methods.length
    return methods.filter((method) => method.category === category).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <BackButton onBack={() => navigate("/")} />

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-3 bg-blue-500 text-white px-6 py-3 rounded-2xl shadow-lg">
            <span className="text-2xl">📚</span>
            <h1 className="text-2xl md:text-3xl font-bold">Telegram WebApp API</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Complete reference for all Telegram Mini App methods and features with real-time examples
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {version && (
              <Badge variant="success" className="text-sm px-4 py-2">
                🚀 Version {version}
              </Badge>
            )}
            <Badge variant="info" className="text-sm px-4 py-2">
              📱 {methods.length} Methods
            </Badge>
            <Badge variant="info" className="text-sm px-4 py-2">
              🏷️ {categories.length - 1} Categories
            </Badge>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search methods, descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 text-lg"
                />
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Filter by Category
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
                  {categories.map((category) => (
                    <motion.div key={category} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant={selectedCategory === category ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full h-auto py-3 px-3 rounded-xl transition-all duration-200 ${
                          selectedCategory === category
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                            : "hover:bg-blue-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                          <span className="text-xs font-medium">{category}</span>
                          <span className="text-xs opacity-75">({getCategoryCount(category)})</span>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400"
        >
          <span>
            Showing {filteredMethods.length} of {methods.length} methods
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </span>
          {filteredMethods.length > 0 && (
            <span className="text-blue-600 dark:text-blue-400">
              {filteredMethods.filter((m) => isMethodAvailable(m.version)).length} available in your version
            </span>
          )}
        </motion.div>

        {/* Methods List */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <MethodSkeleton key={index} />
                ))}
              </motion.div>
            ) : filteredMethods.length > 0 ? (
              <motion.div
                key="methods"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredMethods.map((method, index) => (
                  <motion.div
                    key={method.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -2 }}
                    className="group"
                  >
                    <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="font-mono text-lg text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                              {method.name}
                            </CardTitle>
                            <CardDescription className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                              {method.description}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2 ml-4 flex-shrink-0">
                            <Badge
                              variant="info"
                              className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0"
                            >
                              {method.category}
                            </Badge>
                            <Badge
                              variant={isMethodAvailable(method.version) ? "success" : "warning"}
                              className={`border-0 ${
                                isMethodAvailable(method.version)
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                              }`}
                            >
                              v{method.version}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {method.parameters && (
                          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wide">
                              Parameters
                            </h4>
                            <code className="text-sm bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 block">
                              {method.parameters}
                            </code>
                          </div>
                        )}

                        {method.returnType && (
                          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wide">
                              Returns
                            </h4>
                            <code className="text-sm bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 block">
                              {method.returnType}
                            </code>
                          </div>
                        )}

                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wide">
                            Example Usage
                          </h4>
                          <pre className="text-sm bg-gray-900 dark:bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-600">
                            <code>{method.example}</code>
                          </pre>
                        </div>

                        {!isMethodAvailable(method.version) && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-yellow-600 dark:text-yellow-400 text-xl">⚠️</span>
                              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                <strong>Version Requirement:</strong> This method requires Telegram version{" "}
                                {method.version} or higher. Your current version is {version || "unknown"}.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm rounded-2xl">
                  <CardContent className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No methods found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      Try adjusting your search criteria or selecting a different category.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory("All")
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 py-3"
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center py-8"
        >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-2">🚀 Ready to build amazing Mini Apps?</h3>
            <p className="text-blue-100 mb-4">
              Explore all features and start implementing them in your Telegram Mini App
            </p>
            <Button
              onClick={() => navigate("/features")}
              className="!bg-white !text-blue-600 hover:!bg-gray-100 rounded-xl px-6 py-3 font-semibold"
            >
              Try Live Examples &rarr;
            </Button>
            </div>
        </motion.div>
      </div>
    </div>
  )
}

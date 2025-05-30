/**
 * Telegram WebApp TypeScript definitions
 * Based on official documentation: https://core.telegram.org/bots/webapps
 * Updated with latest features including Gyroscope, Accelerometer, and more
 */

interface TelegramWebApp {
  // Basic properties
  initData: string
  initDataUnsafe: WebAppInitData
  version: string
  platform: string
  colorScheme: "light" | "dark"
  themeParams: ThemeParams
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  headerColor: string
  backgroundColor: string
  bottomBarColor: string
  isClosingConfirmationEnabled: boolean
  isVerticalSwipesEnabled: boolean
  isFullscreen: boolean
  orientation: "portrait" | "landscape"
  safeAreaInset: SafeAreaInset

  // User and chat info
  WebAppUser?: WebAppUser
  WebAppChat?: WebAppChat

  // UI Elements
  BackButton: BackButton
  MainButton: MainButton
  SecondaryButton: SecondaryButton
  SettingsButton: SettingsButton
  BottomButton: BottomButton

  // Features
  HapticFeedback: HapticFeedback
  CloudStorage: CloudStorage
  BiometricManager: BiometricManager
  LocationManager: LocationManager
  Gyroscope: Gyroscope
  Accelerometer: Accelerometer
  DeviceOrientation: DeviceOrientation

  // Methods
  isVersionAtLeast(version: string): boolean
  setHeaderColor(color: string): void
  setBackgroundColor(color: string): void
  setBottomBarColor(color: string): void
  enableClosingConfirmation(): void
  disableClosingConfirmation(): void
  enableVerticalSwipes(): void
  disableVerticalSwipes(): void
  requestFullscreen(): void
  exitFullscreen(): void
  lockOrientation(): void
  unlockOrientation(): void
  addToHomeScreen(): void
  checkHomeScreenStatus(callback: (status: HomeScreenStatus) => void): void
  shareToStory(media_url: string, params?: ShareStoryParams): void
  onEvent(eventType: string, eventHandler: (...args: any[]) => void): void
  offEvent(eventType: string, eventHandler: (...args: any[]) => void): void
  sendData(data: string): void
  switchInlineQuery(query: string, choose_chat_types?: string[]): void
  openLink(url: string, options?: { try_instant_view?: boolean }): void
  openTelegramLink(url: string): void
  openInvoice(url: string, callback?: (status: InvoiceStatus) => void): void
  showPopup(params: PopupParams, callback?: (button_id?: string) => void): void
  showAlert(message: string, callback?: () => void): void
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void
  showScanQrPopup(params: ScanQrPopupParams, callback?: (text: string) => void): void
  closeScanQrPopup(): void
  readTextFromClipboard(callback?: (text: string) => void): void
  writeTextToClipboard(text: string, callback?: (success: boolean) => void): void
  requestWriteAccess(callback?: (granted: boolean) => void): void
  requestContact(callback?: (granted: boolean) => void): void
  requestLocation(callback?: (location: LocationData) => void): void
  ready(): void
  expand(): void
  close(): void
}

interface WebAppInitData {
  query_id?: string
  user?: WebAppUser
  receiver?: WebAppUser
  chat?: WebAppChat
  chat_type?: string
  chat_instance?: string
  start_param?: string
  can_send_after?: number
  auth_date: number
  hash: string
}

interface WebAppUser {
  id: number
  is_bot?: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  added_to_attachment_menu?: boolean
  allows_write_to_pm?: boolean
  photo_url?: string
}

interface WebAppChat {
  id: number
  type: "group" | "supergroup" | "channel"
  title: string
  username?: string
  photo_url?: string
}

interface ThemeParams {
  bg_color?: string
  text_color?: string
  hint_color?: string
  link_color?: string
  button_color?: string
  button_text_color?: string
  secondary_bg_color?: string
  header_bg_color?: string
  accent_text_color?: string
  section_bg_color?: string
  section_header_text_color?: string
  subtitle_text_color?: string
  destructive_text_color?: string
  section_separator_color?: string
  bottom_bar_bg_color?: string
}

interface SafeAreaInset {
  top: number
  bottom: number
  left: number
  right: number
}

interface BackButton {
  isVisible: boolean
  onClick(callback: () => void): void
  offClick(callback: () => void): void
  show(): void
  hide(): void
}

interface MainButton {
  text: string
  color: string
  textColor: string
  isVisible: boolean
  isProgressVisible: boolean
  isActive: boolean
  setText(text: string): void
  onClick(callback: () => void): void
  offClick(callback: () => void): void
  show(): void
  hide(): void
  enable(): void
  disable(): void
  showProgress(leaveActive?: boolean): void
  hideProgress(): void
  setParams(params: MainButtonParams): void
}

interface SecondaryButton {
  text: string
  color: string
  textColor: string
  isVisible: boolean
  isProgressVisible: boolean
  isActive: boolean
  position: "left" | "right" | "top" | "bottom"
  setText(text: string): void
  onClick(callback: () => void): void
  offClick(callback: () => void): void
  show(): void
  hide(): void
  enable(): void
  disable(): void
  showProgress(leaveActive?: boolean): void
  hideProgress(): void
  setParams(params: SecondaryButtonParams): void
}

interface SettingsButton {
  isVisible: boolean
  onClick(callback: () => void): void
  offClick(callback: () => void): void
  show(): void
  hide(): void
}

interface BottomButton {
  text: string
  color: string
  textColor: string
  isVisible: boolean
  isProgressVisible: boolean
  isActive: boolean
  setText(text: string): void
  onClick(callback: () => void): void
  offClick(callback: () => void): void
  show(): void
  hide(): void
  enable(): void
  disable(): void
  showProgress(leaveActive?: boolean): void
  hideProgress(): void
  setParams(params: BottomButtonParams): void
}

interface MainButtonParams {
  text?: string
  color?: string
  text_color?: string
  is_active?: boolean
  is_visible?: boolean
}

interface SecondaryButtonParams {
  text?: string
  color?: string
  text_color?: string
  is_active?: boolean
  is_visible?: boolean
  position?: "left" | "right" | "top" | "bottom"
}

interface BottomButtonParams {
  text?: string
  color?: string
  text_color?: string
  is_active?: boolean
  is_visible?: boolean
}

interface HapticFeedback {
  impactOccurred(style: "light" | "medium" | "heavy" | "rigid" | "soft"): void
  notificationOccurred(type: "error" | "success" | "warning"): void
  selectionChanged(): void
}

interface CloudStorage {
  setItem(key: string, value: string, callback?: (error?: string) => void): void
  getItem(key: string, callback: (error?: string, value?: string) => void): void
  getItems(keys: string[], callback: (error?: string, values?: Record<string, string>) => void): void
  removeItem(key: string, callback?: (error?: string) => void): void
  removeItems(keys: string[], callback?: (error?: string) => void): void
  getKeys(callback: (error?: string, keys?: string[]) => void): void
}

interface BiometricManager {
  isInited: boolean
  isBiometricAvailable: boolean
  biometricType: "finger" | "face" | "unknown"
  isAccessRequested: boolean
  isAccessGranted: boolean
  isBiometricTokenSaved: boolean
  deviceId: string
  init(callback?: () => void): void
  requestAccess(params: BiometricRequestAccessParams, callback?: (granted: boolean) => void): void
  authenticate(params: BiometricAuthParams, callback?: (success: boolean, token?: string) => void): void
  updateBiometricToken(token: string, callback?: (updated: boolean) => void): void
  openSettings(): void
}

interface LocationManager {
  isInited: boolean
  isLocationAvailable: boolean
  isAccessRequested: boolean
  isAccessGranted: boolean
  init(callback?: () => void): void
  getLocation(callback: (location?: LocationData) => void): void
  openSettings(): void
}

interface Gyroscope {
  isStarted: boolean
  x: number
  y: number
  z: number
  start(params?: GyroscopeParams, callback?: (started: boolean) => void): void
  stop(callback?: () => void): void
}

interface Accelerometer {
  isStarted: boolean
  x: number
  y: number
  z: number
  start(params?: AccelerometerParams, callback?: (started: boolean) => void): void
  stop(callback?: () => void): void
}

interface DeviceOrientation {
  isStarted: boolean
  absolute: boolean
  alpha: number
  beta: number
  gamma: number
  start(params?: DeviceOrientationParams, callback?: (started: boolean) => void): void
  stop(callback?: () => void): void
}

interface LocationData {
  latitude: number
  longitude: number
  altitude?: number
  course?: number
  speed?: number
  horizontal_accuracy?: number
  vertical_accuracy?: number
}

interface GyroscopeParams {
  refresh_rate?: number
}

interface AccelerometerParams {
  refresh_rate?: number
}

interface DeviceOrientationParams {
  refresh_rate?: number
  need_absolute?: boolean
}

interface BiometricRequestAccessParams {
  reason?: string
}

interface BiometricAuthParams {
  reason?: string
}

interface PopupParams {
  title?: string
  message: string
  buttons?: PopupButton[]
}

interface PopupButton {
  id?: string
  type?: "default" | "ok" | "close" | "cancel" | "destructive"
  text?: string
}

interface ScanQrPopupParams {
  text?: string
}

interface ShareStoryParams {
  text?: string
  widget_link?: {
    url: string
    name?: string
  }
}

type InvoiceStatus = "paid" | "cancelled" | "failed" | "pending"
type HomeScreenStatus = "unsupported" | "unknown" | "added" | "missed"

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

export type {
  TelegramWebApp,
  WebAppInitData,
  WebAppUser,
  WebAppChat,
  ThemeParams,
  SafeAreaInset,
  BackButton,
  MainButton,
  SecondaryButton,
  SettingsButton,
  BottomButton,
  HapticFeedback,
  CloudStorage,
  BiometricManager,
  LocationManager,
  Gyroscope,
  Accelerometer,
  DeviceOrientation,
  LocationData,
  PopupParams,
  ScanQrPopupParams,
  ShareStoryParams,
  MainButtonParams,
  SecondaryButtonParams,
  BottomButtonParams,
  GyroscopeParams,
  AccelerometerParams,
  DeviceOrientationParams,
  InvoiceStatus,
  HomeScreenStatus,
}

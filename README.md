# 🚀 Telegram Mini Web App Boilerplate

<div align="center">

![Telegram WebApp](https://img.shields.io/badge/Telegram-WebApp-blue?style=for-the-badge&logo=telegram)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.0-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-06B6D4?style=for-the-badge&logo=tailwindcss)

**A comprehensive boilerplate for building Telegram Mini Web Apps with modern React stack**

[🎯 Features](#-features) • [🚀 Quick Start](#-quick-start) • [📚 Documentation](#-documentation) • [🛠️ API Reference](#️-api-reference) • [🌐 Deploy](#-deployment)

</div>

---

## 🎯 Features

### 🔥 **Core Technologies**
- ⚡ **Vite** - Lightning fast build tool and dev server
- ⚛️ **React 18** - Latest React with concurrent features
- 🎯 **TypeScript** - Full type safety and IntelliSense
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔗 **React Router** - Client-side routing
- 🔄 **React Query** - Powerful data fetching and caching

### 📱 **Telegram WebApp Integration**
- ✅ **Complete API Coverage** - All Telegram WebApp methods
- ✅ **Latest Features** - Gyroscope, Accelerometer, Device Orientation
- ✅ **Theme Integration** - Automatic light/dark mode
- ✅ **Haptic Feedback** - Rich tactile feedback
- ✅ **Cloud Storage** - Persistent data storage
- ✅ **Biometric Auth** - Fingerprint/Face recognition
- ✅ **QR Scanner** - Built-in QR code scanning
- ✅ **Location Services** - GPS location access
- ✅ **Clipboard Access** - Read/write clipboard
- ✅ **Fullscreen Mode** - Immersive experience
- ✅ **Story Sharing** - Share to Telegram Stories

### 🎨 **UI/UX Features**
- 🌙 **Dark/Light Mode** - Automatic theme switching
- 📱 **Responsive Design** - Works on all screen sizes
- 🎭 **Modern Components** - Beautiful, accessible UI components
- ⚡ **Smooth Animations** - Framer Motion powered
- 🎯 **Interactive Examples** - Live feature demonstrations

<div align="center">

## 🖥️ Live Demo

[![Open Demo](https://img.shields.io/badge/Open-Demo-green?style=for-the-badge&logo=telegram)](https://t.me/TMWA_BOT/Demo)

Try out the Telegram Mini Web App boilerplate live!  
Scan the QR code below or [open the demo link](https://t.me/TMWA_BOT/Demo) in your telegram.

![Demo QR Code](https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://t.me/TMWA_BOT/Demo)

</div>

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm/yarn/pnpm**
- **Telegram Bot** (create via [@BotFather](https://t.me/botfather))

### Installation

```bash
# Clone the repository
git clone https://github.com/vishal-1756/telegram-miniapp-boilerplate.git
cd telegram-miniapp-boilerplate

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit your environment variables
nano .env
```

```env
# API Configuration
VITE_API_BASE_URL=https://your-api-domain.com/api

# Bot Configuration  
VITE_BOT_USERNAME=your_bot_username

# Development
VITE_DEV_MODE=true
```

### Development

```bash
# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

### Telegram Bot Setup

1. **Create Bot**: Message [@BotFather](https://t.me/botfather) → `/newbot`
2. **Set WebApp**: `/newapp` → Select your bot → Enter app details
3. **Configure Domain**: Add your domain to bot settings
4. **Test**: Open your bot → Menu button → Your app

---

## 📚 Documentation

### 🏗️ Project Structure

```
src/
├── 📁 components/          # Reusable UI components
│   ├── ui/                 # Base UI components (Button, Card, etc.)
│   ├── TelegramProvider.tsx
│   ├── ThemeProvider.tsx
│   ├── BackButton.tsx
│   ├── MainButton.tsx
│   ├── HapticButton.tsx
│   ├── UserInfo.tsx
│   ├── FeatureCard.tsx
│   └── SensorDisplay.tsx
├── 📁 hooks/              # Custom React hooks
│   ├── useTelegram.ts      # Main Telegram integration
│   ├── useBackButton.ts    # Back button management
│   ├── useMainButton.ts    # Main button control
│   ├── useHapticFeedback.ts # Haptic feedback
│   ├── useCloudStorage.ts  # Cloud storage operations
│   ├── useBiometric.ts     # Biometric authentication
│   ├── useQRScanner.ts     # QR code scanning
│   ├── useClipboard.ts     # Clipboard read access
│   ├── useWriteClipboard.ts # Clipboard write access
│   ├── useLocation.ts      # Location services
│   ├── useGyroscope.ts     # Gyroscope sensor
│   ├── useAccelerometer.ts # Accelerometer sensor
│   ├── useDeviceOrientation.ts # Device orientation
│   ├── useFullscreen.ts    # Fullscreen mode
│   ├── useOrientation.ts   # Orientation lock
│   ├── useHomeScreen.ts    # Home screen installation
│   ├── useStorySharing.ts  # Story sharing
│   ├── usePopups.ts        # Alerts and popups
│   └── useTheme.ts         # Theme management
├── 📁 pages/              # Page components
│   ├── Home.tsx           # Main landing page
│   ├── Features.tsx       # Feature demonstrations
│   ├── Sensors.tsx        # Motion sensor testing
│   └── Documentation.tsx  # API documentation
├── 📁 types/              # TypeScript definitions
│   └── telegram.d.ts      # Complete Telegram WebApp types
├── 📁 utils/              # Utility functions
│   ├── telegram.ts        # Telegram helper functions
│   └── api.ts             # API client configuration
├── 📁 styles/             # CSS files
│   └── globals.css        # Global styles and animations
├── App.tsx                # Main app component
└── main.tsx              # Entry point
```

---

## 🛠️ API Reference

### 🎯 **Core Hooks**

#### `useTelegram()`
Main hook for Telegram WebApp integration.

```tsx
import { useTelegram } from '@/hooks/useTelegram'

function MyComponent() {
  const { webApp, user, isReady, platform, version } = useTelegram()
  
  if (!isReady) return <div>Loading...</div>
  
  return (
    <div>
      <h1>Hello, {user?.first_name}!</h1>
      <p>Platform: {platform}</p>
      <p>Version: {version}</p>
    </div>
  )
}
```

#### `useHapticFeedback()`
Provides haptic feedback functionality.

```tsx
import { useHapticFeedback } from '@/hooks/useHapticFeedback'

function HapticExample() {
  const haptic = useHapticFeedback()
  
  return (
    <div>
      <button onClick={() => haptic.impactLight()}>Light Impact</button>
      <button onClick={() => haptic.impactMedium()}>Medium Impact</button>
      <button onClick={() => haptic.impactHeavy()}>Heavy Impact</button>
      <button onClick={() => haptic.notificationSuccess()}>Success</button>
      <button onClick={() => haptic.notificationError()}>Error</button>
    </div>
  )
}
```

### 🎮 **UI Control Hooks**

#### `useMainButton()`
Manages the Telegram main button.

```tsx
import { useMainButton } from '@/hooks/useMainButton'

function MainButtonExample() {
  const { setText, show, hide, enable, disable } = useMainButton(
    "Continue", 
    () => console.log("Main button clicked!"),
    { color: '#007AFF', is_active: true }
  )
  
  return (
    <div>
      <button onClick={() => setText("New Text")}>Change Text</button>
      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
    </div>
  )
}
```

#### `useBackButton()`
Handles the back button functionality.

```tsx
import { useBackButton } from '@/hooks/useBackButton'
import { useNavigate } from 'react-router-dom'

function BackButtonExample() {
  const navigate = useNavigate()
  const { show, hide } = useBackButton(() => navigate(-1))
  
  return (
    <div>
      <button onClick={show}>Show Back Button</button>
      <button onClick={hide}>Hide Back Button</button>
    </div>
  )
}
```

### 💾 **Data & Storage Hooks**

#### `useCloudStorage()`
Telegram cloud storage operations.

```tsx
import { useCloudStorage } from '@/hooks/useCloudStorage'

function CloudStorageExample() {
  const { setItem, getItem, removeItem, getKeys, loading } = useCloudStorage()
  
  const saveData = async () => {
    await setItem('user_preference', 'dark_mode')
    console.log('Data saved!')
  }
  
  const loadData = async () => {
    const preference = await getItem('user_preference')
    console.log('User preference:', preference)
  }
  
  const getAllKeys = async () => {
    const keys = await getKeys()
    console.log('All keys:', keys)
  }
  
  return (
    <div>
      <button onClick={saveData} disabled={loading}>Save Data</button>
      <button onClick={loadData} disabled={loading}>Load Data</button>
      <button onClick={getAllKeys} disabled={loading}>Get All Keys</button>
    </div>
  )
}
```

### 🔐 **Security Hooks**

#### `useBiometric()`
Biometric authentication (fingerprint/face recognition).

```tsx
import { useBiometric } from '@/hooks/useBiometric'

function BiometricExample() {
  const { 
    requestAccess, 
    authenticate, 
    updateToken,
    isAvailable, 
    isAccessGranted,
    biometricType 
  } = useBiometric()
  
  const handleAuth = async () => {
    if (!isAvailable) {
      console.log('Biometric not available')
      return
    }
    
    const access = await requestAccess('Authentication required for secure access')
    if (access) {
      const result = await authenticate('Please authenticate to continue')
      if (result.success) {
        console.log('Authentication successful!', result.token)
      }
    }
  }
  
  return (
    <div>
      <p>Biometric Type: {biometricType}</p>
      <p>Available: {isAvailable ? 'Yes' : 'No'}</p>
      <p>Access Granted: {isAccessGranted ? 'Yes' : 'No'}</p>
      <button onClick={handleAuth}>Authenticate</button>
    </div>
  )
}
```

### 📱 **Device Feature Hooks**

#### `useQRScanner()`
QR code scanning functionality.

```tsx
import { useQRScanner } from '@/hooks/useQRScanner'

function QRScannerExample() {
  const { scanQR, closeScan, isScanning } = useQRScanner()
  
  const handleScan = async () => {
    const result = await scanQR('Scan any QR code')
    if (result) {
      console.log('Scanned:', result)
    }
  }
  
  return (
    <div>
      <button onClick={handleScan} disabled={isScanning}>
        {isScanning ? 'Scanning...' : 'Scan QR Code'}
      </button>
      {isScanning && (
        <button onClick={closeScan}>Cancel Scan</button>
      )}
    </div>
  )
}
```

#### `useLocation()`
GPS location services.

```tsx
import { useLocation } from '@/hooks/useLocation'

function LocationExample() {
  const { getLocation, requestLocation, location, loading } = useLocation()
  
  const handleGetLocation = async () => {
    const loc = await requestLocation()
    if (loc) {
      console.log(`Location: ${loc.latitude}, ${loc.longitude}`)
    }
  }
  
  return (
    <div>
      <button onClick={handleGetLocation} disabled={loading}>
        {loading ? 'Getting Location...' : 'Get Location'}
      </button>
      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          {location.altitude && <p>Altitude: {location.altitude}m</p>}
        </div>
      )}
    </div>
  )
}
```

### 📋 **Clipboard Hooks**

#### `useClipboard()` & `useWriteClipboard()`
Read and write clipboard operations.

```tsx
import { useClipboard } from '@/hooks/useClipboard'
import { useWriteClipboard } from '@/hooks/useWriteClipboard'

function ClipboardExample() {
  const { readText, loading: readLoading } = useClipboard()
  const { writeText, loading: writeLoading } = useWriteClipboard()
  
  const handleRead = async () => {
    const text = await readText()
    console.log('Clipboard content:', text)
  }
  
  const handleWrite = async () => {
    const success = await writeText('Hello from Telegram WebApp!')
    console.log('Write success:', success)
  }
  
  return (
    <div>
      <button onClick={handleRead} disabled={readLoading}>
        Read Clipboard
      </button>
      <button onClick={handleWrite} disabled={writeLoading}>
        Write to Clipboard
      </button>
    </div>
  )
}
```

### 🎯 **Motion Sensor Hooks**

#### `useGyroscope()`
Device rotation rate measurement.

```tsx
import { useGyroscope } from '@/hooks/useGyroscope'

function GyroscopeExample() {
  const { start, stop, data, isStarted, loading, isAvailable } = useGyroscope()
  
  const handleToggle = async () => {
    if (isStarted) {
      await stop()
    } else {
      await start({ refresh_rate: 100 })
    }
  }
  
  return (
    <div>
      <button onClick={handleToggle} disabled={!isAvailable || loading}>
        {isStarted ? 'Stop' : 'Start'} Gyroscope
      </button>
      {isStarted && (
        <div>
          <p>X: {data.x.toFixed(2)} rad/s</p>
          <p>Y: {data.y.toFixed(2)} rad/s</p>
          <p>Z: {data.z.toFixed(2)} rad/s</p>
        </div>
      )}
    </div>
  )
}
```

#### `useAccelerometer()`
Device acceleration measurement.

```tsx
import { useAccelerometer } from '@/hooks/useAccelerometer'

function AccelerometerExample() {
  const { start, stop, data, isStarted, loading, isAvailable } = useAccelerometer()
  
  const handleToggle = async () => {
    if (isStarted) {
      await stop()
    } else {
      await start({ refresh_rate: 100 })
    }
  }
  
  return (
    <div>
      <button onClick={handleToggle} disabled={!isAvailable || loading}>
        {isStarted ? 'Stop' : 'Start'} Accelerometer
      </button>
      {isStarted && (
        <div>
          <p>X: {data.x.toFixed(2)} m/s²</p>
          <p>Y: {data.y.toFixed(2)} m/s²</p>
          <p>Z: {data.z.toFixed(2)} m/s²</p>
        </div>
      )}
    </div>
  )
}
```

#### `useDeviceOrientation()`
Device orientation in 3D space.

```tsx
import { useDeviceOrientation } from '@/hooks/useDeviceOrientation'

function OrientationExample() {
  const { start, stop, data, isStarted, loading, isAvailable } = useDeviceOrientation()
  
  const handleToggle = async () => {
    if (isStarted) {
      await stop()
    } else {
      await start({ refresh_rate: 100, need_absolute: true })
    }
  }
  
  return (
    <div>
      <button onClick={handleToggle} disabled={!isAvailable || loading}>
        {isStarted ? 'Stop' : 'Start'} Orientation
      </button>
      {isStarted && (
        <div>
          <p>Alpha: {data.alpha.toFixed(1)}°</p>
          <p>Beta: {data.beta.toFixed(1)}°</p>
          <p>Gamma: {data.gamma.toFixed(1)}°</p>
          <p>Absolute: {data.absolute ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  )
}
```

### 🎨 **UI Enhancement Hooks**

#### `useFullscreen()`
Fullscreen mode control.

```tsx
import { useFullscreen } from '@/hooks/useFullscreen'

function FullscreenExample() {
  const { requestFullscreen, exitFullscreen, isFullscreen, isAvailable } = useFullscreen()
  
  const handleToggle = () => {
    if (isFullscreen) {
      exitFullscreen()
    } else {
      requestFullscreen()
    }
  }
  
  return (
    <div>
      <button onClick={handleToggle} disabled={!isAvailable}>
        {isFullscreen ? 'Exit' : 'Enter'} Fullscreen
      </button>
      <p>Status: {isFullscreen ? 'Fullscreen' : 'Normal'}</p>
    </div>
  )
}
```

#### `useOrientation()`
Device orientation lock.

```tsx
import { useOrientation } from '@/hooks/useOrientation'

function OrientationLockExample() {
  const { lockOrientation, unlockOrientation, orientation, isLocked, isAvailable } = useOrientation()
  
  const handleToggle = () => {
    if (isLocked) {
      unlockOrientation()
    } else {
      lockOrientation()
    }
  }
  
  return (
    <div>
      <button onClick={handleToggle} disabled={!isAvailable}>
        {isLocked ? 'Unlock' : 'Lock'} Orientation
      </button>
      <p>Current: {orientation}</p>
      <p>Status: {isLocked ? 'Locked' : 'Unlocked'}</p>
    </div>
  )
}
```

### 📱 **Installation & Sharing Hooks**

#### `useHomeScreen()`
Add app to device home screen.

```tsx
import { useHomeScreen } from '@/hooks/useHomeScreen'

function HomeScreenExample() {
  const { addToHomeScreen, checkStatus, status, loading, isAvailable } = useHomeScreen()
  
  const handleAdd = async () => {
    await checkStatus()
    if (status === 'missed') {
      addToHomeScreen()
    }
  }
  
  return (
    <div>
      <button onClick={handleAdd} disabled={!isAvailable || loading}>
        Add to Home Screen
      </button>
      <p>Status: {status}</p>
    </div>
  )
}
```

#### `useStorySharing()`
Share content to Telegram Stories.

```tsx
import { useStorySharing } from '@/hooks/useStorySharing'

function StoryExample() {
  const { shareToStory, isAvailable } = useStorySharing()
  
  const handleShare = () => {
    shareToStory('https://picsum.photos/400/600', {
      text: 'Check out this amazing app!',
      widget_link: {
        url: 'https://t.me/your_bot',
        name: 'Open App'
      }
    })
  }
  
  return (
    <button onClick={handleShare} disabled={!isAvailable}>
      Share to Story
    </button>
  )
}
```

### 💬 **Communication Hooks**

#### `usePopups()`
Native popup dialogs.

```tsx
import { usePopups } from '@/hooks/usePopups'

function PopupExample() {
  const { showAlert, showConfirm, showPopup } = usePopups()
  
  const handleAlert = () => {
    showAlert('This is an alert message!')
  }
  
  const handleConfirm = async () => {
    const confirmed = await showConfirm('Are you sure you want to continue?')
    console.log('User confirmed:', confirmed)
  }
  
  const handleCustomPopup = async () => {
    const result = await showPopup({
      title: 'Choose an option',
      message: 'What would you like to do?',
      buttons: [
        { id: 'option1', type: 'default', text: 'Option 1' },
        { id: 'option2', type: 'default', text: 'Option 2' },
        { id: 'cancel', type: 'cancel', text: 'Cancel' }
      ]
    })
    console.log('Selected option:', result)
  }
  
  return (
    <div>
      <button onClick={handleAlert}>Show Alert</button>
      <button onClick={handleConfirm}>Show Confirm</button>
      <button onClick={handleCustomPopup}>Show Custom Popup</button>
    </div>
  )
}
```

---

## 🎨 UI Components

### Basic Components

#### `<Button />`
Versatile button component with multiple variants.

```tsx
import { Button } from '@/components/ui/Button'

function ButtonExample() {
  return (
    <div className="space-x-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      
      <Button loading>Loading...</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}
```

#### `<Card />`
Flexible card component for content organization.

```tsx
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/Card'

function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content...</p>
      </CardContent>
    </Card>
  )
}
```

#### `<Badge />`
Status and category indicators.

```tsx
import { Badge } from '@/components/ui/Badge'

function BadgeExample() {
  return (
    <div className="space-x-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  )
}
```

### Specialized Components

#### `<HapticButton />`
Button with built-in haptic feedback.

```tsx
import { HapticButton } from '@/components/HapticButton'

function HapticButtonExample() {
  return (
    <div className="space-y-2">
      <HapticButton hapticType="light" onClick={() => console.log('Light haptic')}>
        Light Haptic
      </HapticButton>
      <HapticButton hapticType="medium" onClick={() => console.log('Medium haptic')}>
        Medium Haptic
      </HapticButton>
      <HapticButton hapticType="heavy" onClick={() => console.log('Heavy haptic')}>
        Heavy Haptic
      </HapticButton>
    </div>
  )
}
```

#### `<FeatureCard />`
Specialized card for feature demonstrations.

```tsx
import { FeatureCard } from '@/components/FeatureCard'

function FeatureCardExample() {
  return (
    <FeatureCard
      title="Cloud Storage"
      description="Store data in Telegram's cloud"
      status="available"
      onTest={() => console.log('Testing feature')}
      icon={<CloudIcon />}
    >
      <p>Additional content goes here...</p>
    </FeatureCard>
  )
}
```

#### `<UserInfo />`
Display Telegram user information.

```tsx
import { UserInfo } from '@/components/UserInfo'

function UserInfoExample() {
  return <UserInfo />
}
```

---

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add VITE_API_BASE_URL
   vercel env add VITE_BOT_USERNAME
   ```

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. **Or drag & drop** the `dist` folder to [Netlify](https://app.netlify.com)

### Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

### Deploy to Railway

1. **Connect GitHub repository** to [Railway](https://railway.app)
2. **Set environment variables** in Railway dashboard
3. **Deploy automatically** on git push

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | No | `/api` |
| `VITE_BOT_USERNAME` | Telegram bot username | No | - |
| `VITE_DEV_MODE` | Development mode flag | No | `false` |

### Telegram Bot Configuration

1. **Create Bot**
   ```
   /newbot → Follow instructions
   ```

2. **Set Menu Button**
   ```
   /setmenubutton → Select bot → Send web app URL
   ```

3. **Configure Domain**
   ```
   /setdomain → Select bot → Add your domain
   ```

4. **Set Commands** (Optional)
   ```
   /setcommands → Select bot → Add commands:
   start - Start the bot
   help - Get help
   app - Open Mini App
   ```

---

## 🧪 Testing

### Development Testing

```bash
# Start development server
npm run dev

# Test in browser
open http://localhost:3000
```

### Telegram Testing

1. **Use ngrok for local testing**
   ```bash
   npm install -g ngrok
   ngrok http 3000
   ```

2. **Update bot WebApp URL** with ngrok URL

3. **Test in Telegram**
   - Open your bot
   - Click menu button
   - Test all features

### Production Testing

1. **Deploy to staging environment**
2. **Update bot with staging URL**
3. **Test all features thoroughly**
4. **Deploy to production**

---

## 🔒 Security Best Practices

### 1. **Validate Init Data**

```typescript
// Backend validation example
import crypto from 'crypto'

function validateTelegramWebAppData(initData: string, botToken: string): boolean {
  const urlParams = new URLSearchParams(initData)
  const hash = urlParams.get('hash')
  urlParams.delete('hash')
  
  const dataCheckString = Array.from(urlParams.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')
  
  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest()
  const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex')
  
  return calculatedHash === hash
}
```

### 2. **Sanitize User Input**

```typescript
import DOMPurify from 'dompurify'

function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input)
}
```

### 3. **Rate Limiting**

```typescript
// Example rate limiting middleware
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use('/api/', limiter)
```

### 4. **HTTPS Only**

```typescript
// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`)
  } else {
    next()
  }
})
```

---

## 🐛 Troubleshooting

### Common Issues

#### **1. WebApp not loading in Telegram**

```bash
# Check console for errors
# Ensure HTTPS is enabled
# Verify bot configuration
# Check domain whitelist
```

#### **2. Features not working**

```typescript
// Check Telegram version
const { webApp } = useTelegram()
if (webApp?.isVersionAtLeast('6.4')) {
  // Feature available
} else {
  // Feature not supported
}
```

#### **3. Theme not applying**

```typescript
// Ensure ThemeProvider is wrapping your app
<TelegramProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</TelegramProvider>
```

#### **4. Haptic feedback not working**

```typescript
// Check if running in Telegram
import { isTelegramWebApp } from '@/utils/telegram'

if (isTelegramWebApp()) {
  haptic.impactMedium()
} else {
  console.log('Haptic feedback only works in Telegram')
}
```

### Debug Mode

```typescript
// Enable debug logging
localStorage.setItem('telegram-debug', 'true')

// Check WebApp availability
console.log('Telegram WebApp:', window.Telegram?.WebApp)
console.log('User:', window.Telegram?.WebApp?.initDataUnsafe?.user)
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### 1. **Fork & Clone**

```bash
git clone https://github.com/vishal-1756/telegram-miniapp-boilerplate.git
cd telegram-miniapp-boilerplate
```

### 2. **Create Feature Branch**

```bash
git checkout -b feature/amazing-feature
```

### 3. **Make Changes**

- Follow existing code style
- Add TypeScript types
- Include tests if applicable
- Update documentation

### 4. **Commit Changes**

```bash
git commit -m "feat: add amazing feature"
```

### 5. **Push & Create PR**

```bash
git push origin feature/amazing-feature
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Follow provided configuration
- **Prettier**: Auto-formatting enabled
- **Naming**: Use camelCase for variables, PascalCase for components

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support & Resources

### 📚 **Documentation**
- [Telegram WebApp API](https://core.telegram.org/bots/webapps)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### 💬 **Community**
- [Telegram WebApp Developers](https://t.me/webappchat)
- [GitHub Discussions](https://github.com/vishal-1756/telegram-miniapp-boilerplate/discussions)
- [Telegram Support](https://t.me/DevsLab)

### 🐛 **Issues**
- [Report Bug](https://github.com/vishal-1756/telegram-miniapp-boilerplate/issues/new?template=bug_report.md)
- [Request Feature](https://github.com/vishal-1756/telegram-miniapp-boilerplate/issues/new?template=feature_request.md)

### 📧 **Contact**
- Email: kora3244@gmail.com
- Telegram: [@Darkee0_0](https://t.me/Darkee0_0)

---


### ✅ **Completed**
- [x] Complete Telegram WebApp API coverage
- [x] Motion sensors integration
- [x] Modern UI components
- [x] TypeScript definitions
- [x] Comprehensive documentation

---

## ⭐ **Show Your Support**

If this project helped you, please consider:

- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs and issues
- 💡 **Suggesting** new features
- 🤝 **Contributing** to the codebase
- 📢 **Sharing** with the community

---

<div align="center">

**Built with ❤️ for the Telegram Mini App ecosystem**

[⬆ Back to Top](#-telegram-mini-web-app-boilerplate)

</div>

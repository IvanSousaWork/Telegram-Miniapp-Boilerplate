import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TelegramProvider } from "@/components/TelegramProvider"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Home } from "@/pages/Home"
import { Features } from "@/pages/Features"
import { Sensors } from "@/pages/Sensors"
import { Documentation } from "@/pages/Documentation"


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

/**
 * Main App component with all providers and routing
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TelegramProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/sensors" element={<Sensors />} />
              <Route path="/documentation" element={<Documentation />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </TelegramProvider>
    </QueryClientProvider>
  )
}

export default App

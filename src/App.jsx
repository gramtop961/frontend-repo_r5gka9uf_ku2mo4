import { useState } from 'react'
import { AuthProvider, useAuth } from './components/AuthContext'
import { LoginView, SignupView } from './components/AuthViews'
import Dashboard from './components/Dashboard'
import ListingExplorer from './components/ListingExplorer'
import Landing from './components/Landing'
import { motion, AnimatePresence } from 'framer-motion'

function Shell() {
  const { user } = useAuth()
  const [mode, setMode] = useState(null) // 'login' | 'signup' | null

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <Landing onLogin={() => setMode('login')} onSignup={() => setMode('signup')} />

        {/* Auth modal over the landing */}
        <AnimatePresence>
          {mode && (
            <motion.div
              key="auth-modal"
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMode(null)}
              />
              <motion.div
                className="relative z-10 w-full max-w-md px-4"
                initial={{ y: 30, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 240, damping: 24 }}
              >
                <div className="absolute -top-10 right-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setMode(null)}
                    className="rounded-full bg-white/10 border border-white/20 text-white px-3 py-1"
                  >
                    Close
                  </motion.button>
                </div>
                {mode === 'login' ? <LoginView /> : <SignupView />}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6">
      <motion.div
        className="max-w-6xl mx-auto space-y-6"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}>
          <Dashboard />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}>
          <ListingExplorer />
        </motion.div>
      </motion.div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  )
}

export default App

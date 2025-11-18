import { useState } from 'react'
import { AuthProvider, useAuth } from './components/AuthContext'
import { LoginView, SignupView } from './components/AuthViews'
import Dashboard from './components/Dashboard'
import ListingExplorer from './components/ListingExplorer'
import { motion, AnimatePresence } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] } })
}

function Shell() {
  const { user } = useAuth()
  const [mode, setMode] = useState('login')

  if (!user) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-900 to-slate-900">
        {/* animated background orbs */}
        <motion.div
          className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 -right-12 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], x: [0, -30, 0], y: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.2),transparent_40%),radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.15),transparent_40%)]" />
        <div className="relative min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
              >
                Agricompass
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-white/80 mb-6"
              >
                A trusted B2B marketplace connecting farmers with buyers and field officers. Create an account to start listing produce or sourcing supplies.
              </motion.p>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{}}
                className="space-y-2 text-white/80"
              >
                {[
                  'Role-based access for farmers, buyers, and officers',
                  'Browse live produce listings with filters',
                  'Place and track orders',
                  'Simple messaging for coordination'
                ].map((t, i) => (
                  <motion.li key={t} custom={i} variants={fadeInUp} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    {t}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <div>
              <div className="flex gap-2 mb-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -1 }}
                  onClick={()=>setMode('login')}
                  className={`px-4 py-2 rounded ${mode==='login'?'bg-white text-black':'bg-white/10 text-white border border-white/20'}`}
                >
                  Login
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -1 }}
                  onClick={()=>setMode('signup')}
                  className={`px-4 py-2 rounded ${mode==='signup'?'bg-white text-black':'bg-white/10 text-white border border-white/20'}`}
                >
                  Sign up
                </motion.button>
              </div>
              <div className="relative">
                <AnimatePresence mode="wait">
                  {mode==='login' ? (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                    >
                      <LoginView/>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="signup"
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                    >
                      <SignupView/>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
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
        <motion.div variants={fadeInUp}>
          <Dashboard />
        </motion.div>
        <motion.div variants={fadeInUp}>
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

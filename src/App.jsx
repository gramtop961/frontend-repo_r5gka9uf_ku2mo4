import { useState } from 'react'
import { AuthProvider, useAuth } from './components/AuthContext'
import { LoginView, SignupView } from './components/AuthViews'
import Dashboard from './components/Dashboard'
import ListingExplorer from './components/ListingExplorer'

function Shell() {
  const { user } = useAuth()
  const [mode, setMode] = useState('login')

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.2),transparent_40%),radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.15),transparent_40%)]" />
        <div className="relative min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Agricompass</h1>
              <p className="text-white/80 mb-6">A trusted B2B marketplace connecting farmers with buyers and field officers. Create an account to start listing produce or sourcing supplies.</p>
              <ul className="space-y-2 text-white/80">
                <li>• Role-based access for farmers, buyers, and officers</li>
                <li>• Browse live produce listings with filters</li>
                <li>• Place and track orders</li>
                <li>• Simple messaging for coordination</li>
              </ul>
            </div>
            <div>
              <div className="flex gap-2 mb-4">
                <button onClick={()=>setMode('login')} className={`px-4 py-2 rounded ${mode==='login'?'bg-white text-black':'bg-white/10 text-white border border-white/20'}`}>Login</button>
                <button onClick={()=>setMode('signup')} className={`px-4 py-2 rounded ${mode==='signup'?'bg-white text-black':'bg-white/10 text-white border border-white/20'}`}>Sign up</button>
              </div>
              {mode==='login'? <LoginView/> : <SignupView/>}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Dashboard />
        <ListingExplorer />
      </div>
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

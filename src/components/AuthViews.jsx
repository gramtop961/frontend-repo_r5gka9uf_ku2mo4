import { useState } from 'react'
import { useAuth, useApi } from './AuthContext'
import { motion } from 'framer-motion'

const inputClass = "w-full px-3 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition"

export function LoginView() {
  const { setUser, setToken } = useAuth()
  const { call } = useApi()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await call('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      setUser({ id: res.id, name: res.name, role: res.role })
      setToken(res.token)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div layout className="max-w-md w-full bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 mx-auto shadow-2xl/20">
      <motion.h2 layoutId="auth-title" className="text-2xl font-semibold text-white mb-4">Welcome back</motion.h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <motion.input whileFocus={{ scale: 1.01 }} className={inputClass} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <motion.input whileFocus={{ scale: 1.01 }} type="password" className={inputClass} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-300 text-sm">{error}</motion.p>}
        <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white py-2 rounded shadow-lg/30">
          {loading ? 'Signing in...' : 'Sign in'}
        </motion.button>
      </form>
    </motion.div>
  )
}

export function SignupView() {
  const { setUser, setToken } = useAuth()
  const { call } = useApi()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('farmer')
  const [region, setRegion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await call('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role, region })
      })
      setUser({ id: res.id, name, role })
      setToken(res.token)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div layout className="max-w-md w-full bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 mx-auto shadow-2xl/20">
      <motion.h2 layoutId="auth-title" className="text-2xl font-semibold text-white mb-4">Create your account</motion.h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <motion.input whileFocus={{ scale: 1.01 }} className={inputClass} placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <motion.input whileFocus={{ scale: 1.01 }} className={inputClass} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <motion.input whileFocus={{ scale: 1.01 }} type="password" className={inputClass} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <motion.select whileFocus={{ scale: 1.01 }} className="w-full px-3 py-2 rounded bg-white/20 text-white" value={role} onChange={e=>setRole(e.target.value)}>
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
          <option value="officer">Field Officer</option>
        </motion.select>
        <motion.input whileFocus={{ scale: 1.01 }} className={inputClass} placeholder="Region/Location" value={region} onChange={e=>setRegion(e.target.value)} />
        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-300 text-sm">{error}</motion.p>}
        <motion.button whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white py-2 rounded shadow-lg/30">
          {loading ? 'Creating...' : 'Create account'}
        </motion.button>
      </form>
    </motion.div>
  )
}

import { useState } from 'react'
import { useAuth, useApi } from './AuthContext'

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
    <div className="max-w-md w-full bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-4">Welcome back</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-white/70" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-white/70" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-red-300 text-sm">{error}</p>}
        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white py-2 rounded">{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </div>
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
    <div className="max-w-md w-full bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-4">Create your account</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-white/70" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-white/70" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-white/70" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <select className="w-full px-3 py-2 rounded bg-white/20 text-white" value={role} onChange={e=>setRole(e.target.value)}>
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
          <option value="officer">Field Officer</option>
        </select>
        <input className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-white/70" placeholder="Region/Location" value={region} onChange={e=>setRegion(e.target.value)} />
        {error && <p className="text-red-300 text-sm">{error}</p>}
        <button disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white py-2 rounded">{loading ? 'Creating...' : 'Create account'}</button>
      </form>
    </div>
  )
}

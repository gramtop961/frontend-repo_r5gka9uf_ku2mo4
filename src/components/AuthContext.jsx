import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('agc_user')) || null
    } catch {
      return null
    }
  })
  const [token, setToken] = useState(() => localStorage.getItem('agc_token') || '')

  useEffect(() => {
    if (user) localStorage.setItem('agc_user', JSON.stringify(user))
    else localStorage.removeItem('agc_user')
  }, [user])

  useEffect(() => {
    if (token) localStorage.setItem('agc_token', token)
    else localStorage.removeItem('agc_token')
  }, [token])

  const value = useMemo(() => ({ user, token, setUser, setToken, logout: () => { setUser(null); setToken('') } }), [user, token])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

export function useApi() {
  const { token } = useAuth()
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const call = async (path, options = {}) => {
    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    })
    if (!res.ok) {
      let detail = 'Request failed'
      try { const d = await res.json(); detail = d.detail || JSON.stringify(d) } catch {}
      throw new Error(detail)
    }
    const ct = res.headers.get('content-type') || ''
    return ct.includes('application/json') ? res.json() : res.text()
  }
  return { baseUrl, call }
}

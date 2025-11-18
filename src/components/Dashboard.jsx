import { useEffect, useMemo, useState } from 'react'
import { useAuth, useApi } from './AuthContext'

function Pill({ children }) {
  return <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">{children}</span>
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { call } = useApi()
  const [listings, setListings] = useState([])
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  const isFarmer = user?.role === 'farmer'
  const isBuyer = user?.role === 'buyer'

  const load = async () => {
    setError('')
    try {
      const l = await call('/listings')
      setListings(l)
      if (isBuyer) {
        const o = await call('/orders')
        setOrders(o)
      }
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => { load() // eslint-disable-next-line
  }, [user?.role])

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Hello, {user?.name || 'there'}</h2>
          <p className="text-white/70">Your {user?.role} dashboard</p>
        </div>
        <button onClick={logout} className="text-sm text-white/80 hover:text-white underline">Log out</button>
      </div>

      {error && <div className="mb-4 text-red-300">{error}</div>}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">Active listings</h3>
            <Pill>{listings.length}</Pill>
          </div>
          <div className="space-y-3 max-h-72 overflow-auto pr-1">
            {listings.map(l => (
              <div key={l.id} className="bg-black/20 rounded-xl p-3 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{l.title}</p>
                    <p className="text-white/70 text-xs">{l.region || 'Unknown region'} • {l.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-300 font-semibold">{l.unit_price} / {l.unit}</p>
                    <p className="text-white/60 text-xs">Qty: {l.quantity_available}</p>
                  </div>
                </div>
              </div>
            ))}
            {listings.length === 0 && <p className="text-white/60">No listings yet.</p>}
          </div>
        </div>

        {isBuyer && (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold">Recent orders</h3>
              <Pill>{orders.length}</Pill>
            </div>
            <div className="space-y-3 max-h-72 overflow-auto pr-1">
              {orders.map(o => (
                <div key={o.id} className="bg-black/20 rounded-xl p-3 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{o.items?.[0]?.title} {o.items?.length > 1 ? `+${o.items.length-1} more` : ''}</p>
                      <p className="text-white/70 text-xs">Status: {o.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-300 font-semibold">Total: {o.total_amount}</p>
                    </div>
                  </div>
                </div>
              ))}
              {orders.length === 0 && <p className="text-white/60">No orders yet.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

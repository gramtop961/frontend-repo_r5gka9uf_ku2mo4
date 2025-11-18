import { useEffect, useState } from 'react'
import { useAuth, useApi } from './AuthContext'
import { motion } from 'framer-motion'

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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto w-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-3xl font-bold text-white">Hello, {user?.name || 'there'}</motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="text-white/70">Your {user?.role} dashboard</motion.p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={logout} className="text-sm text-white/80 hover:text-white underline">Log out</motion.button>
      </div>

      {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-red-300">{error}</motion.div>}

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white/10 border border-white/20 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">Active listings</h3>
            <Pill>{listings.length}</Pill>
          </div>
          <div className="space-y-3 max-h-72 overflow-auto pr-1">
            {listings.map((l, idx) => (
              <motion.div key={l.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} className="bg-black/20 rounded-xl p-3 border border-white/10">
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
              </motion.div>
            ))}
            {listings.length === 0 && <p className="text-white/60">No listings yet.</p>}
          </div>
        </motion.div>

        {isBuyer && (
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white/10 border border-white/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold">Recent orders</h3>
              <Pill>{orders.length}</Pill>
            </div>
            <div className="space-y-3 max-h-72 overflow-auto pr-1">
              {orders.map((o, idx) => (
                <motion.div key={o.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} className="bg-black/20 rounded-xl p-3 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{o.items?.[0]?.title} {o.items?.length > 1 ? `+${o.items.length-1} more` : ''}</p>
                      <p className="text-white/70 text-xs">Status: {o.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-300 font-semibold">Total: {o.total_amount}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {orders.length === 0 && <p className="text-white/60">No orders yet.</p>}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

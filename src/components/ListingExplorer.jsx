import { useEffect, useMemo, useState } from 'react'
import { useApi, useAuth } from './AuthContext'

export default function ListingExplorer() {
  const { call } = useApi()
  const { user } = useAuth()
  const [filters, setFilters] = useState({ category: '', region: '', q: '', min_price: '', max_price: '' })
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v) })
    try {
      const data = await call(`/listings?${params.toString()}`)
      setItems(data)
    } finally { setLoading(false) }
  }

  useEffect(() => { load() // eslint-disable-next-line
  }, [])

  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-4">
      <div className="flex flex-wrap gap-2 mb-3">
        <input className="px-3 py-2 rounded bg-white/20 text-white placeholder-white/70" placeholder="Search" value={filters.q} onChange={e=>setFilters(f=>({...f,q:e.target.value}))} />
        <select className="px-3 py-2 rounded bg-white/20 text-white" value={filters.category} onChange={e=>setFilters(f=>({...f,category:e.target.value}))}>
          <option value="">All categories</option>
          <option value="grains">Grains</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="legumes">Legumes</option>
          <option value="roots">Roots</option>
          <option value="other">Other</option>
        </select>
        <input className="px-3 py-2 rounded bg-white/20 text-white placeholder-white/70" placeholder="Region" value={filters.region} onChange={e=>setFilters(f=>({...f,region:e.target.value}))} />
        <input className="w-28 px-3 py-2 rounded bg-white/20 text-white placeholder-white/70" placeholder="Min $" value={filters.min_price} onChange={e=>setFilters(f=>({...f,min_price:e.target.value}))} />
        <input className="w-28 px-3 py-2 rounded bg-white/20 text-white placeholder-white/70" placeholder="Max $" value={filters.max_price} onChange={e=>setFilters(f=>({...f,max_price:e.target.value}))} />
        <button onClick={load} className="px-4 py-2 rounded bg-blue-600 text-white">Search</button>
      </div>

      {loading ? <p className="text-white/70">Loading...</p> : (
        <div className="grid sm:grid-cols-2 gap-3">
          {items.map(it => (
            <div key={it.id} className="bg-black/20 rounded-xl p-3 border border-white/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white font-medium">{it.title}</p>
                  <p className="text-white/70 text-xs">{it.region || 'Unknown'} • {it.category}</p>
                  {it.quality_grade && <p className="text-xs text-emerald-300">Grade {it.quality_grade}</p>}
                </div>
                <div className="text-right">
                  <p className="text-emerald-300 font-semibold">{it.unit_price} / {it.unit}</p>
                  <p className="text-white/60 text-xs">Qty: {it.quantity_available}</p>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-white/60">No results.</p>}
        </div>
      )}
    </div>
  )
}

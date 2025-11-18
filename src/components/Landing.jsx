import { useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

// Agriculture-themed, highly animated landing experience
export default function Landing({ onLogin, onSignup }) {
  // Mouse-driven parallax
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const hillY1 = useTransform(my, [ -200, 0, 200 ], [ -10, 0, 10 ])
  const hillY2 = useTransform(my, [ -200, 0, 200 ], [ -6, 0, 6 ])
  const hillY3 = useTransform(my, [ -200, 0, 200 ], [ -3, 0, 3 ])
  const cloudX = useTransform(mx, [ -200, 0, 200 ], [ -20, 0, 20 ])
  const cloudY = useTransform(my, [ -200, 0, 200 ], [ -6, 0, 6 ])
  const sunY = useTransform(my, [ -200, 0, 200 ], [ -12, 0, 12 ])

  useEffect(() => {
    const handler = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mx.set(e.clientX - cx)
      my.set(e.clientY - cy)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mx, my])

  const features = [
    { title: 'Smart Market Matching', desc: 'Connects farmers and buyers using real-time demand and location signals.' },
    { title: 'Quality & Traceability', desc: 'Field officer reports, photos, and grades ride with every listing.' },
    { title: 'Reliable Logistics', desc: 'Integrated orders and status updates from farm-gate to warehouse.' },
    { title: 'Fair Pricing Insights', desc: 'Live trends help you price produce and negotiate confidently.' },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white">
      {/* Glowing sky gradient + sun */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.25),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(15,23,42,0.6),transparent_60%)]" />
        <motion.div
          style={{ y: sunY }}
          className="absolute -top-24 right-12 h-72 w-72 rounded-full bg-gradient-to-br from-amber-300 via-yellow-300 to-orange-400 blur-2xl opacity-40"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Floating clouds */}
      <motion.div style={{ x: cloudX, y: cloudY }} className="absolute top-20 left-[-10%] flex gap-24 opacity-60">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="h-16 md:h-20 w-28 md:w-36 rounded-full bg-white/10 blur-md"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      {/* Hero content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Grow markets, not just crops
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-white/80">
              Agricompass is the B2B marketplace where farmers, buyers, and field officers trade confidently with transparency and speed.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <motion.button
                whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(16,185,129,0.35)' }}
                whileTap={{ scale: 0.98 }}
                onClick={onSignup}
                className="px-5 py-3 rounded-lg bg-emerald-400 text-emerald-950 font-semibold"
              >
                Get started
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onLogin}
                className="px-5 py-3 rounded-lg border border-white/20 bg-white/10"
              >
                Sign in
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated fields (SVG hills) */}
      <div className="absolute inset-x-0 bottom-0 h-[55vh] md:h-[60vh]">
        <svg viewBox="0 0 1440 600" className="absolute bottom-0 w-[160%] -left-[30%] md:left-0 md:w-full h-full">
          <motion.path
            style={{ y: hillY3 }}
            d="M0,450 C200,420 380,520 600,500 C880,480 1100,560 1440,520 L1440,700 L0,700 Z"
            fill="url(#field3)"
          />
          <motion.path
            style={{ y: hillY2 }}
            d="M0,470 C220,460 420,520 640,510 C900,500 1160,560 1440,540 L1440,700 L0,700 Z"
            fill="url(#field2)"
          />
          <motion.path
            style={{ y: hillY1 }}
            d="M0,500 C240,520 420,540 740,540 C980,540 1200,560 1440,560 L1440,700 L0,700 Z"
            fill="url(#field1)"
          />

          <defs>
            <linearGradient id="field1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="field2" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#065f46" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="field3" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.95" />
            </linearGradient>
          </defs>
        </svg>

        {/* Wheat blades swaying */}
        <div className="absolute inset-x-0 bottom-8 md:bottom-10 flex justify-center gap-6 md:gap-10">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="origin-bottom h-14 md:h-20 w-1.5 rounded-full bg-yellow-400/80"
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 3 + (i % 4) * 0.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-yellow-200" />
            </motion.div>
          ))}
        </div>

        {/* Tractor moving */}
        <motion.div
          className="absolute bottom-24 md:bottom-28 left-10 md:left-24"
          animate={{ x: [0, 200, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Tractor />
        </motion.div>

        {/* Floating produce cards with parallax */}
        <div className="absolute bottom-36 right-4 md:right-24 grid grid-cols-2 gap-3 md:gap-4">
          {['Maize', 'Cassava', 'Tomatoes', 'Soybeans'].map((crop, i) => (
            <motion.div
              key={crop}
              whileHover={{ y: -6, scale: 1.03 }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              className="backdrop-blur-md bg-white/10 border border-white/15 rounded-xl p-3 md:p-4 shadow-xl"
            >
              <div className="text-xs md:text-sm text-white/70">Hot</div>
              <div className="text-base md:text-lg font-semibold">{crop}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features section */}
      <section className="relative z-10 mt-12 md:mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid md:grid-cols-4 gap-4 md:gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-md"
              >
                <div className="text-emerald-300 font-semibold">{f.title}</div>
                <div className="text-white/80 text-sm mt-2">{f.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ambient floating seeds */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-amber-200/70"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
            animate={{ y: [0, -20, 0], x: [0, 10, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: (i % 10) * 0.2 }}
          />
        ))}
      </div>
    </div>
  )
}

function Tractor() {
  return (
    <motion.div className="relative">
      <motion.div className="h-5 w-10 bg-emerald-400 rounded-sm" />
      <motion.div className="absolute -top-3 left-2 h-4 w-4 rounded-sm bg-emerald-300" />
      <motion.div className="absolute -bottom-3 left-0 flex gap-4">
        <motion.div
          className="h-5 w-5 rounded-full bg-slate-900 border border-emerald-200/70"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="h-5 w-5 rounded-full bg-slate-900 border border-emerald-200/70"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.1 }}
        />
      </motion.div>
      {/* Exhaust puff */}
      <motion.div
        className="absolute -top-2 left-8 h-2 w-2 rounded-full bg-white/50"
        animate={{ y: [-2, -12], x: [0, 6], opacity: [0.8, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
    </motion.div>
  )
}

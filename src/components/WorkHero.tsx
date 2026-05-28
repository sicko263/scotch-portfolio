"use client"

import dynamic from "next/dynamic"
import { motion } from "motion/react"

const TerrainScene = dynamic(() => import("./three/TerrainScene"), { ssr: false })

const ease = [0, 0, 0.2, 1] as const

const stats = [
  { value: "15+", label: "Production Systems Built" },
  { value: "5+", label: "Years" },
  { value: "8", label: "Countries" },
  { value: "Live", label: "In Production" },
]

export default function WorkHero() {
  return (
    <section className="relative pt-32 pb-12 md:pt-44 md:pb-20 overflow-hidden">
      {/* ─── 3D Terrain — full background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <TerrainScene />
      </div>

      {/* Left-side vignette keeps text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(7,8,15,0.92) 0%, rgba(7,8,15,0.65) 40%, rgba(7,8,15,0.15) 80%, rgba(7,8,15,0) 100%)",
        }}
      />
      {/* Bottom fade into page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #07080F)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="font-mono text-[11px] text-fg-subtle tracking-[0.2em] uppercase mb-8"
        >
          Portfolio · 13 Projects
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
        >
          <h1
            className="font-display font-bold leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(52px, 9vw, 120px)" }}
          >
            <span className="gradient-text">SELECTED</span>
            <br />
            <span className="text-fg">WORK</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease }}
          className="text-fg-muted text-base md:text-lg leading-relaxed mt-6 max-w-2xl"
        >
          Production systems that government agencies, banks, and regulatory
          authorities rely on daily. Not prototypes — real infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 pt-8 border-t border-border"
        >
          {stats.map((s, i) => (
            <div key={s.label} className={i > 0 ? "md:border-l md:border-border md:pl-8" : ""}>
              <p className="font-display font-bold text-3xl md:text-4xl text-fg tracking-tight leading-none">
                {s.value}
              </p>
              <p className="font-mono text-[11px] text-fg-subtle tracking-[0.15em] uppercase mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

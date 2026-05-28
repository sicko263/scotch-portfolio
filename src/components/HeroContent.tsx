"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { motion } from "motion/react"

const TerrainScene = dynamic(() => import("./three/TerrainScene"), { ssr: false })

const ease = [0, 0, 0.2, 1] as const

export default function HeroContent() {
  return (
    <section className="relative min-h-[85svh] flex flex-col items-center justify-center pt-20 pb-8 overflow-hidden">

      {/* ─── 3D Terrain canvas — full section background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <TerrainScene />
      </div>

      {/* Depth vignette — keeps text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 75% at 50% 50%, rgba(7,8,15,0.35) 0%, rgba(7,8,15,0.7) 60%, rgba(7,8,15,0.95) 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(7,8,15,0.95))",
        }}
      />

      {/* ─── Content ──────────────────────────────────── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Role label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="font-mono text-[10px] md:text-[11px] text-electric tracking-[0.25em] uppercase mb-6 md:mb-10"
        >
          GIS Systems Developer · Zimbabwe & Beyond
        </motion.p>

        {/* Main display headline */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease }}
        >
          <h1
            className="font-display font-bold gradient-text leading-[0.88] tracking-[-0.04em] select-none"
            style={{ fontSize: "clamp(40px, 13vw, 160px)" }}
          >
            SPATIAL
          </h1>
          <p
            className="font-display font-bold text-fg leading-[0.88] tracking-[-0.04em] select-none -mt-1"
            style={{ fontSize: "clamp(40px, 13vw, 160px)" }}
          >
            INTELLIGENCE
          </p>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.24, ease }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <span className="h-px w-8 bg-border-strong" />
          <span className="font-display font-semibold text-fg text-lg md:text-xl tracking-tight">
            Scotch Ajison
          </span>
          <span className="h-px w-8 bg-border-strong" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease }}
          className="font-sans text-fg-muted text-base md:text-lg leading-relaxed mt-5 max-w-lg mx-auto"
        >
          I build the spatial systems governments and banks rely on.
          <br className="hidden sm:block" />
          Now designing the next generation with drones and AI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
        >
          <Link
            href="/work"
            className="font-sans text-sm font-semibold px-7 py-3.5 rounded-full border border-border-strong text-fg
              hover:border-violet/50 hover:shadow-[0_0_28px_rgba(124,58,255,0.2)]
              transition-all duration-200 w-full sm:w-auto text-center backdrop-blur-sm"
          >
            View My Work →
          </Link>
          <Link
            href="/contact"
            className="font-display font-bold text-sm px-7 py-3.5 rounded-full bg-amber text-black
              hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200
              w-full sm:w-auto text-center shadow-[0_0_24px_rgba(255,159,10,0.3)]"
          >
            Let&apos;s Talk
          </Link>
        </motion.div>

        {/* Coordinate indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75, ease }}
          className="mt-12 md:mt-20 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] text-fg-subtle/60 tracking-[0.18em]">
            17.83°S · 31.05°E — Harare, Zimbabwe
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-fg-subtle/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}

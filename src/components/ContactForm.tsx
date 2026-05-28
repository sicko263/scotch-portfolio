"use client"

import { useState } from "react"

type FormState = "idle" | "submitting" | "success" | "error"

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    projectType: "",
    budget: "",
    message: "",
  })

  const inputClass =
    "w-full bg-transparent border-b border-border-strong pb-3 pt-1 text-sm text-fg placeholder:text-fg-subtle/40 focus:outline-none focus:border-violet transition-colors duration-200 font-sans"

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("submitting")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.")
        setState("error")
        return
      }

      setState("success")
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.")
      setState("error")
    }
  }

  if (state === "success") {
    return (
      <div className="py-16 space-y-5">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <p className="font-mono text-[11px] text-success tracking-[0.15em] uppercase">
            Message sent
          </p>
        </div>
        <h3 className="font-display font-bold text-2xl text-fg tracking-tight">
          I&apos;ll be in touch.
        </h3>
        <p className="text-fg-muted text-sm leading-relaxed max-w-md">
          Thank you for reaching out. I&apos;ll review your inquiry and respond within 48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
        <div className="space-y-2">
          <label className="font-mono text-[11px] text-fg-subtle tracking-[0.1em]">
            Name <span className="text-violet/50">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[11px] text-fg-subtle tracking-[0.1em]">
            Email <span className="text-violet/50">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-mono text-[11px] text-fg-subtle tracking-[0.1em]">
          Organization <span className="text-violet/50">*</span>
        </label>
        <input
          type="text"
          name="organization"
          required
          placeholder="Company or institution"
          value={form.organization}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
        <div className="space-y-2">
          <label className="font-mono text-[11px] text-fg-subtle tracking-[0.1em]">
            Project Type <span className="text-violet/50">*</span>
          </label>
          <select
            name="projectType"
            required
            value={form.projectType}
            onChange={handleChange}
            className={`${inputClass} appearance-none cursor-pointer rounded-none`}
          >
            <option value="" disabled>Select a category</option>
            <option value="gis-system">GIS System Architecture</option>
            <option value="drone-gis">Drone Data & GIS Integration</option>
            <option value="spatial-consulting">Spatial Data Consulting</option>
            <option value="ai-gis">AI + GIS Research</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[11px] text-fg-subtle tracking-[0.1em]">
            Budget Range
          </label>
          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className={`${inputClass} appearance-none cursor-pointer rounded-none`}
          >
            <option value="">Prefer not to say</option>
            <option value="under-5k">Under $5,000</option>
            <option value="5k-20k">$5,000 – $20,000</option>
            <option value="20k-50k">$20,000 – $50,000</option>
            <option value="50k-plus">$50,000+</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-mono text-[11px] text-fg-subtle tracking-[0.1em]">
          Message <span className="text-violet/50">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell me about the spatial problem you're trying to solve..."
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      {state === "error" && (
        <p className="font-mono text-[11px] text-error tracking-wide">{errorMsg}</p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="bg-amber text-black font-display font-bold text-sm px-8 py-3.5 rounded-full
            hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0
            disabled:opacity-60 disabled:cursor-not-allowed
            transition-all duration-200"
        >
          {state === "submitting" ? "Sending…" : "Send Inquiry →"}
        </button>
      </div>
    </form>
  )
}

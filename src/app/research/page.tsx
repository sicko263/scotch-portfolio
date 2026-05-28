import type { Metadata } from "next"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import DataNetwork from "@/components/three/DataNetworkWrapper"

export const metadata: Metadata = {
  title: "Research",
  description:
    "Active research in drone photogrammetry, AI-powered spatial analysis, and spatial data infrastructure for developing economies.",
}

const researchAreas = [
  {
    number: "01",
    title: "Drone Photogrammetry & GIS Integration",
    status: "Active Research",
    quote:
      "Drones generate more spatial data in a single flight than a field team collects in weeks. The bottleneck isn't capture — it's processing, structuring, and making that data queryable in a GIS environment.",
    exploring: [
      "Drone-to-GIS pipeline design: raw imagery → point clouds → orthomosaics → PostGIS layers",
      "Informal settlement mapping with low-cost drone imagery",
      "Agricultural land assessment and post-flood damage analysis in Zimbabwe",
      "Large-scale drone image processing and post-flight data capture (Senlis Consultancy experience)",
    ],
    tools: [
      "OpenDroneMap (ODM)",
      "WebODM",
      "QGIS Photogrammetry Plugins",
      "CAAZ Certification (planned)",
    ],
    output:
      "Mapping Informal Settlements in Harare Using Low-Cost Drone Imagery and Open-Source GIS",
  },
  {
    number: "02",
    title: "AI-Powered Spatial Analysis",
    status: "Active Research",
    quote:
      "The next leap in GIS isn't about better maps. It's about maps that think — detecting patterns, classifying land use, flagging anomalies without a human reviewing every pixel.",
    exploring: [
      "Spatial machine learning: land use classification from satellite and drone imagery",
      "Detecting illegal mining activity from aerial imagery",
      "Crop stress detection for smallholder farmers",
      "Automated property boundary extraction from drone orthomosaics",
    ],
    tools: [
      "Python (scikit-learn, TensorFlow)",
      "QGIS ML Plugins",
      "Google Earth Engine",
      "ESA Copernicus",
      "NASA ARSET",
    ],
    output:
      "Land Use Classification Model for Peri-Urban Zimbabwe Using Sentinel-2 Imagery",
  },
  {
    number: "03",
    title: "Spatial Data Infrastructure for Developing Economies",
    status: "Active Research",
    quote:
      "Most SDI frameworks were designed for countries with functioning address systems and complete cadastral records. They don't account for informal settlements, communal land, or institutions with no digitization budget. I'm interested in what SDI looks like when you start from scratch.",
    exploring: [
      "GeoNode as an open-source SDI platform",
      "OGC standards implementation for low-resource environments",
      "Community mapping methodologies (OSM + field data collection)",
      "Case studies: Rwanda SDI, Kenya's Ardhi platform, Ethiopia's LAIS",
    ],
    tools: ["GeoNode", "GeoServer", "OGC Standards", "OpenStreetMap"],
    output: null,
  },
]

export default function ResearchPage() {
  return (
    <>
      {/* ─── HEADER ── Dark section with 3D network ───────── */}
      <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
        {/* 3D Data Network */}
        <div
          className="absolute pointer-events-none"
          style={{ top: "0", right: "-40px", width: "620px", height: "500px", opacity: 0.6 }}
        >
          <DataNetwork />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(7,8,15,1) 38%, rgba(7,8,15,0.45) 68%, rgba(7,8,15,0.1) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #07080F)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="font-mono text-[11px] text-electric tracking-[0.2em] uppercase mb-6">
              Research
            </p>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-fg tracking-tight leading-[1.05] max-w-4xl">
              Areas I&apos;m actively{" "}
              <span className="gradient-text">exploring</span>.
            </h1>
            <p className="text-fg-muted text-lg leading-relaxed mt-6 max-w-2xl">
              This isn&apos;t a list of services I&apos;m selling. It&apos;s an
              honest account of where I&apos;m investing my time and
              intellectual energy — the frontier where drone data, machine
              learning, and spatial systems converge.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── RESEARCH AREAS ── Light section ─────────────── */}
      <section className="bg-bg-light">
        <div className="max-w-7xl mx-auto px-6">
          {researchAreas.map((area, i) => (
            <ScrollReveal key={area.number} delay={i * 0.08}>
              <article
                className={`py-16 md:py-20 ${
                  i < researchAreas.length - 1
                    ? "border-b border-border-on-light"
                    : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-violet font-medium">
                      {area.number}
                    </span>
                    <span className="h-px w-4 bg-border-on-light" />
                    <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-violet/10 border border-violet/20 text-violet">
                      {area.status}
                    </span>
                  </div>
                </div>

                <h2 className="font-display font-bold text-3xl md:text-4xl text-fg-on-light tracking-tight leading-tight mb-6">
                  {area.title}
                </h2>

                <blockquote className="border-l-2 border-violet/40 pl-5 mb-10">
                  <p className="text-fg-muted-on-light text-sm italic leading-relaxed max-w-3xl">
                    {area.quote}
                  </p>
                </blockquote>

                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">
                  <div className="space-y-3">
                    <p className="font-mono text-[11px] text-fg-muted-on-light tracking-wider uppercase">
                      What I&apos;m Exploring
                    </p>
                    <ul className="space-y-3">
                      {area.exploring.map((item, j) => (
                        <li
                          key={j}
                          className="flex gap-3 text-sm text-fg-muted-on-light leading-relaxed"
                        >
                          <span className="w-1 h-1 rounded-full bg-violet mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3">
                      <p className="font-mono text-[11px] text-fg-muted-on-light tracking-wider uppercase">
                        Tools & Reading
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {area.tools.map((tool) => (
                          <span
                            key={tool}
                            className="font-mono text-[11px] px-2.5 py-[3px] rounded-[6px] bg-white/60 border border-border-on-light text-fg-muted-on-light"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {area.output && (
                      <div className="space-y-2">
                        <p className="font-mono text-[11px] text-fg-muted-on-light tracking-wider uppercase">
                          Planned Output
                        </p>
                        <p className="text-sm text-fg-on-light/70 italic leading-relaxed">
                          &ldquo;{area.output}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─── CTA ── Dark section ─────────────────────────── */}
      <section className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-5">
              <h2 className="font-display font-bold text-3xl md:text-5xl text-fg tracking-tight leading-tight">
                Interested in research collaboration?
              </h2>
              <p className="text-fg-muted text-lg leading-relaxed">
                I&apos;m open to co-research, grant-funded projects, and
                partnerships with institutions working at the intersection of
                GIS, drones, and AI.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block bg-amber text-black font-display font-bold text-sm px-8 py-4 rounded-full
                    hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200
                    shadow-[0_0_24px_rgba(255,159,10,0.25)]"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
